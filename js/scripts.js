
class Contact {
    constructor(yourName, yourEmail, subject, message) {
        this.yourName = yourName;
        this.yourEmail = yourEmail;
        this.subject = subject;
        this.message = message;
    }

    // Function to check if input string is empty
    IsEmpty(checkString = "") {
        if (checkString.length == 0) {
            return true;
        }
        return false;
    }

    /// Function to check valid email 
    /// Expression to test email condition is taken from //https://www.codespot.org/javascript-email-validation/
    //   Additional resource                      https://www.w3resource.com/javascript/form/email-validation.php 
    ValidEmail() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.yourEmail);
    }

    // Function to find bad words in the form
    SwearCheck(userInput) {
        const swearWords = ["feldercarb", "frack", "skinjob", "vulgacarb"];
        for (let i = 0; i < swearWords.length; i++) {
            if (userInput.includes(swearWords[i])) {
              //  console.log(swearWords[i])
                return true;
            }
        }
        return false;
    }

} //end class Contact

const contactInfo = new Contact();
const contactForm = document.querySelector('form');

/////Testing Block///////////////////////////////////////////////////////////////////////

/* const contactInfo = new Contact(
     "vulgacarb",
"=f//A##ani@dcx.com",
""
); */

////Functionality on submit//////////////////////////////////////////////////////////////////////

//// function to get values from text fields  
function getFormValues() {
    contactInfo.yourName = document.getElementById('your-name').value.trim();
    contactInfo.yourEmail = document.getElementById('your-email').value.trim();
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
    //  console.log(name + ':' + email + ':' + subject + ':' + message);

    if (contactInfo.IsEmpty(name)) {
        errorArray[counter] = "Please Enetr Your Name";
        counter++;
    }

    if (contactInfo.IsEmpty(subject)) {
        errorArray[counter] = "Please Enter Subject of your Email";
        counter++;
    }

    if (contactInfo.IsEmpty(message)) {
        errorArray[counter] = "Please Enetr a message";
        counter++;
    }

    if (!contactInfo.ValidEmail()) {
        errorArray[counter] = "Please Enetr a valid email";
        counter++;
    }

    if (contactInfo.SwearCheck(`${name} ${email} ${subject} ${message}`)) {
        errorArray[counter] = "Please keep the text free from swear words";
        counter++;
    }

    //  console.log(`counter: ${counter} error messages : ${errorArray}`);

    if (counter > 0) {
        const errorList = document.querySelector('#display-error');
        errorList.textContent = "";

        for (let i = 0; i < counter; i++) {
            const newLI = document.createElement('LI');
            newLI.textContent = errorArray[i];
            errorList.appendChild(newLI);
        }
        return false;
    }
    return true;
} // end ValidateFormValues


// listening for "Send email" button click

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    getFormValues();                                     // calling function to get values of form fields
    const validationCheck = ValidateFormValues();        // apply validation checks on values

    if (validationCheck) {                              // if the validation checks dont give any error ,, open default mail client
        document.location.href = `mailto:dhabib1@ualberta.ca?&subject=${contactInfo.subject}&body=${contactInfo.message}%0D%0AMessage%20from%20${contactInfo.yourName}`;
    }

}
);
