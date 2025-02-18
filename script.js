document.addEventListener("DOMContentLoaded", () => {
    let level = parseInt(localStorage.getItem("level")) || 1;
    let coinsPerClick = parseInt(localStorage.getItem("coinsPerClick")) || 1;
    let totalCoins = parseInt(localStorage.getItem("totalCoins")) || 0;
    let selectedRace = localStorage.getItem("selectedRace") || null;
    let maxEnergy = parseInt(localStorage.getItem("maxEnergy")) || 10;
    let currentEnergy = parseInt(localStorage.getItem("currentEnergy")) || maxEnergy;
    let energyRechargeRate = parseInt(localStorage.getItem("energyRechargeRate")) || 1;

    const raceSelection = document.getElementById("raceSelection");
    const gameContainer = document.getElementById("gameContainer");
    const raceButtons = document.querySelectorAll(".raceButton");

    const levelDisplay = document.getElementById("level");
    const coinsDisplay = document.getElementById("coins");
    const energyDisplay = document.getElementById("energy");
    const coinsPerClickDisplay = document.getElementById("coinsPerClickDisplay");

    const raceImage = document.getElementById("raceImage");
    const flagImage = document.getElementById("flagImage");

    const clickButton = document.getElementById("clickButton");
    const upgradeButton = document.getElementById("upgradeButton");

    const upgradeCostDisplay = document.getElementById("upgradeCost");

    const tabs = {
        mining: document.getElementById("miningTabContent"),
        upgrades: document.getElementById("upgradesTabContent"),
        socialMedia: document.getElementById("socialMediaTabContent"),
        drop: document.getElementById("dropTabContent"),
        // leaderboard: document.getElementById("leaderboardTabContent"),
    };

    const tabButtons = {
        mining: document.getElementById("miningTab"),
        upgrades: document.getElementById("upgradesTab"),
        socialMedia: document.getElementById("socialMediaTab"),
        drop: document.getElementById("dropTab"),
        // leaderboard: document.getElementById("leaderboardTab"),
    };

    // Данные картинок персонажа по уровням
    const raceImages = {
        Castle: ["castle_1.webp", "castle_2.webp", "castle_3.webp", "castle_4.webp", "castle_5.webp", "castle_6.webp", "castle_7.webp", "castle_8.webp", "castle_9.webp", "castle_10.webp", "castle_11.webp", "castle_12.webp", "castle_13.webp", "castle_14.webp"],
        Inferno: ["inferno_1.webp", "inferno_2.webp", "inferno_3.webp", "inferno_4.webp", "inferno_5.webp", "inferno_6.webp", "inferno_7.webp", "inferno_8.webp", "inferno_9.webp", "inferno_10.webp", "inferno_11.webp", "inferno_12.webp", "inferno_13.webp", "inferno_14.webp"],
        Conflux: ["conflux_1.webp", "conflux_2.webp", "conflux_3.webp", "conflux_4.webp", "conflux_5.webp", "conflux_6.webp", "conflux_7.webp", "conflux_8.webp", "conflux_9.webp", "conflux_10.webp", "conflux_11.webp", "conflux_12.webp", "conflux_13.webp", "conflux_14.webp"]
    };

    function updateDisplay() {
        levelDisplay.textContent = `Уровень: ${level}`;
        coinsDisplay.textContent = `Золото: ${totalCoins}`;
        energyDisplay.textContent = `Осталось ходов: ${currentEnergy}/${maxEnergy}`;
        coinsPerClickDisplay.textContent = `Золота за клик: ${coinsPerClick}`;
        upgradeCostDisplay.textContent = 10 * level;

        // Обновляем картинку персонажа при каждом 10-м уровне
        if (selectedRace) {
            let imageIndex = Math.floor(level / 10);
            if (imageIndex >= raceImages[selectedRace].length) {
                imageIndex = raceImages[selectedRace].length - 1; // Оставляем последнюю картинку
            }
            raceImage.src = raceImages[selectedRace][imageIndex];
        }

        clickButton.disabled = currentEnergy <= 0;
        raceImage.style.opacity = currentEnergy > 0 ? "1" : "0.5";
    }

    function restoreEnergy() {
        if (currentEnergy < maxEnergy) {
            currentEnergy += energyRechargeRate;
            if (currentEnergy > maxEnergy) currentEnergy = maxEnergy;
            localStorage.setItem("currentEnergy", currentEnergy);
            updateDisplay();
        }
    }

    raceButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            selectedRace = event.target.dataset.race;
            localStorage.setItem("selectedRace", selectedRace);

            raceSelection.style.display = "none";
            gameContainer.style.display = "block";

            updateDisplay();
        });
    });

    raceImage.addEventListener("click", () => {
        if (currentEnergy > 0) {
            totalCoins += coinsPerClick;
            currentEnergy--;
            localStorage.setItem("totalCoins", totalCoins);
            localStorage.setItem("currentEnergy", currentEnergy);
            updateDisplay();
        }
    });


    clickButton.addEventListener("click", () => {
        if (currentEnergy > 0) {
            totalCoins += coinsPerClick;
            currentEnergy--;
            localStorage.setItem("totalCoins", totalCoins);
            localStorage.setItem("currentEnergy", currentEnergy);
            updateDisplay();
        }
    });

    upgradeButton.addEventListener("click", () => {
        const cost = 10 * level;
        if (totalCoins >= cost) {
            totalCoins -= cost;
            level++;
            coinsPerClick++;
            localStorage.setItem("level", level);
            localStorage.setItem("coinsPerClick", coinsPerClick);
            localStorage.setItem("totalCoins", totalCoins);
            updateDisplay();
        }
    });

    setInterval(restoreEnergy, 5000);

    function switchTab(tabName) {
        Object.values(tabs).forEach(tab => tab.style.display = "none");
        tabs[tabName].style.display = "block";

        Object.values(tabButtons).forEach(button => button.classList.remove("active"));
        tabButtons[tabName].classList.add("active");
    }

    tabButtons.mining.addEventListener("click", () => switchTab("mining"));
    tabButtons.upgrades.addEventListener("click", () => switchTab("upgrades"));
    tabButtons.socialMedia.addEventListener("click", () => switchTab("socialMedia"));
    tabButtons.drop.addEventListener("click", () => switchTab("drop"));
    tabButtons.leaderboard.addEventListener("click", () => switchTab("leaderboard"));

    if (!selectedRace) {
        raceSelection.style.display = "block";
        gameContainer.style.display = "none";
    } else {
        raceSelection.style.display = "none";
        gameContainer.style.display = "block";
        updateDisplay();
        switchTab("mining"); // Открываем Mining по умолчанию
    }
});
