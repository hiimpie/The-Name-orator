const letters = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
const spinDuration = 1000;

const introText = document.querySelector(".intro-text");
const reelsContainer = document.querySelector(".reels");
const outputDiv = document.querySelector(".output");
const outputTxt = document.querySelector(".output-text");
const outputOverlay = document.querySelector(".output-overlay");
const spinButton = document.getElementById("spin-button");
const reels = document.querySelectorAll(".reel");

const sounds = [
    document.getElementById("snd1"),
    document.getElementById("snd2"),
    document.getElementById("snd3"),
    document.getElementById("snd4"),
    document.getElementById("snd5"),
    document.getElementById("snd6"),
    document.getElementById("snd7"),
];

function playSound(soundIndex) {
    if (soundIndex >= 0 && soundIndex < sounds.length) {
        sounds[soundIndex].play();
    }
}

function getRandomLetter() {
    const letterArray = letters.split(' ');
    return letterArray[Math.floor(Math.random() * letterArray.length)];
}
reelIndex = 0;

async function spinReel(reel) {
    return new Promise(resolve => {
        const span = reel.querySelector("span");
        span.style.display = "block";
        span.style.color = "rgba(255,255,255,0.2)";
        const interval = setInterval(function () {
            span.textContent = getRandomLetter();
        }, 70);

        setTimeout(() => {
            clearInterval(interval);
            resolve();
            reel.style.borderColor = "rgba(255, 97, 47, 1)";
            span.style.color = "rgba(255,255,255,1)";
                playSound(reelIndex);
                reelIndex++; // Increment the reel index
        }, spinDuration);
    });
}

async function spinAllReels() {
    introText.style.display = "none";
    reelsContainer.style.display = "flex";
    spinButton.disabled = true;
    spinButton.textContent = "Spinning...";

    for (const reel of reels) {
        await spinReel(reel);
    }

    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    const generatedName = Array.from(reels).map(reel => reel.querySelector("span").textContent.trim()).join("");
    const poop = capitalizeFirstLetter(generatedName);
    const copyButton = document.getElementById("copy-button");

    copyButton.addEventListener("click", function () {
        copyTextToClipboard(poop);
    });
    
    function copyTextToClipboard(text) {
        const tempElement = document.createElement("textarea");
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
    }

    setTimeout(() => {
        outputOverlay.style.display = "flex";
        outputOverlay.style.background = "rgba(0, 0, 0, 0.5)";
        outputDiv.style.display = "block";
        outputDiv.style.animation="zoom 1s ease";
        outputOverlay.style.animation="fade 1s ease";
        outputTxt.textContent = `${poop}`;
        spinButton.disabled = false;
        document.getElementById("snd8").play();
    
        setTimeout(() => {
            spinButton.textContent = "Spin";
            spinButton.disabled = false;
        }, 500);
    }, 500);

}

const respinButton = document.getElementById("respin-button");

respinButton.addEventListener("click", function () {
    outputOverlay.style.display = "none"; // Hide the output overlay
    outputDiv.style.display = "none"; // Hide the output div
    spinButton.textContent = "Spinning...";
    for (const reel of reels) {
    const span = reel.querySelector("span");
    span.style.color = "rgba(255,255,255,0.2)";
    reel.style.borderColor = "rgba(255, 97, 47, 0.1)";
    reelIndex = 0;
    }
    spinAllReels();
});

// ... (inside spinAllReels function)

setTimeout(() => {
    spinButton.textContent = "Spin";
    spinButton.disabled = false;
}, 500);

let hasBeenPressed = false; // Variable to track if the button has been pressed

spinButton.addEventListener("click", function () {
    if (!hasBeenPressed) {
        hasBeenPressed = true; // Mark the button as pressed
        spinButton.style.display = "none"; // Hide the normal Spin button
    }

    if (spinButton.textContent === "Respin") {
        outputDiv.style.display = "none";
        outputOverlay.style.background = "rgba(0, 0, 0, 0.5)";
        outputOverlay.style.display = "none"; // Hide the output overlay
        reelsContainer.style.display = "flex";
        spinButton.textContent = "Spinning...";
        spinAllReels();
    } else {
        outputDiv.style.display = "none";
        outputOverlay.style.display = "none"; // Hide the output overlay
        reelsContainer.style.display = "flex";
        spinButton.textContent = "Spinning...";
        spinAllReels();
    }
});
