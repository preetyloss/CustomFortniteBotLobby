(async () => {
    const response = await fetch('https://darkdus-client-status.vercel.app/api/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'secretKey123',
            username: 'player1',
            id: 'user123',
            status: 'online',
            friends: "2",
            party: 'party123',
            matchmaking: 'queued',
            timestamp: Date.now(),
        }),
    });

    const data = await response.json();
    console.log(data);
})();
