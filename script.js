let enteredCode = "";
const correctCode = "230804";

function switchView(currentId, nextId) {
    const currentView = document.getElementById(currentId);
    const nextView = document.getElementById(nextId);

    currentView.classList.remove("active");

    setTimeout(() => {
        nextView.classList.add("active");
    }, 300);
}

function pressKey(num) {

    if (enteredCode.length >= 6) return;

    enteredCode += num;

    document
        .getElementById(`dot-${enteredCode.length - 1}`)
        .classList.add("filled");

    if (enteredCode.length === 6) {

        setTimeout(() => {

            if (enteredCode === correctCode) {
                startLoading();
            } else {
                alert("Wrong Passcode");
                clearKeys();
            }

        }, 300);
    }
}

function clearKeys() {

    enteredCode = "";

    for (let i = 0; i < 6; i++) {
        document
            .getElementById(`dot-${i}`)
            .classList.remove("filled");
    }
}

function startLoading() {

    switchView("view-passcode", "view-loading");

    let progress = 0;

    const progressBar = document.getElementById("load-progress");

    const interval = setInterval(() => {

        progress += 2;
        progressBar.style.width = progress + "%";

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {
                switchView("view-loading", "view-envelope");
            }, 500);
        }

    }, 50);
}

function openEnvelope() {
    switchView("view-envelope", "view-letter");
}

function goToCake() {
    switchView("view-letter", "view-cake");
}

function blowCandles() {

    const flames = document.querySelectorAll(".flame");

    flames.forEach(flame => {
        flame.style.display = "none";
    });

    document
        .getElementById("view-cake")
        .classList.add("dark-mode");

    document
        .getElementById("cake-instruction")
        .innerHTML = "✨ Wish Granted! ✨";

    document
        .getElementById("finish-btn")
        .classList.add("visible");

    startFireworks();
}

function goToFinalPage() {
    switchView("view-cake", "view-final");
}

/* FIREWORKS */

const canvas = document.getElementById("fw-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.random() * 4 + 1;

        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;

        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw() {

        ctx.fillStyle = `rgba(255,255,255,${this.life / 100})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFirework() {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y));
    }
}

function animateFireworks() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {

        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

function startFireworks() {

    animateFireworks();

    setInterval(() => {
        createFirework();
    }, 700);
}

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});s