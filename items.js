const crystals = [
    { x: 200, y: 330, collected: false },
    { x: 400, y: 360, collected: false },
    { x: 600, y: 320, collected: false }
];

const ingredients = [
    { x: 120, y: 430, name: "Ягоды", collected: false, color: "#e63946" },
    { x: 360, y: 310, name: "Мука", collected: false, color: "#f1faee" },
    { x: 690, y: 430, name: "Мёд", collected: false, color: "#ffbe0b" }
];
const keyItem = {
    x: 690,
    y: 360,
    collected: false
};
const cakeItem = {
    x: 320,
    y: 340,
    collected: true
};
function resetItems() {
    crystals.forEach(item => item.collected = false);
    ingredients.forEach(item => item.collected = false);
    keyItem.collected = false;
}
cakeItem.collected = true;
cakeItem.x = 320;
cakeItem.y = 340;
function drawCrystals() {
    crystals.forEach(crystal => {
        if (!crystal.collected) {
            ctx.fillStyle = "#9d4edd";
            ctx.beginPath();
            ctx.moveTo(crystal.x, crystal.y - 15);
            ctx.lineTo(crystal.x + 12, crystal.y);
            ctx.lineTo(crystal.x, crystal.y + 15);
            ctx.lineTo(crystal.x - 12, crystal.y);
            ctx.closePath();
            ctx.fill();
        }
    });
}

function drawIngredients() {
    ingredients.forEach(item => {
        if (!item.collected) {
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.arc(item.x, item.y, 11, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#222";
            ctx.font = "12px Arial";
            ctx.fillText(item.name, item.x - 18, item.y - 16);
        }
    });
}
function drawKey() {
    if (keyItem.collected) return;

    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(keyItem.x, keyItem.y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(keyItem.x + 8, keyItem.y - 3, 22, 6);
    ctx.fillRect(keyItem.x + 25, keyItem.y - 3, 4, 12);
    ctx.fillRect(keyItem.x + 16, keyItem.y - 3, 4, 9);
}
function drawCake() {
    if (cakeItem.collected) return;

    ctx.fillStyle = "#ff8fab";
    ctx.fillRect(cakeItem.x - 12, cakeItem.y - 8, 24, 16);

    ctx.fillStyle = "#fff0f3";
    ctx.fillRect(cakeItem.x - 12, cakeItem.y - 12, 24, 6);

    ctx.fillStyle = "#d00000";
    ctx.beginPath();
    ctx.arc(cakeItem.x, cakeItem.y - 15, 4, 0, Math.PI * 2);
    ctx.fill();
}
