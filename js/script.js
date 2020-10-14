// function displays or hides the "Other Job Role" field depending on which dropdown option is clicked.
function showHideOtherTitle(){
    // gets the DOM objects for the other job role field and the select job role object
    const otherLabel = document.getElementById("other-label");
    const otherInput = document.getElementById("other-title");
    const titleSelect = document.getElementById("title");

    // if other is selected, display the other job role input field, otherwise, hide the field and label
    if (titleSelect.value === "other"){
        otherLabel.style.display = "block"; // shows label
        otherInput.style.display = "block"; // shows input
    } else {
        otherInput.value = ""; // clears any leftover data that may have been input before the hide was triggered

        otherLabel.style.display = "none"; // hides label
        otherInput.style.display = "none"; // hides input      
    }

}

function processThemeChange() {
    const designSelect = document.getElementById("design");
    const optionsToShow = document.getElementsByClassName(designSelect.value);

    if (designSelect.value !== "select-theme") {
        document.getElementById("shirt-colors").style.display = "block";
    } else {
        document.getElementById("shirt-colors").style.display = "none";
    }
    showColorOptions(optionsToShow);
}

function showColorOptions(themeColors){
    const allColors = document.getElementById("color").children;

    for (let i = 0; i < allColors.length; i++) {
        let matchFound = false;

        innerloop:
        for (let j = 0; j < themeColors.length; j++) {
            if (allColors[i].value === themeColors[j].value) {
                matchFound = true;
                allColors[i].style.display = "block";
                break innerloop;
            }
        }

        if (matchFound === false) {
            allColors[i].style.display = "none";
        }
    }

    const colorDropDown = document.getElementById("color");
    colorDropDown.value = themeColors[0].value;
}

function disableCheckBox(checkboxElement) {
    checkboxElement.disabled = true;
}

function enableCheckBox(checkboxElement) {
    checkboxElement.disabled = false;
}

function updateTotal(total) {
    const totalElement = document.getElementById("total");
    totalElement.innerHTML = `Total: $${total}`;
}

showHideOtherTitle(); // hide the other job role field on page load
processThemeChange(); // hide colors on 

const checkboxes = document.querySelectorAll("#activities input");
let total = 0;

document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";
document.getElementById("shirt-colors").style.display = "none";

document.getElementById("activities").addEventListener("change", (event) => {
    const clickedEventTime  = event.target.getAttribute("data-day-and-time");
    const clickedEventName  = event.target.getAttribute("name");
    const clickEventPrice   = Number(event.target.getAttribute("data-cost"));
    const clickEventChecked = event.target.checked;
    
    if (clickEventChecked) {
        total += clickEventPrice;
    } else {
        total -= clickEventPrice;
    }

    updateTotal(total);

    for (let i = 0; i < checkboxes.length; i++) {
        const currentCheckbox = checkboxes[i];
        const currentCheckboxTime = currentCheckbox.getAttribute("data-day-and-time");
        const currentCheckboxName = currentCheckbox.getAttribute("name");
        const currentCheckboxLabel = currentCheckbox.parentElement;

        if (currentCheckboxTime === "null" ) {
            continue;
        }

        if (clickedEventTime === currentCheckboxTime) {
            if (clickedEventName === currentCheckboxName) {
                continue;
            } else {
                if (clickEventChecked) {
                    disableCheckBox(currentCheckbox);
                    currentCheckboxLabel.style.color = "red";
                    currentCheckboxLabel.style.textDecoration = "line-through";   
                }else {
                    enableCheckBox(currentCheckbox);
                    console.log(currentCheckboxLabel);
                    currentCheckboxLabel.style.color = "black";  
                    currentCheckboxLabel.style.textDecoration = "none";   
                }
            }
        }
        
    }    
});

document.getElementById("payment").addEventListener("change", (event) => {
    const eventChangeValue = event.target.value;
    const paymentMethods = ["credit card", "paypal", "bitcoin"];

    for (let i = 0; i < paymentMethods.length; i++) {
        if (eventChangeValue === paymentMethods[i]) {
            document.getElementById(paymentMethods[i]).style.display = "block";
        } else {
            document.getElementById(paymentMethods[i]).style.display = "none";
        }
    }

});