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

showHideOtherTitle(); // hide the other job role field on page load
processThemeChange(); // hide colors on 