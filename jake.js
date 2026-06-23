const jake = {
    x: 80,
    y: 120,
    width: 36,
    height: 36,
    active: false,
    timer: 0,
    cooldown: 0,
    speed: 3,
    size: 1,
    attackTimer: 0
};

function resetJake() {
    jake.x = 80;
    jake.y = 120;
    jake.active = false;
    jake.timer = 0;
    jake.cooldown = 0;
    jake.size = 1;
    jake.attackTimer = 0;
}

function summonJake() {
    if (jake.cooldown > 0 || jake.active) return;

    jake.active = true;
    playSound(sounds.dog);

    jake.timer = 600;
    jake.cooldown = 1200;

    jake.x = hero.x - 40;
    jake.y = hero.y + 10;
}

function updateJake() {
    if (jake.cooldown > 0) jake.cooldown--;

    if (!jake.active) return;

    jake.timer--;

    if (jake.attackTimer > 0) {
        jake.attackTimer--;
        jake.size = 2.5;
    } else {
        jake.size += (1 - jake.size) * 0.15;
    }

    jake.x += (hero.x - 45 - jake.x) * 0.12;
    jake.y += (hero.y + 10 - jake.y) * 0.12;

    if (monster.alive) {
        let dx = monster.x - jake.x;
        let dy = monster.y - jake.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 55) {
            jake.x += dx / dist * 2.5;
            jake.y += dy / dist * 2.5;
        }

        if (dist < 45) {
            monster.x += dx * 0.35;
            monster.y += dy * 0.35;

            if (Math.random() < 0.03) {
                monster.health--;
                jake.attackTimer = 25;

                if (monster.health <= 0) {
                    monster.alive = false;
                    portal.opened = true;
                    playSound(sounds.portal);
                }
            }
        }
    }

    if (jake.timer <= 0) {
        jake.active = false;
    }
}

function drawJake() {
    if (!jake.active) return;

    const s = jake.size;
    const cx = jake.x + 18;
    const cy = jake.y + 18;

    ctx.fillStyle = "#f4c542";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 20 * s, 16 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(cx - 6 * s, cy - 3 * s, 2 * s, 0, Math.PI * 2);
    ctx.arc(cx + 6 * s, cy - 3 * s, 2 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(cx - 4 * s, cy + 5 * s, 8 * s, 2 * s);
}