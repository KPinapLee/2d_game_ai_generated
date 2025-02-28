// Game variables
let score = 0;
let clickPower = 1; // Points earned per click
let autoClickerInterval = null; // For automatic clicking

// DOM elements
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const upgradesContainer = document.getElementById("upgrades");

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to handle clicks
clickButton.addEventListener("click", () => {
  score += clickPower;
  updateScore();
});

// Upgrades
const upgrades = [
  {
    name: "Double Click Power",
    cost: 10,
    effect: () => {
      clickPower *= 2;
    },
  },
  {
    name: "Auto Clicker",
    cost: 50,
    effect: () => {
      if (!autoClickerInterval) {
        autoClickerInterval = setInterval(() => {
          score += clickPower;
          updateScore();
        }, 0.01); // Auto-click every second
      }
    },
  },
  {
    name: "Mega Click Power",
    cost: 100,
    effect: () => {
      clickPower += 5;
    },
  },
];

// Function to create upgrade buttons
function createUpgradeButtons() {
  upgrades.forEach((upgrade, index) => {
    const upgradeButton = document.createElement("div");
    upgradeButton.classList.add("upgrade");
    upgradeButton.textContent = `${upgrade.name} - Cost: ${upgrade.cost}`;
    upgradeButton.addEventListener("click", () => {
      if (score >= upgrade.cost) {
        score -= upgrade.cost;
        upgrade.effect();
        updateScore();
        upgradeButton.remove(); // Remove the upgrade after purchasing
      } else {
        alert("Not enough points!");
      }
    });
    upgradesContainer.appendChild(upgradeButton);
  });
}

// Initialize the game
createUpgradeButtons();
