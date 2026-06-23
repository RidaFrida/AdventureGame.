const portal = {
    x: 700,
    y: 220,
    width: 60,
    height: 90,
    opened: false
};

function resetPortal() {
    portal.opened = false;
}

function drawPortal() {
    if (!portal.opened) return;

    ctx.fillStyle = "#6a00f4";
    ctx.beginPath();
    ctx.ellipse(portal.x, portal.y, 35, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#c77dff";
    ctx.beginPath();
    ctx.ellipse(portal.x, portal.y, 22, 35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";

    for (let i = 0; i < 8; i++) {
        let angle = Date.now() / 500 + i;
        let px = portal.x + Math.cos(angle) * 25;
        let py = portal.y + Math.sin(angle) * 35;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}