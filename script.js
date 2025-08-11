const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = ""; // clear completely
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if (display.value === "Error") {
        display.value = ""; // clear completely instead of slicing
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    try {
        const expression = display.value.trim();

        // Prevent invalid consecutive operators or empty input
        if (/[\+\-\*\/]{2,}/.test(expression) || expression === "") {
            throw new Error();
        }

        // Allow only numbers, operators, decimal, spaces, and parentheses
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error();
        }

        const result = Function('"use strict"; return (' + expression + ')')();

        if (isNaN(result) || !isFinite(result)) {
            throw new Error();
        } else {
            display.value = result;
        }
    } catch {
        display.value = "Error";
    }
}
