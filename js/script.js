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
    const colors = document.getElementById("color").children;
    const jsPunsColors = ["cornflowerblue", "darkslategrey", "gold"];
    const heartJSColors = ["tomato", "steelblue", "dimgrey"];

    if (designSelect.value === "select-theme") {
        showColors(colors, colors);

        document.getElementById("color-error").style = "block";

    } else {
        if (designSelect.value === "js puns") {
            showColors(colors, jsPunsColors);
        }else if (designSelect.value === "heart js") {
            showColors(colors, heartJSColors);
        }
    }
}

function showColors(colors, themeColors){
    
    outerloop:
    for (let i = 0; i < colors.length; i++) {
        let matchFound = false;

        innerloop:
        for (let j = 0; j < themeColors.length; j++) {
            if (colors[i].value === themeColors[j]) {
                colors[i].style.display = "block";
                matchFound = true;
                break innerloop;
            }
        }

        if (matchFound === false) {
            colors[i].style.display = "none";
        }

        
    }
}

showHideOtherTitle(); // hide the other job role field on page load
processThemeChange(); // hide colors on 