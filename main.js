const phrases = [
  "TYPE",
  "HERO",
  "GLOW",
  "FORM",
];

const typedText = document.querySelector("#typed-text");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(typeLoop, 72);
    return;
  }

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1250);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 34);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 220);
}

typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const form = document.querySelector("#commission-form");
const status = document.querySelector("#form-status");

function setError(field, message) {
  const error = field.parentElement.querySelector(".error-message");
  error.textContent = message;
}

function validateField(field) {
  if (!field.value.trim()) {
    setError(field, "This field is required.");
    return false;
  }

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    setError(field, "Please enter a valid email.");
    return false;
  }

  setError(field, "");
  return true;
}

form.addEventListener("input", (event) => {
  if (event.target.matches("input, select, textarea")) {
    validateField(event.target);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...form.querySelectorAll("input, select, textarea")];
  const isValid = fields.every(validateField);

  if (!isValid) {
    status.textContent = "Please complete the highlighted fields.";
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`Commission inquiry - ${data.get("type")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nType: ${data.get(
      "type"
    )}\n\nBrief:\n${data.get("message")}`
  );

  status.textContent = "Inquiry ready. Opening your mail app...";
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

const canvas = document.querySelector("#neon-canvas");
const ctx = canvas.getContext("2d");
let lines = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  lines = Array.from({ length: 28 }, (_, index) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    length: 80 + Math.random() * 160,
    speed: 0.25 + Math.random() * 0.55,
    hue: [306, 184, 84, 350][index % 4],
  }));
}

function drawCanvas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.lineWidth = 1;

  lines.forEach((line) => {
    const gradient = ctx.createLinearGradient(line.x, line.y, line.x + line.length, line.y);
    gradient.addColorStop(0, `hsla(${line.hue}, 100%, 62%, 0)`);
    gradient.addColorStop(0.5, `hsla(${line.hue}, 100%, 62%, 0.42)`);
    gradient.addColorStop(1, `hsla(${line.hue}, 100%, 62%, 0)`);

    ctx.strokeStyle = gradient;
    ctx.shadowColor = `hsl(${line.hue}, 100%, 62%)`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + line.length, line.y);
    ctx.stroke();

    line.x += line.speed;
    if (line.x > window.innerWidth + line.length) {
      line.x = -line.length;
      line.y = Math.random() * window.innerHeight;
    }
  });

  requestAnimationFrame(drawCanvas);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawCanvas();
