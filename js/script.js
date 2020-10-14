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

document.getElementById("activities").addEventListener("change", (event) => {
    const clickedEventTime = event.target.getAttribute("data-day-and-time");
    const clickedEventName = event.target.getAttribute("name");
    const clickEventPrice = Number(event.target.getAttribute("data-cost"));
    const clickEventChecked = event.target.checked;
    
    if (clickEventChecked) {
        total += clickEventPrice;
    } else {
        total -= clickEventPrice;
    }

    updateTotal(total);

    for (let i = 0; i < checkboxes.length; i++) {
        const currentCheckboxTime = checkboxes[i].getAttribute("data-day-and-time");
        const currentCheckboxName = checkboxes[i].getAttribute("name");

        if (currentCheckboxTime === "null" ) {
            continue;
        }

        if (clickedEventTime === currentCheckboxTime) {
            if (clickedEventName === currentCheckboxName) {
                continue;
            } else {
                if (clickEventChecked) {
                    disableCheckBox(checkboxes[i]);
                    
                }else {
                    enableCheckBox(checkboxes[i]);
                }
            }
        }
        
    }

    
});