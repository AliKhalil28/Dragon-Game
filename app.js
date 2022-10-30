let score = 0;
cross = true;

audiogo = new Audio('gameover.mp3');
audio = new Audio('music.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    // console.log("key code is" + e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animate-dino');
        setTimeout(() => {
            dino.classList.remove('animate-dino');
        }, 1700)
    }
    else if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

        dino.style.left = dinoX + 112 + "px";
    }
    else if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

        dino.style.left = dinoX - 112 + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.game-over');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dt = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    ot = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dt - ot);
    // console.log(offsetX, offsetY)
    if (offsetX < 93 && offsetY < 52) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacle-ani');
        audiogo.play();
        dinoB = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'))
        dino.style.bottom = dinoB - 200 + "px";
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

        dino.style.left = dinoX - 1200 + "px";
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000)
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';

        }, 500)
    }

}, 10)

function updateScore(score) {
    scoreCon.innerHTML = "your Score: " + score;
}