// Show Bio by default when the page loads
document.addEventListener("DOMContentLoaded", function() {
  showSection("bio");
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  const selected = document.getElementById(sectionId);
  selected.style.display = "block";

  // Delay small activation for animation
  setTimeout(() => {
    selected.classList.add("active");
  }, 50);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ------------------------------
// 🎮 Coin Collector Game Logic
// ------------------------------

let canvas, ctx, player, coins, score, gameInterval;

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  player = { x: 180, y: 450, width: 40, height: 40, color: "#00ffff" };
  coins = [];
  score = 0;
  document.getElementById("scoreDisplay").textContent = "Score: 0";
  clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 30);
  window.addEventListener("keydown", movePlayer);
}

function movePlayer(e) {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  handleCoins();
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function handleCoins() {
  // Randomly generate coins
  if (Math.random() < 0.05) {
    coins.push({ x: Math.random() * 360, y: 0, size: 20 });
  }

  for (let i = 0; i < coins.length; i++) {
    coins[i].y += 5;
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    ctx.arc(coins[i].x, coins[i].y, coins[i].size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Collision detection
    if (
      coins[i].y + coins[i].size > player.y &&
      coins[i].x > player.x &&
      coins[i].x < player.x + player.width
    ) {
      coins.splice(i, 1);
      score++;
      document.getElementById("scoreDisplay").textContent = "Score: " + score;
    }
  }

  // Remove coins that fall off screen
  coins = coins.filter((coin) => coin.y < canvas.height);
}
