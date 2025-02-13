(async () => {
    const username = 'player1';

    const response = await fetch(`https://darkdus-client-status.vercel.app/api/status?username=${username}`, {
        method: 'GET',
    });

    const data = await response.json();
    console.log(data);
})();
