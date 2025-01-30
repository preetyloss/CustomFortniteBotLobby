const { Enums } = require('fnbr');
const { allowedPlaylists, websocketHeaders } = require('../utils/constants');
const WebSocket = require('ws');
const showError = require('../utils/logs/showError');
const clientIsBanned = require('../client/utils/clientIsBanned');
const axiosInstance = require('axios').default;

async function handleMatchmakingError(request, response) {
    let errorData = '';
    response.on('data', (chunk) => errorData += chunk);
    response.on('end', () => {
        const baseMessage = `[${'Matchmaking'.cyan}] Error: ${response.statusCode} ${response.statusMessage}`;
        botClient.party.chat.send(baseMessage);
  
        if (errorData === '') {
            console.error(baseMessage);
        } else if (response.headers['content-type'].startsWith('application/json')) {
            const jsonResponse = JSON.parse(errorData);
            console.error(`${baseMessage}, ${jsonResponse.errorCode} ${jsonResponse.errorMessage || ''}`);
            botClient.party.chat.send(`${baseMessage}, ${jsonResponse.errorCode} ${jsonResponse.errorMessage || ''}`);
        } else {
            console.error(`${baseMessage} response body: ${errorData}`);
        }
    });
}

const handlePartyUpdated = async (botClient, updatedParty, webhookClient, logEnabled) => {
  const partyState = updatedParty.meta.schema["Default:PartyState_s"];
  let isMatchmakingActive = false;

  switch (partyState) {
    case "BattleRoyalePreloading": {
      
      const requestData = {
        delete: [],
        revision: 2,
        update: {
          'Default:LobbyState_j': {
            LobbyState: {
              hasPreloadedAthena: true
            }
          }
        }
      };
      
      console.log('Sending patch with data:', requestData);
      await botClient.party.me.sendPatch(requestData);
      break;
    }

    case "BattleRoyaleMatchmaking": {
      if (isMatchmakingActive) return;

      isMatchmakingActive = true;
      if (logEnabled) {
        console.log(`[${'Matchmaking'.cyan}] Matchmaking process initiated`);
        webhookClient.send(`\`\`\`diff\n+ [Matchmaking] Matchmaking process started\`\`\``);
      }

      const matchmakingDetails = JSON.parse(updatedParty.meta.schema["Default:PartyMatchmakingInfo_j"]).PartyMatchmakingInfo;
      const playlist = matchmakingDetails.playlistName.toLowerCase();

      if (!allowedPlaylists.includes(playlist)) {
        console.log("Unsupported playlist", playlist);
        webhookClient.send(`\`\`\`diff\n- [Matchmaking] Unsupported playlist: ${playlist}\`\`\``);
        botClient.party.me.setReadiness(false);
        return;
      }

      const partyMembersReady = botClient.party.members.filter(member => member.isReady).map(member => member.id).join(',');
      const matchId = `${matchmakingDetails.buildId}:${matchmakingDetails.playlistRevision}:${matchmakingDetails.regionId}:${playlist}`;
      const searchParams = new URLSearchParams({
        "partyPlayerIds": partyMembersReady,
        "player.platform": "Windows",
        "player.option.partyId": botClient.party.id,
        "input.KBM": "true",
        "player.input": "KBM",
        "bucketId": matchId
      });

      botClient.party.members.filter(member => member.isReady).forEach(member => {
        const platformData = member.meta.get("Default:PlatformData_j");
        if (!searchParams.has(`party.${platformData}`)) {
          searchParams.append(`party.${platformData}`, "true");
        }
      });

      console.log(botClient.auth.sessions.get('fortnite'));
      const authToken = botClient.auth.sessions.get("fortnite").accessToken;

      try {
        const ticketResponse = await axiosInstance.get(
          `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/matchmakingservice/ticket/player/${botClient.user.self.id}?${searchParams}`,
          { headers: { Accept: 'application/json', Authorization: `Bearer ${authToken}` } }
        );

        if (ticketResponse.status !== 200) {
          webhookClient.send(`\`\`\`diff\n- [Matchmaking] Error while obtaining ticket\`\`\``);
          if (ticketResponse.errorMessage === "Banned from matchmaking" && ticketResponse.errorCode === "'errors.com.epicgames.fortnite.player_banned_from_sub_game',") {
            await clientIsBanned(botClient)
            webhookClient.send(`\`\`\`diff\n- [Matchmaking] Player is banned from matchmaking for ${ticketResponse.banDaysRemaining} Days\`\`\``);
            showError(`Player is banned from matchmaking for ${ticketResponse.banDaysRemaining} Days`);
          }
          botClient.party.me.setReadiness(false);
          return console.log(ticketResponse);
        }

        const ticketData = ticketResponse.data;
        const hashResponse = await axiosInstance.post("https://api-xji1.onrender.com/generate-checksum", ticketData, {
          headers: { Accept: 'application/json' }
        });

        if (!hashResponse || hashResponse.status !== 200) return;

        const checksum = hashResponse.data.checksum;
        if (!checksum) {
          webhookClient.send(`\`\`\`diff\n- [Matchmaking] Error: No checksum returned from API (Support:dsc.gg/pulsarfn)\`\`\``);
          botClient.party.me.setReadiness(true);
          return;
        }

        const MMSAuthHeaders = [
          "Epic-Signed", ticketData.ticketType, ticketData.payload, ticketData.signature, checksum
        ];

        const matchmakingSocket = new WebSocket(ticketData.serviceUrl, {
          perMessageDeflate: false,
          rejectUnauthorized: false,
          headers: {
            Origin: ticketData.serviceUrl.replace('ws', 'http'),
            Authorization: MMSAuthHeaders.join(" "),
            ...websocketHeaders
          }
        });

        matchmakingSocket.on('unexpected-response', handleMatchmakingError);
        if (logEnabled) {
          matchmakingSocket.on('close', () => console.log(`[Matchmaking] Connection closed`));
          webhookClient.send(`\`\`\`diff\n+ [Matchmaking] Matchmaking connection closed\`\`\``);
        }

        matchmakingSocket.on('message', (msg) => {
          const message = JSON.parse(msg);
          if (logEnabled) {
            console.log(`[Matchmaking] Message from matchmaker`, message);
            webhookClient.send(`\`\`\`diff\n+ [Matchmaking] Received message from matchmaker: ${JSON.stringify(message)}\`\`\``);
          }
          if (message.name === 'Error') {
            isMatchmakingActive = false;
          }
        });

      } catch (error) {
        console.error("Error during matchmaking process:", error);
        webhookClient.send(`\`\`\`diff\n- [Matchmaking] Error during matchmaking process\`\`\``);
        isMatchmakingActive = false;
      }
      break;
    }

    case "BattleRoyalePostMatchmaking": {
      if (logEnabled) {
        console.log(`[Party] Players entering the match, leaving the party`);
        webhookClient.send(`\`\`\`diff\n+ [Party] Players entering the match, leaving the party\`\`\``);
      }
      isMatchmakingActive = false;
      botClient.party.leave();
      break;
    }

    case "BattleRoyaleView":
      break;

    default: {
      if (logEnabled) {
        console.log(`[Party] Unknown PartyState XD: ${partyState}`);
        webhookClient.send(`\`\`\`diff\n- [Party] Unknown PartyState: ${partyState}\`\`\``);
      }
      break;
    }
  }
};

module.exports = handlePartyUpdated;
