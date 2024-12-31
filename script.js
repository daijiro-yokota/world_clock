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
    const inputCity1 = document.getElementById("input-city1").value;
    const inputCity2 = document.getElementById("input-city2").value;
    const inputCity3 = document.getElementById("input-city3").value;

    if (!inputTime || !inputDate || !inputCity1 || !inputCity2) {
        alert("Please set time, date, and both cities.");
        return;
    }

    // Parse the input time and date
    const selectedDate = new Date(`${inputDate}T${inputTime}:00`);
<<<<<<< Updated upstream
=======

    // Calculate time for two cities
>>>>>>> Stashed changes
    const timeCity1 = new Date(selectedDate.toLocaleString("en-US", { timeZone: inputCity1 }));
    const timeCity2 = new Date(selectedDate.toLocaleString("en-US", { timeZone: inputCity2 }));
    const timeCity3 = new Date(selectedDate.toLocaleString("en-US", { timeZone: inputCity3 }));

    // Format times for display
    const options = { hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
    const timeCity1Formatted = timeCity1.toLocaleTimeString("en-US", options);
    const timeCity2Formatted = timeCity2.toLocaleTimeString("en-US", options);
    const timeCity3Formatted = timeCity3.toLocaleTimeString("en-US", options);

    // Update the clocks
    document.getElementById("time1").textContent = timeCity1Formatted;
    document.getElementById("time2").textContent = timeCity2Formatted;
<<<<<<< Updated upstream
    document.getElementById("time3").textContent = timeCity3Formatted;
}
=======
}
>>>>>>> Stashed changes
