const countdownElement = document.getElementById("countdown");
const statusElement = document.getElementById("status");
const videoWrapper = document.getElementById("videoWrapper");
const videoMessageElement = document.getElementById("videoMessage");
const player = document.getElementById("player");

const initialVideoPath = "./file_example_MP4_1920_1MG.mp4";

let remainingSeconds = 10;

function setStatus(message, showOnVideo = false) {
    statusElement.textContent = message;
    videoMessageElement.textContent = showOnVideo ? message : "";
}

function formatRemainingTime(totalSeconds) {
    const safeSeconds = Math.max(0, Math.ceil(totalSeconds));
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
    const seconds = String(safeSeconds % 60).padStart(2, "0");

    return `${minutes}:${seconds}`;
}

function updateVideoRemainingTime() {
    const remainingTime = player.duration - player.currentTime;
    setStatus(`Tempo restante: ${formatRemainingTime(remainingTime)}`, true);
}

function updateCountdown() {
    countdownElement.textContent = String(remainingSeconds);
}

async function openFullscreen(target) {
    if (!document.fullscreenElement && target.requestFullscreen) {
        await target.requestFullscreen();
    }
}

async function playMainVideo() {
    setStatus("Carregando video...", true);
    videoWrapper.classList.remove("is-hidden");

    player.src = initialVideoPath;
    player.load();

    await openFullscreen(videoWrapper);

    await player.play();
    updateVideoRemainingTime();
}

player.addEventListener("loadedmetadata", updateVideoRemainingTime);
player.addEventListener("timeupdate", updateVideoRemainingTime);

updateCountdown();

const countdownInterval = window.setInterval(() => {
    remainingSeconds -= 1;

    if (remainingSeconds <= 0) {
        countdownElement.textContent = "0";
        window.clearInterval(countdownInterval);
        playMainVideo();
        return;
    }

    updateCountdown();
}, 1000);