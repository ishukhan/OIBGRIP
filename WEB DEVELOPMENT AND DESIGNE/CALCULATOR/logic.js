
//This function to dispaly deigits
function DisplayDigit(value) {
    document.getElementById('result').value += value;
}


//This function to clear display
function DisplayClear() {
    document.getElementById('result').value = "";
}


//This function Delet the digit one by one
function DeleteDigit() {
    if (document.getElementById('result').value == "") {
        document.getElementById('result').value = ""
    } else {
        let value = document.getElementById('result').value
        document.getElementById('result').value = value.toString().slice(0, -1)
    }
}

//This functuion to calcultate all the input in this calculator
function calculate() {
    if (document.getElementById('result').value == "") {
        document.getElementById('result').value = ""
    } else {
        let digit = document.getElementById('result').value
        let equal = eval(digit)
        document.getElementById('result').value = equal
    }
}
