fetch('../client/username.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(config => {
        const username = config.username;
        if (username === "undefined") return
        const url = `https://darkdus.vercel.app/api/status?username=${username}`;
        let partyStatus;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.party === "alone") {
                    partyStatus = "available";
                } else if (data.party === "in_party") {
                    partyStatus = "in use";
                } else {
                    partyStatus = "something goes wrong...";
                }

                document.getElementById("username").innerHTML = `YourFortniteClient: ${data.username}`;
                document.getElementById("id").innerHTML = `ID: ${data.id}`;
                document.getElementById("status").innerHTML = `Status: ${data.status}`;
                document.getElementById("friends").innerHTML = `Friends: ${data.friends}`;
                document.getElementById("party").innerHTML = `Client is ${partyStatus}`;
                document.getElementById("matchmaking").innerHTML = `Matchmaking is ${data.matchmaking}`;
                document.getElementById("timestamp").innerHTML = `Last update: ${data.timestamp}`;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    })
    .catch(error => {
        console.error("Error loading config.json:", error);
    });
