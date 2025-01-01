document.addEventListener("DOMContentLoaded", () => {
    const inputCity2 = document.getElementById("input-city2");

    const cities = [
        { name: "Kiritimati (GMT +14:00)", timeZone: "Pacific/Kiritimati" },
        { name: "Auckland (GMT +13:00)", timeZone: "Pacific/Auckland" },
        { name: "Anadyr (GMT +12:00)", timeZone: "Asia/Anadyr" },
        { name: "Melbourne (GMT +11:00)", timeZone: "Australia/Melbourne" },
        { name: "Brisbane (GMT +10:00)", timeZone: "Australia/Brisbane" },
        { name: "Tokyo (GMT +9:00)", timeZone: "Asia/Tokyo" },
        { name: "Beijing (GMT +8:00)", timeZone: "Asia/Shanghai" },
        { name: "Jakarta (GMT +7:00)", timeZone: "Asia/Jakarta" },
        { name: "Dhaka (GMT +6:00)", timeZone: "Asia/Dhaka" },
        { name: "Tashkent (GMT +5:00)", timeZone: "Asia/Tashkent" },
        { name: "Kabul (GMT +4:30)", timeZone: "Asia/Kabul" },
        { name: "Dubai (GMT +4:00)", timeZone: "Asia/Dubai" },
        { name: "Tehran (GMT +3:30)", timeZone: "Asia/Tehran" },
        { name: "Moscow (GMT +3:00)", timeZone: "Europe/Moscow" },
        { name: "Cairo (GMT +2:00)", timeZone: "Africa/Cairo" },
        { name: "Brussels (GMT +1:00)", timeZone: "Europe/Brussels" },
        { name: "London (GMT +0:00)", timeZone: "Europe/London" },
        { name: "Praia (GMT -1:00)", timeZone: "Atlantic/Cape_Verde" },
        { name: "Nuuk (GMT -2:00)", timeZone: "America/Godthab" },
        { name: "Buenos Aires (GMT -3:00)", timeZone: "America/Argentina/Buenos_Aires" },
        { name: "Caracas (GMT -4:00)", timeZone: "America/Caracas" },
        { name: "New York (GMT -5:00)", timeZone: "America/New_York" },
        { name: "Mexico City (GMT -6:00)", timeZone: "America/Mexico_City" },
        { name: "Colorado (GMT -7:00)", timeZone: "America/Denver" },
        { name: "Los Angeles (GMT -8:00)", timeZone: "America/Los_Angeles" },
        { name: "Anchorage (GMT -9:00)", timeZone: "America/Anchorage" },
        { name: "Honolulu (GMT -10:00)", timeZone: "Pacific/Honolulu" },
        { name: "Alofi (GMT -11:00)", timeZone: "Pacific/Niue" }
    ];

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city.timeZone;
        option.textContent = city.name;
        if (city.timeZone === "America/New_York") {
            option.selected = true;
        }
        inputCity2.appendChild(option);
    });

    // Detect user's time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userCity = cities.find(city => city.timeZone === userTimeZone);

    if (userCity) {
        document.getElementById('static-city').textContent = userCity.name;
    } else {
        document.getElementById('static-city').textContent = "Unknown Location";
    }

    const inputTime = document.getElementById("input-time");
    const inputDate = document.getElementById("input-date");

    const nowInUserTimeZone = new Date(new Date().toLocaleString("en-US", { timeZone: userTimeZone }));
    const hours = String(nowInUserTimeZone.getHours()).padStart(2, "0");
    const minutes = String(nowInUserTimeZone.getMinutes()).padStart(2, "0");
    const userDate = new Date(nowInUserTimeZone);
    const month = String(userDate.getMonth() + 1).padStart(2, "0");
    const day = String(userDate.getDate()).padStart(2, "0");
    const year = userDate.getFullYear();

    inputTime.value = `${hours}:${minutes}`;
    inputDate.value = `${year}-${month}-${day}`;

    // Update times function
    window.updateTimes = function() {
        const inputTime = document.getElementById("input-time").value;
        const inputDate = document.getElementById("input-date").value;
        const inputCity2 = document.getElementById("input-city2").value;

        if (!inputTime || !inputDate || !userTimeZone || !inputCity2) {
            alert("Please set time, date, and both cities.");
            return;
        }

        // Parse the input time and date
        const selectedDate = new Date(`${inputDate}T${inputTime}:00`);

        // Calculate time for two cities
        const timeCity1 = new Date(selectedDate.toLocaleString("en-US", { timeZone: userTimeZone }));
        const timeCity2 = new Date(selectedDate.toLocaleString("en-US", { timeZone: inputCity2 }));

        // Format times and dates for display
        const timeOptions = { hour: "2-digit", minute: "2-digit" };
        const dateOptions = { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" };
        const timeCity1Formatted = timeCity1.toLocaleTimeString("en-US", timeOptions);
        const dateCity1Formatted = timeCity1.toLocaleDateString("en-US", dateOptions);
        const timeCity2Formatted = timeCity2.toLocaleTimeString("en-US", timeOptions);
        const dateCity2Formatted = timeCity2.toLocaleDateString("en-US", dateOptions);

        // Find city names for the timezones
        const userCity = cities.find(city => city.timeZone === userTimeZone);
        const theirCity = cities.find(city => city.timeZone === inputCity2);

        // Update the clocks and dates
        document.getElementById("time1").textContent = `${timeCity1Formatted} - ${dateCity1Formatted}`;
        document.getElementById("time2").textContent = `${timeCity2Formatted} - ${dateCity2Formatted}`;

        // Update the timezones
        document.getElementById("timezone1").textContent = userCity ? userCity.name : userTimeZone;
        document.getElementById("timezone2").textContent = theirCity ? theirCity.name : inputCity2;
    };
});