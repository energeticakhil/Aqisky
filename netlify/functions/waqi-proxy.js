// Netlify serverless function for WAQI API proxy
export async function handler(event) {
    const API_KEY = "demo"; // Replace with your WAQI key later

    const params = event.queryStringParameters;
    let url = "";

    if (params.search) {
        // Search station API
        url = `https://api.waqi.info/search/?token=${API_KEY}&keyword=${params.search}`;
    }

    else if (params.city) {
        // AQI data API
        url = `https://api.waqi.info/feed/${params.city}/?token=${API_KEY}`;
    }

    const response = await fetch(url);
    const waqiData = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(waqiData.data || {})
    };
}
