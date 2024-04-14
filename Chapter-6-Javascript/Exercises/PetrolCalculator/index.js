let costPerLiter = document.getElementById("cost-liter")
let literAmount = document.getElementById("liter-amt")
let button = document.getElementById("calculate-btn")
let result = document.getElementById("cost-result");

button.onclick = (e) => {
    e.preventDefault();
    result.textContent = literAmount.value * costPerLiter.value;
}