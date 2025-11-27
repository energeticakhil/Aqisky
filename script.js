document.getElementById("cityInput").addEventListener("input", async function () {
  const query = this.value.trim();
  if (query.length < 2) return;

  const res = await fetch(`/.netlify/functions/waqi-proxy?city=${query}`);
  const data = await res.json();

  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = "";

  if (!data || !data.data || data.data.length === 0) return;

  // For WAQI API, suggestions don’t exist — so we skip.
});

async function getAQI() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const res = await fetch(`/.netlify/functions/waqi-proxy?city=${city}`);
  const data = await res.json();

  const resultBox = document.getElementById("result");

  if (!data || data.status !== "ok") {
    resultBox.innerHTML = `<h3>API error.</h3>`;
    return;
  }

  resultBox.innerHTML = `
    <h2>${data.data.city.name}</h2>
    <p>AQI: ${data.data.aqi}</p>
  `;
}
