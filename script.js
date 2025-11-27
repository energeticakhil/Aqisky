async function getAQI() {
    const city = document.getElementById("cityInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!city) {
        resultBox.innerHTML = "<p>Please enter a city.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Searching...</p>";

    try {
        // Step 1: Convert city name to coordinates (Geocoding API)
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
        const geoData = await geoRes.json();

        if (!geoData || geoData.length === 0) {
            resultBox.innerHTML = "<p>City not found.</p>";
            return;
        }

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // Step 2: Call your Netlify proxy for WAQI AQI data
        const aqiRes = await fetch(`/.netlify/functions/waqi-proxy?lat=${lat}&lon=${lon}`);
        const aqiData = await aqiRes.json();

        if (!aqiData || !aqiData.data || !aqiData.data.aqi) {
            resultBox.innerHTML = "<p>API error.</p>";
            return;
        }

        resultBox.innerHTML = `
            <h2>${city}</h2>
            <p>AQI: ${aqiData.data.aqi}</p>
        `;
    } catch (err) {
        console.error(err);
        resultBox.innerHTML = "<p>Error fetching data.</p>";
    }
}
