const hero = {
    x: 100,
    y: 100,
    width: 40,
    height: 52,

    speed: 5,

    // ❤️ 3 сердца
    health: 3,
    maxHealth: 3,

    invincible: 0,
    immortalTimer: 0,

    walkFrame: 0,
    walkSound: 0,

    attackCooldown: 0,
    attackEffect: 0
};

function resetHero() {
    hero.x = 100;
    hero.y = 100;

    // Восстанавливаем все сердца
    hero.health = hero.maxHealth;

    hero.invincible = 0;
    hero.immortalTimer = 0;

    hero.walkFrame = 0;
    hero.walkSound = 0;

    hero.attackCooldown = 0;
    hero.attackEffect = 0;
    hero.walkSound = 0;
}

function drawHero() {

    const swing = Math.sin(hero.walkFrame) * 5;
    const attackSwing = hero.attackEffect > 0 ? 12 : 0;

    if (hero.immortalTimer > 0) {
        ctx.globalAlpha = 0.6;
    }

    // Рюкзак
    ctx.fillStyle = "#2f855a";
    ctx.fillRect(hero.x + 2, hero.y + 24, 14, 22);

    // Тело
    ctx.fillStyle = "#4da6ff";
    ctx.fillRect(hero.x + 10, hero.y + 24, 20, 20);

    // Ноги
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(hero.x + 15, hero.y + 44);
    ctx.lineTo(hero.x + 15 + swing, hero.y + 52);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(hero.x + 25, hero.y + 44);
    ctx.lineTo(hero.x + 25 - swing, hero.y + 52);
    ctx.stroke();

    // Левая рука
    ctx.beginPath();
    ctx.moveTo(hero.x + 10, hero.y + 28);
    ctx.lineTo(hero.x + swing, hero.y + 34);
    ctx.stroke();

    // Правая рука
    ctx.beginPath();
    ctx.moveTo(hero.x + 30, hero.y + 28);
    ctx.lineTo(hero.x + 40 - swing + attackSwing, hero.y + 22);
    ctx.stroke();

    // Белая шапка
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(hero.x + 20, hero.y + 10, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hero.x + 7, hero.y + 2, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hero.x + 33, hero.y + 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Лицо
    ctx.fillStyle = "#f5c99b";
    ctx.beginPath();
    ctx.arc(hero.x + 20, hero.y + 13, 8, 0, Math.PI * 2);
    ctx.fill();

    // Глаза
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(hero.x + 17, hero.y + 12, 1.5, 0, Math.PI * 2);
    ctx.arc(hero.x + 23, hero.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Улыбка
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(hero.x + 20, hero.y + 15, 3, 0, Math.PI);
    ctx.stroke();

    // Меч
    ctx.strokeStyle = "silver";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(hero.x + 40 - swing + attackSwing, hero.y + 22);
    ctx.lineTo(hero.x + 55 - swing + attackSwing, hero.y + 6);
    ctx.stroke();

    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(hero.x + 38 - swing + attackSwing, hero.y + 24);
    ctx.lineTo(hero.x + 43 - swing + attackSwing, hero.y + 19);
    ctx.stroke();

    ctx.globalAlpha = 1;
}