/*<section class="#contact-form">
<form action="#">

            <input type="text" id="your-name" value=""><br>
            <input type="text" id="invalid-name" value=""><br>

            <input type="text" id="your-email" placeholder="abc@example.com" value=""><br>
            <input type="text" id="invalid-email" value=""><br>

            <textarea id="message" value = "">
            <input type="text" id="invalid-message" value=""><br>

</form>
*/

class Contact {
    constructor(yourName, yourEmail, message) {
        this.yourName = yourName;
        this.yourEmail = yourEmail;
        this.message = message;
    }

    // Function to check if input string is empty
    IsEmpty(checkString = "") {
        if (checkString.length == 0) {
            return true;
        }
        return false;
    }

    /// Function to check valid email  https://www.codespot.org/javascript-email-validation/
    /// Expression to test email condition is taken from https://www.w3resource.com/javascript/form/email-validation.php 
    ValidEmail() {

        //https://www.codespot.org/javascript-email-validation/
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.yourEmail);

    }

    // Function to find bad words in the form
    SwearCheck(userInput) {
        const swearWords = ["feldercarb", "frack", "skinjob", "vulgacarb"];
        for (let i = 0; i< swearWords.length;i++) {
            if (userInput.includes(swearWords[i]))
             {
                console.log(swearWords[i])
                return true;
            }
        }
        return false;
    }


} //end class User



/////Testing Block///////////////////////////////////////////////////////////////////////


const contactInfo = new Contact();
  /*  "vulgacarb",
    "=f//A##ani@dcx.com",
    "I am saying hello"
);*/


/* const x = contactInfo.yourName;

const y = contactInfo.SwearCheck(x);

console.log(y); */



  ////Functionality on submit//////////////////////////////////////////////////////////////////////


//// function to get values from text fields  
function getFormValues()
{
    const name = document.getElementById('your-name').value;
    contactInfo.yourName =name;

    const email = document.getElementById('your-email').value;
    contactInfo.yourEmail =email;

    const message = document.getElementById('message').value;
    contactInfo.message =message;
  
    console.log(contactInfo.ValidEmail());
}


// listening for button send
  const contactForm = document.querySelector( 'form' );

  contactForm.addEventListener('submit', (event)=> {

    event.preventDefault();

    getFormValues();

   document.location.href = `mailto:dhabib1@ualberta.ca?&subject=Message%20from%20${contactInfo.yourName}&body=${contactInfo.message}`;
   

  }
    );
