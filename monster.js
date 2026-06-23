const monster = {
    x: 650,
    y: 350,
    width: 45,
    height: 45,
    speed: 0.6,
    health: 20,
    maxHealth: 20,
    alive: true
};

function resetMonster() {
    monster.x = 650;
    monster.y = 350;
    monster.health = monster.maxHealth;
    monster.alive = true;
}

function drawMonster() {
    if (!monster.alive) return;

    ctx.fillStyle = "#ef476f";
    ctx.beginPath();
    ctx.arc(monster.x + 22, monster.y + 22, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(monster.x + 14, monster.y + 15, 6, 0, Math.PI * 2);
    ctx.arc(monster.x + 30, monster.y + 15, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(monster.x + 14, monster.y + 15, 2, 0, Math.PI * 2);
    ctx.arc(monster.x + 30, monster.y + 15, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(monster.x + 12, monster.y + 28, 20, 4);

    ctx.fillStyle = "red";
    ctx.fillRect(monster.x - 5, monster.y - 15, 55, 7);

    ctx.fillStyle = "lime";
    ctx.fillRect(
        monster.x - 5,
        monster.y - 15,
        55 * (monster.health / monster.maxHealth),
        7
    );
}