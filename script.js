function updateTimes() {
    const inputTime = document.getElementById("input-time").value;
    const inputDate = document.getElementById("input-date").value;

    if (!inputTime || !inputDate) {
        alert("Please set both time and date.");
        return;
    }

    // Parse the input time and date
    const [hours, minutes] = inputTime.split(":").map(Number);
    const selectedDate = new Date(`${inputDate}T${inputTime}:00`);

    // Calculate time for New York (UTC-5) and Tokyo (UTC+9)
    const timeNY = new Date(selectedDate.getTime() - 5 * 60 * 60 * 1000);
    const timeTokyo = new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000);

    // Format times for display
    const options = { hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
    const timeNYFormatted = timeNY.toLocaleTimeString("en-US", options);
    const timeTokyoFormatted = timeTokyo.toLocaleTimeString("en-US", options);

    // Update the clocks
    document.getElementById("time1").textContent = timeNYFormatted;
    document.getElementById("time2").textContent = timeTokyoFormatted;
}
