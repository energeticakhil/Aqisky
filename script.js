// Search suggestions
document.getElementById("cityInput").addEventListener("input", async function () {
    const query = this.value.trim();
    if (query.length < 2) return;

    const res = await fetch(`/.netlify/functions/waqi-proxy?search=${query}`);
    const data = await res.json();

    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (!data || !data.data) return;

    data.data.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = item.station.name;
        div.onclick = () => {
            document.getElementById("cityInput").value = item.station.name;
            suggestionsBox.innerHTML = "";
        };
        suggestionsBox.appendChild(div);
    });
});


// Main AQI fetch
async function getAQI() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Enter a city name");

    const res = await fetch(`/.netlify/functions/waqi-proxy?city=${city}`);
    const data = await res.json();

    document.getElementById("city").innerText = data.city || "City Not Found";
    document.getElementById("aqiValue").innerText = "AQI: " + (data.aqi || "N/A");
    document.getElementById("desc").innerText = data.desc || "";
}
