const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const sounds = {
    sword: new Audio("sounds/sword.mp3"),
    crystal: new Audio("sounds/crystal.mp3"),
    ingredient: new Audio("sounds/ingredient.mp3"),
    hurt: new Audio("sounds/hurt.mp3"),
    portal: new Audio("sounds/portal.mp3"),
    dog: new Audio("sounds/dog.mp3"),
    walk: new Audio("sounds/walk.mp3"),
    cakeReady: new Audio("sounds/cake_ready.mp3")
};

for (const key in sounds) {
    sounds[key].volume = 0.5;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

let keys = {};
let gameOver = false;
let finalEnding = false;
let portalEnding = false;
let enteringPortal = false;
let portalAnimation = 0;
let showDialog = false;

let score = 0;
let ingredientScore = 0;
let cakeReady = false;
let cakeEaten = false;

const obstacles = [
    { x: 105, y: 330, width: 40, height: 50 },
    { x: 735, y: 330, width: 40, height: 50 },
    { x: 535, y: 280, width: 40, height: 50 },

    { x: 285, y: 260, width: 90, height: 55 },
// Камень слева
{ x: 272, y: 404, width: 56, height: 32 },

// Камень справа
{ x: 432, y: 414, width: 56, height: 32 },
    // река сверху моста
{ x: 360, y: 300, width: 90, height: 35 },

// река снизу моста
{ x: 360, y: 420, width: 90, height: 55 }
];


document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (e.key === "r" || e.key === "R" || e.key === "к" || e.key === "К") {
        restartGame();
    }

    if (e.code === "Space") {
        attackMonster();
    }

    if (e.key === "q" || e.key === "Q" || e.key === "й" || e.key === "Й") {
        summonJake();
    }

    if (e.key === "e" || e.key === "E" || e.key === "у" || e.key === "У") {
        handleAction();
    }

    if (e.key === "c" || e.key === "C" || e.key === "с" || e.key === "С") {
        eatCake();
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function restartGame() {
    resetHero();
    resetMonster();
    resetItems();
    resetPortal();
    resetJake();

    keys = {};
    gameOver = false;
    finalEnding = false;
    portalEnding = false;
    enteringPortal = false;
    portalAnimation = 0;
    showDialog = false;

    score = 0;
    ingredientScore = 0;
    cakeReady = false;
    cakeEaten = false;
}

function isTouching(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function distanceBetween(a, b) {
    let ax = a.x + a.width / 2;
    let ay = a.y + a.height / 2;
    let bx = b.x + b.width / 2;
    let by = b.y + b.height / 2;

    let dx = ax - bx;
    let dy = ay - by;

    return Math.sqrt(dx * dx + dy * dy);
}

function handleAction() {
    if (distanceBetween(hero, npc) < 80) {
        showDialog = !showDialog;

        if (ingredientScore === 3 && !cakeReady && !cakeEaten) {
            cakeReady = true;
            playSound(sounds.cakeReady);
        }
    }
}

function eatCake() {
    if (cakeReady && !cakeEaten) {
        cakeReady = false;
        cakeEaten = true;
        playSound(sounds.crystal);
        hero.immortalTimer = 1200;
        showDialog = false;
    }
}

function attackMonster() {
    if (gameOver || finalEnding || enteringPortal) return;
    if (!monster.alive) return;
    if (hero.attackCooldown > 0) return;

    hero.attackCooldown = 25;
    hero.attackEffect = 8;
    playSound(sounds.sword);

    if (score < 3) return;

    if (distanceBetween(hero, monster) < 85) {
        monster.health--;
        monster.x += 20;

        if (monster.health <= 0) {
            monster.alive = false;
            if (keyItem.collected) {
    portal.opened = true;
    playSound(sounds.portal);
}

            playSound(sounds.portal);
            showDialog = false;
        }
    }
}

function update() {
    if (gameOver || finalEnding) return;

    if (enteringPortal) {
        portalAnimation++;

        hero.x += (portal.x - hero.x) * 0.08;
        hero.y += (portal.y - hero.y) * 0.08;

        if (portalAnimation > 90) {
            finalEnding = true;
            portalEnding = true;
        }

        return;
    }

    let oldX = hero.x;
    let oldY = hero.y;
    let isMoving = false;

    if (keys["ArrowUp"]) {
        hero.y -= hero.speed;
        isMoving = true;
    }

    if (keys["ArrowDown"]) {
        hero.y += hero.speed;
        isMoving = true;
    }

    if (keys["ArrowLeft"]) {
        hero.x -= hero.speed;
        isMoving = true;
    }

    if (keys["ArrowRight"]) {
        hero.x += hero.speed;
        isMoving = true;
    }

    hero.x = Math.max(0, Math.min(canvas.width - hero.width, hero.x));
    hero.y = Math.max(220, Math.min(canvas.height - hero.height, hero.y));

    obstacles.forEach(obstacle => {
        if (isTouching(hero, obstacle)) {
            hero.x = oldX;
            hero.y = oldY;
        }
    });

    if (isMoving) {
        hero.walkFrame += 0.25;
    }

    if (hero.invincible > 0) hero.invincible--;
    if (hero.immortalTimer > 0) hero.immortalTimer--;
    if (hero.attackCooldown > 0) hero.attackCooldown--;
    if (hero.attackEffect > 0) hero.attackEffect--;

    updateJake();

    if (monster.alive) {
        if (monster.x < hero.x) monster.x += monster.speed;
        if (monster.x > hero.x) monster.x -= monster.speed;
        if (monster.y < hero.y) monster.y += monster.speed;
        if (monster.y > hero.y) monster.y -= monster.speed;
    }

    collectItems();

    if (
        monster.alive &&
        isTouching(hero, monster) &&
        hero.invincible === 0 &&
        hero.immortalTimer === 0
    ) {
        hero.health--;
        playSound(sounds.hurt);
        hero.invincible = 60;

        hero.x -= 45;
        hero.y -= 25;

        if (hero.health <= 0) {
            gameOver = true;
        }
    }

    if (portal.opened && isTouching(hero, portal)) {
        enteringPortal = true;
        showDialog = false;
    }
}

function collectItems() {
    crystals.forEach(crystal => {
        if (!crystal.collected) {
            let fakeCrystal = {
                x: crystal.x - 10,
                y: crystal.y - 10,
                width: 20,
                height: 20
            };

            if (isTouching(hero, fakeCrystal)) {
                crystal.collected = true;
                score++;
                playSound(sounds.crystal);
            }
        }
    });

    ingredients.forEach(item => {
        if (!item.collected) {
            let fakeItem = {
                x: item.x - 10,
                y: item.y - 10,
                width: 20,
                height: 20
            };

            if (isTouching(hero, fakeItem)) {
                item.collected = true;
                ingredientScore++;
                playSound(sounds.ingredient);
            }
        }
    });

    if (!keyItem.collected) {
        let dx = hero.x - keyItem.x;
        let dy = hero.y - keyItem.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 45) {
            keyItem.collected = true;
            playSound(sounds.crystal);
        }
    }
}

    if (portal.opened && isTouching(hero, portal)) {
        enteringPortal = true;
        showDialog = false;
    }
if (!keyItem.collected) {
    let fakeKey = {
        x: keyItem.x - 10,
        y: keyItem.y - 10,
        width: 40,
        height: 20
    };

    if (isTouching(hero, fakeKey)) {
        keyItem.collected = true;
        playSound(sounds.crystal);
    }
}

function collectItems() {
    crystals.forEach(crystal => {
        if (!crystal.collected) {
            let fakeCrystal = {
                x: crystal.x - 10,
                y: crystal.y - 10,
                width: 20,
                height: 20
            };

            if (isTouching(hero, fakeCrystal)) {
                crystal.collected = true;
                score++;
                playSound(sounds.crystal);
            }
        }
    });

    ingredients.forEach(item => {
        if (!item.collected) {
            let fakeItem = {
                x: item.x - 10,
                y: item.y - 10,
                width: 20,
                height: 20
            };

            if (isTouching(hero, fakeItem)) {
                item.collected = true;
                ingredientScore++;
                playSound(sounds.ingredient);
            }
        }
    });

    // Подбор ключа
    if (!keyItem.collected) {
        let fakeKey = {
            x: keyItem.x - 20,
            y: keyItem.y - 20,
            width: 60,
            height: 50
        };

        if (isTouching(hero, fakeKey)) {
            keyItem.collected = true;
            playSound(sounds.crystal);
        }
    }
}
function drawDialog() {
    if (!showDialog || finalEnding) return;

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillRect(80, 345, 640, 115);

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 345, 640, 115);

    ctx.fillStyle = "#222";
    ctx.font = "20px Arial";

    if (ingredientScore < 3) {
        ctx.fillText("Повар: Принеси ягоды, муку и мёд.", 105, 380);
        ctx.fillText("Я испеку торт бессмертия.", 105, 410);
        ctx.fillText("Потом нажми C, чтобы съесть торт.", 105, 440);
    } else if (cakeReady && !cakeEaten) {
        ctx.fillText("Повар: Торт готов!", 105, 380);
        ctx.fillText("Нажми C — и станешь бессмертным на 20 секунд.", 105, 410);
    } else if (cakeEaten) {
        ctx.fillText("Повар: Торт уже съеден.", 105, 380);
        ctx.fillText("Теперь собери кристаллы и победи монстра.", 105, 410);
    } else if (score < 3) {
        ctx.fillText("Повар: Теперь собери 3 кристалла.", 105, 380);
        ctx.fillText("Без них монстр слишком сильный.", 105, 410);
        ctx.fillText("Когда соберёшь — бей пробелом.", 105, 440);
    } else {
        ctx.fillText("Повар: Кристаллы у тебя.", 105, 380);
        ctx.fillText("Монстр ослаблен. Атакуй пробелом!", 105, 410);
    }
}

function drawText() {
    if (finalEnding) {
        ctx.fillStyle = "#222";
        ctx.font = "34px Arial";

        ctx.fillText("Герой вошёл в портал!", 225, 210);
        ctx.font = "22px Arial";
        ctx.fillText("За лесом открылись новые странные земли.", 190, 250);
        ctx.fillText("Продолжение следует...", 295, 285);
        ctx.fillText("Нажми R, чтобы пройти заново", 240, 330);
        return;
    }

    ctx.fillStyle = "#222";
    ctx.font = "21px Arial";

    ctx.fillText("Кристаллы: " + score + " / 3", 20, 35);
    ctx.fillText("Ингредиенты: " + ingredientScore + " / 3", 20, 65);
    ctx.fillText("Ключ: " + (keyItem.collected ? "есть" : "нет"), 20, 95);

    let hearts = "";

    for (let i = 0; i < hero.maxHealth; i++) {
        if (i < hero.health) {
            hearts += "❤️";
        } else {
            hearts += "🖤";
        }
    }

    ctx.fillText("Жизни: " + hearts, 20, 95);

    ctx.fillText("E — говорить", 20, 125);
    ctx.fillText("C — съесть торт", 20, 155);
    ctx.fillText("Пробел — удар", 20, 185);
    ctx.fillText("Q — позвать Джейка", 20, 215);
    ctx.fillText("R — заново", 20, 245);

    if (jake.cooldown > 0 && !jake.active) {
        ctx.fillText("Джейк: " + Math.ceil(jake.cooldown / 60) + " сек.", 500, 125);
    }

    if (jake.active) {
        ctx.fillText("Джейк рядом!", 500, 125);
    }

    if (hero.immortalTimer > 0) {
        let seconds = Math.ceil(hero.immortalTimer / 60);
        ctx.fillStyle = "#d00000";
        ctx.fillText("Бессмертие: " + seconds + " сек.", 500, 35);
    }

    if (cakeReady && !cakeEaten) {
        ctx.fillStyle = "#7b2cbf";
        ctx.fillText("Торт готов! Нажми C", 500, 65);
    }

    if (portal.opened) {
        ctx.fillStyle = "#6a00f4";
        ctx.fillText("Портал открыт! Просто зайди в него", 400, 95);
    }

    if (score < 3 && distanceBetween(hero, monster) < 90) {
        ctx.fillStyle = "#222";
        ctx.fillText("Сначала собери кристаллы!", 270, 35);
    }

    if (gameOver) {
        ctx.font = "36px Arial";
        ctx.fillText("Герой устал и упал!", 230, 240);
        ctx.font = "24px Arial";
        ctx.fillText("Нажми R, чтобы начать заново", 230, 280);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld();
    drawCrystals();
    drawIngredients();
    drawKey();
    drawNpc();

    if (!portalEnding) {
        drawHero();
        drawJake();
    }

    drawMonster();
    drawPortal();
    drawText();
    drawDialog();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
function bindButton(id, key) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keys[key] = true;
    });

    btn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keys[key] = false;
    });

    btn.addEventListener("mousedown", () => {
        keys[key] = true;
    });

    btn.addEventListener("mouseup", () => {
        keys[key] = false;
    });
}

bindButton("up", "ArrowUp");
bindButton("down", "ArrowDown");
bindButton("left", "ArrowLeft");
bindButton("right", "ArrowRight");

document.getElementById("attack").addEventListener("touchstart", () => attackMonster());
document.getElementById("action").addEventListener("touchstart", () => handleAction());
document.getElementById("cake").addEventListener("touchstart", () => eatCake());
document.getElementById("jake").addEventListener("touchstart", () => summonJake());
restartGame();
gameLoop();
