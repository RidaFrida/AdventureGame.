const npc = {
   x: 325,
   y: 315,
    width: 40,
    height: 55
};

function drawNpc() {
    ctx.fillStyle = "#f4a261";
    ctx.fillRect(npc.x + 10, npc.y + 22, 20, 28);

    ctx.fillStyle = "#f5c99b";
    ctx.beginPath();
    ctx.arc(npc.x + 20, npc.y + 12, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#6d4c41";
    ctx.fillRect(npc.x + 8, npc.y + 4, 24, 8);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(npc.x + 16, npc.y + 12, 1.5, 0, Math.PI * 2);
    ctx.arc(npc.x + 24, npc.y + 12, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#222";
    ctx.font = "14px Arial";
    ctx.fillText("E", npc.x + 16, npc.y - 8);
}