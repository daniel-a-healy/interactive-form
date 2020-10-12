// function displays or hides the "Other Job Role" field depending on which dropdown option is clicked.
function showHideOtherTitle(){
    // gets the DOM objects for the other job role field and the select job role object
    const otherLabel = document.getElementById("other-label");
    const otherInput = document.getElementById("other-title");
    const titleSelect = document.getElementById("title");

    // if other is selected, display the other job role input field, otherwise, hide the field and label
    if (titleSelect.value === "other"){
        otherInput.style.display = "block";
        otherLabel.style.display = "block";
    }else{
        otherInput.style.display = "none";
        otherLabel.style.display = "none";
    }

}

showHideOtherTitle(); // hide the other job role field on page load