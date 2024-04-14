let indicator = document.getElementById("indicator");

let box1 = document.getElementById("choice-1");
let box2 = document.getElementById("choice-2");
let box3 = document.getElementById("choice-3");

let popupCont = document.getElementById("popup");
let popupText = document.getElementById("popup-msg");

let rerollBtn = document.getElementById("reroll-btn");

function genColour () {
    // Generate colour hex
    let r = Math.floor(Math.random()*256).toString(16).padStart(2,"0");
    let g = Math.floor(Math.random()*256).toString(16).padStart(2,"0");
    let b = Math.floor(Math.random()*256).toString(16).padStart(2,"0");

    // Return coloured hex
    return r+g+b;
}

function newChoice() {
    let correct = genColour();
    indicator.textContent = `#${correct}`;

    switch(Math.floor(Math.random()*3)) {
        case 0:
            box1.style.background = `#${correct}`;
            box2.style.background = `#${genColour()}`;
            box3.style.background = `#${genColour()}`;
            break;
        case 1:
            box1.style.background = `#${genColour()}`;
            box2.style.background = `#${correct}`;
            box3.style.background = `#${genColour()}`;
            break;
        case 2:
            box1.style.background = `#${genColour()}`;
            box2.style.background = `#${genColour()}`;
            box3.style.background = `#${correct}`;
            break;
    }
}

function handleClick (elem) {
    let hexColour = "#" + elem.style.background.replace(/[^0-9\ ]/g,"").split(" ").map(val => { return Number(val).toString(16).padStart(2,"0"); }).join("");
    if(indicator.textContent == hexColour) popup("Correct!", "#00ff00");
    else popup("Incorrect!", "#ff0000");
    setTimeout(() => { newChoice(); },1400)
    return;
}

let cooldown = false; // Spamming the buttons shouldn't do anything
function popup(text, color) {
    if(cooldown) return;
    cooldown = true;
    
    popupCont.style.opacity = 1; // Make popup layer visible
    popupCont.style.pointerEvents = ``; // Block pointer events

    popupText.textContent = text; // Change text on popup box
    popupText.style.color = color; // Change colour of popup text

    setTimeout(() => {
        popupCont.style.opacity = 0; // Make popup layer invisible
        setTimeout(() => {
            popupCont.style.pointerEvents = `none`; // Point events through overlay (It's still there, just invisible)
            cooldown = false; // Allow function to run again
        },200) // 200ms transition time for fading out
    },1200) // 200ms transition time + 1000ms visible time
}

// Make boxes clickable
box1.onclick = (e) => { e.preventDefault(); handleClick(box1); }
box2.onclick = (e) => { e.preventDefault(); handleClick(box2); }
box3.onclick = (e) => { e.preventDefault(); handleClick(box3); }

rerollBtn.onclick = (e) => { e.preventDefault(); newChoice(); }

document.addEventListener("DOMContentLoaded", () => { newChoice(); });