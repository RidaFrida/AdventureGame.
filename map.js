const river = {
    x: 360,
    y: 300,
    width: 90,
    height: 200
};

const bridge = {
    x: 335,
    y: 370,
    width: 140,
    height: 70,
};

const house = {
    x: 285,
    y: 230,
    width: 90,
    height: 85
};

function drawTree(x, y) {
    ctx.fillStyle = "#8b5a2b";
    ctx.fillRect(x + 15, y + 30, 20, 50);

    ctx.fillStyle = "#2d9c4b";
    ctx.beginPath();
    ctx.arc(x + 25, y + 25, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#3fc66b";
    ctx.beginPath();
    ctx.arc(x + 10, y + 30, 25, 0, Math.PI * 2);
    ctx.arc(x + 40, y + 30, 25, 0, Math.PI * 2);
    ctx.fill();
}

function drawStone(x, y) {
    ctx.fillStyle = "#8d99ae";
    ctx.beginPath();
    ctx.ellipse(x, y, 28, 16, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawFlower(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.arc(x + 7, y, 5, 0, Math.PI * 2);
    ctx.arc(x + 3, y - 6, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffd93d";
    ctx.beginPath();
    ctx.arc(x + 3, y - 2, 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawHouse() {
    ctx.fillStyle = "#d18b47";
    ctx.fillRect(house.x, house.y + 30, house.width, 55);

    ctx.fillStyle = "#8b3a2b";
    ctx.beginPath();
    ctx.moveTo(house.x - 10, house.y + 35);
    ctx.lineTo(house.x + house.width / 2, house.y);
    ctx.lineTo(house.x + house.width + 10, house.y + 35);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#5c4033";
    ctx.fillRect(house.x + 35, house.y + 55, 22, 30);

    ctx.fillStyle = "#ffe8a3";
    ctx.fillRect(house.x + 10, house.y + 45, 18, 18);
    ctx.fillRect(house.x + 63, house.y + 45, 18, 18);
}

function drawWorld() {
    ctx.fillStyle = "#8fd3ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#7fd36a";
    ctx.fillRect(0, 220, canvas.width, 280);

    ctx.fillStyle = "#ffd93d";
    ctx.beginPath();
    ctx.arc(700, 70, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(120, 80, 25, 0, Math.PI * 2);
    ctx.arc(150, 80, 35, 0, Math.PI * 2);
    ctx.arc(185, 80, 25, 0, Math.PI * 2);
    ctx.fill();

    // речка
    ctx.fillStyle = "#4dabf7";
    ctx.fillRect(river.x, river.y, river.width, river.height);

    // мост
    ctx.fillStyle = "#9c6b30";
    ctx.fillRect(bridge.x, bridge.y, bridge.width, bridge.height);

    ctx.strokeStyle = "#6b3f1d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bridge.x, bridge.y + 12);
    ctx.lineTo(bridge.x + bridge.width, bridge.y + 12);
    ctx.moveTo(bridge.x, bridge.y + 30);
    ctx.lineTo(bridge.x + bridge.width, bridge.y + 30);
    ctx.stroke();

    drawHouse();

    drawTree(90, 300);
    drawTree(720, 300);
    drawTree(520, 250);

    drawStone(300, 420);
    drawStone(460, 450
    );

    drawFlower(170, 420, "#ff70a6");
    drawFlower(240, 455, "#c77dff");
    drawFlower(600, 430, "#ff70a6");
    drawFlower(680, 460, "#c77dff");
}