$(document).ready( function() {
    document.getElementById("button").disabled = true;
    setTimeout(displayPage, 2000);
    displayBoard();
    displayHighScore();
    setTimeout(start, 2000);
});

function displayPage() {
    document.getElementById("game").style.opacity = 1;
    document.getElementById("loading").style.opacity = 0;
}

function replay() {
    document.getElementById("button").disabled = true;
    location.reload();
}