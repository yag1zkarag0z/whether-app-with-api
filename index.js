const apiKey = "afffaa66ac6bf0f07bcee283659df03d";
const weatherResult = document.getElementById("weatherResult");

document.getElementById("searchBtn").addEventListener("click", async () => {
    const city = encodeURIComponent(document.getElementById("cityInput").value.trim());
    if (!city) return alert("Please enter a city");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Hava durumuna göre neon renk ayarla
        let colorStart = "#ff416c", colorEnd = "#ff4b2b"; // default
        const weather = data.weather[0].main.toLowerCase();

        if (weather.includes("cloud")) { colorStart = "#5f6caf"; colorEnd = "#3a3f58"; }
        else if (weather.includes("rain")) { colorStart = "#00c6ff"; colorEnd = "#0072ff"; }
        else if (weather.includes("sun") || weather.includes("clear")) { colorStart = "#fddb92"; colorEnd = "#d1fdff"; }
        else if (weather.includes("snow")) { colorStart = "#e0f7fa"; colorEnd = "#80deea"; }

        weatherResult.style.background = `linear-gradient(135deg, ${colorStart}, ${colorEnd})`;

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temp:</strong> ${data.main.temp}°C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        weatherResult.style.background = `linear-gradient(135deg, #ff416c, #ff4b2b)`;
        weatherResult.innerHTML = `<p class="text-danger">${err.message}</p>`;
    }
});
