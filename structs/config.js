const nconf = require('nconf');
require('dotenv').config();
const config = nconf.argv().env().file({ file: 'config.json' });

module.exports = {
  cid: nconf.get("client:outfit").skin,
  bid: nconf.get('client:outfit').backpack,
  eid: nconf.get('client:default').emote,
  level: nconf.get('client:default').level,
  banner: nconf.get('client:default').banner,
  bot_use_status: nconf.get('client:status').inUse,
  bot_use_onlinetype: nconf.get('client:status').inuse_onlinetype,
  bot_invite_status: nconf.get('client:status').default,
  bot_invite_onlinetype: nconf.get('client:status').default_onlinetype,
  bot_leave_time: nconf.get('client:leave_party_time_seconds'),
  bot_join_message: nconf.get('client:join_message'),
  join_users: nconf.get('fortnite:join_users'),
  addusers: nconf.get('fortnite:add_users'),
  leave_after: nconf.get("fortnite:leave_after_success"),
  web_message: nconf.get('system:web_message'),
  bot_loading_message: nconf.get('system:bot_loading_message'),
  reload: nconf.get('fortnite:reload'),
  reload_time: nconf.get('client:reload_bot_time_seconds'),
  send_webhook: nconf.get('fornite:send_webhook'),
  webhook_url: nconf.get('DISCORD_WEBHOOK_URL'),
  discord_status_type: nconf.get('discord:discord_status_type'),
  discord_status: nconf.get('discord:discord_status'),
  run_discord_client: nconf.get('discord:run_discord_client')
};