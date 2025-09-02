const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load characters
const playerImg = new Image();
playerImg.src = "player.png"; // apna anime character PNG sprite rakho

const enemyImg = new Image();
enemyImg.src = "enemy.png"; // dusra anime character PNG sprite rakho

// Characters
const player = {
  x: 150,
  y: 320,
  width: 100,
  height: 150,
  health: 100,
  attack: false,
  color: "#00eaff"
};

const enemy = {
  x: 750,
  y: 320,
  width: 100,
  height: 150,
  health: 100,
  attack: false,
  color: "#ff4f81"
};

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Health Bars
  ctx.fillStyle = "#222";
  ctx.fillRect(40, 20, 400, 25);
  ctx.fillRect(560, 20, 400, 25);

  ctx.fillStyle = player.color;
  ctx.fillRect(40, 20, player.health * 4, 25);

  ctx.fillStyle = enemy.color;
  ctx.fillRect(960 - enemy.health * 4, 20, enemy.health * 4, 25);

  // Player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Enemy
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);

  // Attack effects
  if (player.attack) {
    ctx.fillStyle = "rgba(0,234,255,0.3)";
    ctx.fillRect(player.x + player.width, player.y, 40, player.height);
  }
  if (enemy.attack) {
    ctx.fillStyle = "rgba(255,79,129,0.3)";
    ctx.fillRect(enemy.x - 40, enemy.y, 40, enemy.height);
  }
}

// Collision
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Update
function update() {
  if (player.attack && isColliding(player, enemy)) {
    enemy.health = Math.max(0, enemy.health - 1);
  }
  if (enemy.attack && isColliding(enemy, player)) {
    player.health = Math.max(0, player.health - 1);
  }

  if (player.health <= 0 || enemy.health <= 0) {
    setTimeout(() => {
      alert(player.health <= 0 ? "Enemy Wins!" : "Player Wins!");
      player.health = 100;
      enemy.health = 100;
    }, 100);
  }
}

// Controls
window.addEventListener("keydown", (e) => {
  // Player 1
  if (e.code === "KeyA") player.x -= 20;
  if (e.code === "KeyD") player.x += 20;
  if (e.code === "KeyW") player.y -= 20;
  if (e.code === "KeyS") player.y += 20;
  if (e.code === "KeyF") player.attack = true;

  // Player 2
  if (e.code === "ArrowLeft") enemy.x -= 20;
  if (e.code === "ArrowRight") enemy.x += 20;
  if (e.code === "ArrowUp") enemy.y -= 20;
  if (e.code === "ArrowDown") enemy.y += 20;
  if (e.code === "Enter") enemy.attack = true;
});

window.addEventListener("keyup", (e) => {
  if (e.code === "KeyF") player.attack = false;
  if (e.code === "Enter") enemy.attack = false;
});

// Game loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();