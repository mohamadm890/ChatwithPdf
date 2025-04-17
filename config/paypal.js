const axios = require('axios');

async function generateAccessToken() {
    try {
        const response = await axios({
            url: 'https://api-m.paypal.com/v1/oauth2/token',
            method: 'post',
            data: 'grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: "AUiMT_0KsE4JIPLoPpJpHqOYhcPQtWpoeyfdDcfLss_rhENcwlCfg7y3HasOf6EpvjIH5avHn-7YxTCz",
                password: "EPDORK3N78QlUAJ6wN-zmNIClFHX1mPU07PEeEFYEEycwf6t-tcYJhVy54anPRr6x-fAsvd1l0qdnb0p"
            }
        });

        console.log('Access Token:', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
    }
}



