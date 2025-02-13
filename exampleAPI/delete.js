(async () => {
    const response = await fetch('https://darkdus-client-status.vercel.app/api/status', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'secretKey123',
            username: 'player1',
        }),
    });

    const data = await response.json();
    console.log(data);
})();
