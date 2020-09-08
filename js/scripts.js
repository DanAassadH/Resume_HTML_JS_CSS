class Contact {
    constructor(yourName, yourEmail, subject, message) {
        this.yourName = yourName;
        this.yourEmail = yourEmail;
        this.subject = subject;
        this.message = message;
    }

    // Function to check if input string is empty return true if the field is empty
    IsEmpty(checkString = "") {
        let check = true;
        if (checkString.length == 0) {
            check = true;
        }
        else {
            check = false;
        }
        return check;
    }

    /* Function to check valid email 
    /// Expression to test email condition is taken from //https://www.codespot.org/javascript-email-validation/
    //   Additional resource                      https://www.w3resource.com/javascript/form/email-validation.php 
        return true if email adress is valid*/
    ValidEmail() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.yourEmail);
    }

    // Function to find bad words in the given string - return true if there are any bad words in text
    SwearCheck(userInput) {
        const swearWords = ["feldercarb", "frack", "skinjob", "vulgacarb"];
        for (let i = 0; i < swearWords.length; i++) {
            if (userInput.includes(swearWords[i])) {
                return true;
            }
        }
        return false;
    }
} //end class Contact

const contactInfo = new Contact();
const contactForm = document.querySelector('form');

// function to get values from text fields and add them to contactInfo class
function GetFormValues() {
    contactInfo.yourName = document.getElementById('yourName').value.trim();
    contactInfo.yourEmail = document.getElementById('yourEmail').value.trim();
    contactInfo.subject = document.getElementById('subject').value.trim();
    contactInfo.message = document.getElementById('message').value.trim();
}

// function to validate all text fields----- return false if there are any errors in form 
function ValidateFormValues() {
    const name = contactInfo.yourName;
    const email = contactInfo.yourEmail;
    const subject = contactInfo.subject;
    const message = contactInfo.message;
    let counter = 0;
    let errorArray = [];
    let check = true;

    if (contactInfo.IsEmpty(name)) {
        errorArray[counter] = "Please Enter Your Name";
        counter++;
    }

    if (!contactInfo.ValidEmail()) {
        errorArray[counter] = "Please Enter valid email";
        counter++;
    }

    if (contactInfo.IsEmpty(subject)) {
        errorArray[counter] = "Please Enter Subject";
        counter++;
    }

    if (contactInfo.IsEmpty(message)) {
        errorArray[counter] = "Please Enter message";
        counter++;
    }

    if (contactInfo.SwearCheck(`${name} ${email} ${subject} ${message}`)) {
        errorArray[counter] = "Please keep the text free from swear words";
        counter++;
    }

    if (counter > 0) {
        const errorList = document.querySelector('#displayError');
        errorList.textContent = "";

        for (let i = 0; i < counter; i++) {
            const newLI = document.createElement('LI');
            newLI.textContent = errorArray[i];
            errorList.appendChild(newLI);
        }
        check = false;
    }
    else {
        const errorList = document.querySelector('#displayError');
        errorList.textContent = "Thank you for contacting me!";
        check = true;
    }
    return check;
} // end ValidateFormValues


// listening for "Send email" button click
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    GetFormValues();                                     // calling function to get values of form fields
    const validationCheck = ValidateFormValues();        // apply validation checks on values

    if (validationCheck) {                              // if the validation checks dont give any error ,, open default mail client
        document.location.href = `mailto:dhabib1@ualberta.ca?&subject=${contactInfo.subject}&body=${contactInfo.message}%0D%0AMessage%20from%20${contactInfo.yourName}`;
    }
});
