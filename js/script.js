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

// hides or shows shirt colors drop down based on user selecting a theme, then calls showColorOptions to show the appropriate theme colors
function processThemeChange() {
    // gets DOM objects
    const designSelect = document.getElementById("design"); 
    const optionsToShow = document.getElementsByClassName(designSelect.value);

    // hides color drop down if no theme is selected
    if (designSelect.value !== "select-theme") {
        document.getElementById("shirt-colors").style.display = "block";
    } else {
        document.getElementById("shirt-colors").style.display = "none";
    }

    showColorOptions(optionsToShow); // calls function to filter the appropriate colors based on theme selection
}


function showColorOptions(themeColors){
    const allColors = document.getElementById("color").children; // gets all colors

    // loops thru all colors, if it matches the theme based on its class, it will display that color in the dropdown, otherwise, it will be hidden.
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

    //sets the default selection of the color drop down to the first color listed for its appropriate theme
    const colorDropDown = document.getElementById("color");
    colorDropDown.value = themeColors[0].value;
}

// disables a checkbox element passed to it
function disableCheckBox(checkboxElement) {
    checkboxElement.disabled = true;
}

// enables a checkbox element passed to it
function enableCheckBox(checkboxElement) {
    checkboxElement.disabled = false;
}

// updates the HTML element displaying the total cost of attendance to the user
function updateTotal(total) {
    const totalElement = document.getElementById("total");
    totalElement.innerHTML = `Total: $${total}`;
}

// validates all fields, styling inputs with error borders and displaying error messages where appropriate
function validateForm() {
    // collecting DOM objects
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("mail");
    const submitButton = document.getElementById("submit");
    const emailRegEx = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", "i"); // regular expression for email format matching
    const eventChangeValue = document.getElementById("payment").value;
    const errorMessages = document.querySelectorAll(".validation-err"); // all error messages are in the class "validation-err"
    

    let errorFound = false; // assumes no errors found


    //displays error is name field is blank, removes error styling if name is is not blank
    if (nameInput.value !== "") {
        errorMessages[0].style.display = "none";
        nameInput.style.border = "none";
    } else {
        errorFound = true;
        errorMessages[0].style.display = "block";  
        nameInput.style.border = "thick solid #FF0000";
    }

    // if email is blank, display blank email address error
    if (emailInput.value !== "") {
        errorMessages[1].style.display = "none";
        emailInput.style.border = "none";
    } else if (emailInput.value === "") {
        errorFound = true;
        errorMessages[1].style.display = "block";
        emailInput.style.border = "thick solid #FF0000";
    }
    
    // if email is not blank and doesn't match email 
    if (emailRegEx.test(emailInput.value) && emailInput.value !== "") {
        errorMessages[2].style.display = "none";
        emailInput.style.border = "none";
    } else if (!emailRegEx.test(emailInput.value) && emailInput.value !== "") {
        errorFound = true;
        errorMessages[2].style.display = "block";
        emailInput.style.border = "thick solid #FF0000";
    }
    

    
    // check for at least one activity selected
    const selectedCheckboxPresent = checkForSelectedCheckbox();

    // if check for checkbox fails, display error
    if (selectedCheckboxPresent){
        errorMessages[3].style.display = "none";
    } else {
        errorFound = true;
        errorMessages[3].style.display = "block";
    }

    // if payment drop down has cc selected, start credit card input validation
    if (eventChangeValue === "credit card"){
        // get cc input DOM elements
        const ccNum = document.getElementById("cc-num").value;
        const zipCode = document.getElementById("zip").value;
        const cvv = document.getElementById("cvv").value;
        const ccNumInput = document.getElementById("cc-num");
        const zipCodeInput = document.getElementById("zip");
        const cvvInput = document.getElementById("cvv"); 

        // check for valid cc number input
        if (ccNum.length >= 13 && ccNum.length <= 16 && !isNaN(Number(ccNum))) {
            document.getElementById("invalid-cc-num").style.display = "none";
            ccNumInput.style.border = "none";
        } else {
            errorFound = true;
            document.getElementById("invalid-cc-num").style.display = "block";
            ccNumInput.style.border = "thick solid #FF0000";
        }

        // check for valid zip code input
        if (zipCode.length === 5 && !isNaN(Number(zipCode))) {
            document.getElementById("invalid-zip").style.display = "none";
            zipCodeInput.style.border = "none";
        } else {
            errorFound = true;
            document.getElementById("invalid-zip").style.display = "block";
            zipCodeInput.style.border = "thick solid #FF0000";
        }

        // check for valid cvv input
        if (cvv.length === 3 && !isNaN(Number(cvv))) {
            document.getElementById("invalid-cvv").style.display = "none";
            cvvInput.style.border = "none";
        } else {
            errorFound = true;
            document.getElementById("invalid-cvv").style.display = "block";
            cvvInput.style.border = "thick solid #FF0000";
        }

        } else {
            // hide cc input validation error messages
            document.getElementById("invalid-cc-num").style.display = "none";
            document.getElementById("invalid-zip").style.display = "none";
            document.getElementById("invalid-cvv").style.display = "none";
        }

        // if any errors found, disable and restyle the submit button so it is obvious that it cannot be clicked until errors are fixed
        if (errorFound) {
            submitButton.disabled = true;
            submitButton.style.background = "#6F9DDC";
        } else {
            submitButton.disabled = false;
            submitButton.style.background = "#083f57";
        }
}


function checkForSelectedCheckbox() {
    // loops through all checkbox elements, if at least one is checked, returns true, otherwise, it returns false
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            return true;
        } 
    }
    return false;
}

function addKeyupListeners(keyupFields) {
    // loops through a list of input fields, and creates a keyup listener for each that calls the validateForm() function
    for (let i = 0; i < keyupFields.length; i++) {
        document.getElementById(keyupFields[i]).addEventListener("keyup", () => {
            validateForm();
        });
    }
}

//creates global variables for use in various functions
const checkboxes = document.querySelectorAll("#activities input");
const keyupFields = ["name", "mail", "cc-num", "zip", "cvv"];
let total = 0;


// hides certain elements on initial page load
document.getElementById("paypal").style.display = "none";
document.getElementById("bitcoin").style.display = "none";
document.getElementById("shirt-colors").style.display = "none";
document.getElementById("invalid-email-err").style.display = "none";

showHideOtherTitle(); // hide the other job role field on page load
processThemeChange(); // hide colors on 

// validates form on page load
addKeyupListeners(keyupFields); 
validateForm();

// handler when an activity checkbox is changed
document.getElementById("activities").addEventListener("change", (event) => {
    // pulls relevant clicked checkbox data
    const clickedEventTime  = event.target.getAttribute("data-day-and-time");
    const clickedEventName  = event.target.getAttribute("name");
    const clickEventPrice   = Number(event.target.getAttribute("data-cost"));
    const clickEventChecked = event.target.checked;

    validateForm();
    
    // updates the total depending on whether checkbox was selected or de-selected
    if (clickEventChecked) {
        total += clickEventPrice;
    } else {
        total -= clickEventPrice;
    }

    // updates HTML displaying total to user
    updateTotal(total);

    // loops through all checkboxes to check if there are any schedules conflicts with the selected session
    for (let i = 0; i < checkboxes.length; i++) {
        // gets schedule/name information from the current checkbox, as well as its label
        const currentCheckbox = checkboxes[i];
        const currentCheckboxTime = currentCheckbox.getAttribute("data-day-and-time");
        const currentCheckboxName = currentCheckbox.getAttribute("name");
        const currentCheckboxLabel = currentCheckbox.parentElement;

        // if no time is assigned to the checkbox element, move on to the next one
        if (currentCheckboxTime === "null" ) {
            continue;
        }

        // if the time of the current checkbox matches the time of the clicked checkbox, continue checking
        if (clickedEventTime === currentCheckboxTime) {
            // if the current checkbox is the same as the one just clicked, move on to the next one
            if (clickedEventName === currentCheckboxName) {
                continue;
            } else { // otherwise, it is a different activity at the same time (in other words, a conflicting session)

                // if we just selected an event, then the current checkbox is a conflict

                if (clickEventChecked) {
                    // disable the checkbox, and style it so it is clearly disabled
                    disableCheckBox(currentCheckbox); 
                    currentCheckboxLabel.style.color = "red";
                    currentCheckboxLabel.style.textDecoration = "line-through";   
                }else {
                    // if we are deselecting the event, then we have to reenable the conflicting session checkbox and remove the disabled styling
                    enableCheckBox(currentCheckbox);
                    console.log(currentCheckboxLabel);
                    currentCheckboxLabel.style.color = "black";  
                    currentCheckboxLabel.style.textDecoration = "none";   
                }
            }
        }
        
    }    
});

// adds a listener if the payment drop down changes.
document.getElementById("payment").addEventListener("change", (event) => {
    // gets new payment method value and defines all possible payment method values
    const eventChangeValue = event.target.value;
    const paymentMethods = ["credit card", "paypal", "bitcoin"];

    validateForm();

    // loops through each defined payment method value, if the selected value matches, display that div, hide the others
    for (let i = 0; i < paymentMethods.length; i++) {
        if (eventChangeValue === paymentMethods[i]) {
            document.getElementById(paymentMethods[i]).style.display = "block";
        } else {
            document.getElementById(paymentMethods[i]).style.display = "none";
        }
    }

});
