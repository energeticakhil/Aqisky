async function getAQI() {
    const city = document.getElementById("cityInput").value;

    const response = await fetch(`/.netlify/functions/waqi-proxy?city=${city}`);
    const data = await response.json();

    if (data.status !== "ok") {
        document.getElementById("result").innerHTML = `
            <p>City not found or API error.</p>
        `;
        return;
    }

    let cityName = data.data.city?.name || city;

    document.getElementById("result").innerHTML = `
        <h2>${cityName}</h2>
        <p>AQI: ${data.data.aqi}</p>
    `;
}
