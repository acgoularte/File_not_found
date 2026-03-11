const countdownElement = document.getElementById("countdown");
const statusElement = document.getElementById("status");
const countdownPanel = document.getElementById("countdownPanel");
const renderWrapper = document.getElementById("renderWrapper");
const pageFrame = document.getElementById("pageFrame");

const missingFilePath = "./arquivo.html";

let remainingSeconds = 10;

function setStatus(message) {
    statusElement.textContent = message;
}

function updateCountdown() {
    countdownElement.textContent = String(remainingSeconds);
}

function renderMissingFileInPage() {
    countdownPanel.classList.add("is-hidden");
    renderWrapper.classList.remove("is-hidden");
    renderWrapper.setAttribute("aria-hidden", "false");
    pageFrame.src = missingFilePath;
}

updateCountdown();

const countdownInterval = window.setInterval(() => {
    remainingSeconds -= 1;

    if (remainingSeconds <= 0) {
        countdownElement.textContent = "0";
        window.clearInterval(countdownInterval);
        setStatus("");
        renderMissingFileInPage();
        return;
    }

    updateCountdown();
}, 1000);