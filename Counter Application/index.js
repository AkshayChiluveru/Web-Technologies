let counterElement = document.getElementById("counterValue")

function onIncrease() {
    let previous = counterElement.textContent;
    let update = parseInt(previous) + 1;
    counterElement.textContent = update
    if (update > 0) {
        counterElement.style.color = "green"
    }
    else if (update < 0 ) {
        counterElement.style.color = "red"
    }
    else {
        counterElement.style.color = "black"
    }
}

function onDecrease() {
    let previous = counterElement.textContent;
    let update = parseInt(previous) - 1;
    counterElement.textContent = update
    if (update > 0) {
        counterElement.style.color = "green"
    }
    else if (update < 0 ) {
        counterElement.style.color = "red"
    }
    else {
        counterElement.style.color = "black"
    }
}

function onReset(){
    let update = 0
    counterElement.textContent = update
    counterElement.style.color = "black"
    
}