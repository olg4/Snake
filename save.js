let highScore = null;

function getValueStorage() {
    highScore = localStorage.getItem("scoreNB");
    if (highScore == null) {
        highScore = score;
        localStorage.setItem("scoreNB", highScore);
    }
    else {
        if (score > highScore) {
            document.getElementById("newScore").style.opacity = "1";
            localStorage.setItem("scoreNB", score);
        }
    }
}

function displayNewScore() {
    getValueStorage();
    document.getElementById("highScore").textContent = highScore;
}

function updateScore() {
    displayNewScore();
}