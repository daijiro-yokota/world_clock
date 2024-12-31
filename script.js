document.addEventListener("DOMContentLoaded", () => {
    const inputTime = document.getElementById("input-time");
    const inputDate = document.getElementById("input-date");

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const date = now.toISOString().split("T")[0];

    inputTime.value = `${hours}:${minutes}`;
    inputDate.value = date;
});

function updateTimes() {
    const inputTime = document.getElementById("input-time").value;
    const inputDate = document.getElementById("input-date").value;
    const inputCity = document.getElementById("input-city").value;

    if (!inputTime || !inputDate) {
        alert("Please set both time and date.");
        return;
    }

    // Parse the input time and date
    const [hours, minutes] = inputTime.split(":").map(Number);
    const selectedDate = new Date(`${inputDate}T${inputTime}:00`);

    // Calculate time for New York (UTC-5) and Tokyo (UTC+9)
    const timeNY = new Date(selectedDate.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const timeTokyo = new Date(selectedDate.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    const timeSelectedCity = new Date(selectedDate.toLocaleString("en-US", { timeZone: inputCity }));

    // Format times for display
    const options = { hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
    const timeNYFormatted = timeNY.toLocaleTimeString("en-US", options);
    const timeTokyoFormatted = timeTokyo.toLocaleTimeString("en-US", options);
    const timeSelectedCityFormatted = timeSelectedCity.toLocaleTimeString("en-US", options);

    // Update the clocks
    document.getElementById("time1").textContent = timeNYFormatted;
    document.getElementById("time2").textContent = timeTokyoFormatted;
    alert(`Selected City Time: ${timeSelectedCityFormatted}`);
}
