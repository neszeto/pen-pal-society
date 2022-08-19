import { fetchAuthors, fetchLetters, fetchRecipients, fetchTopics } from "./dataAccess.js"
import { penPal } from "./penPal.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchAuthors().then(
        () => fetchRecipients()
    )
    .then(
        () => fetchTopics()
    )
    .then(
        () => fetchLetters()
    )
    .then(
        () => mainContainer.innerHTML = penPal()
    )
}

render()



mainContainer.addEventListener("stateChanged", CustomEvent => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})


/*
main.js ----------------
-this module is responsible for rendering the fetch functions asynchronously and then finally the function that contains the main html (PenPal.js)
-this module also needs an event listener to re-render the above code when state has been changed


penpal.js ---------------
-this module is responsible for the overall format of the html in the main container
-it will call the functions letter() and sentLetters() within it's html format


letter.js---------------
-this module will need to include a dropdown menu to select author(use ternary operator to keeps selected)
-this module is reponsible for rendering the html format for the letter (user input).
-this module will need to include the html format for radio buttons to select topic
-this module will need a dropdown menu to select recipient(use ternary operator to keep selected)
-this module is responsible for the html for the 'send letter' button


CLICK EVENT
-create a click event that will identify when the send letter button is clicked
set variables equal to authorId, recipientId, topicId, the user input value for the body of the letter, and a timestamp
-create a letter object with the variables and invoke the function pushLetter() 



dataAccess.js ------------
-this module will house all the data in application state 
-create fetch functions to get all data from api into application state 
-create a getter function for application state

-create a postLetter() function that performs a POST request to the api (this will post the users letter into letters array) -announce state change


sentLetters.js------------
-this module is responsible for rendering the html for displaying sent letters
-use a for loop to loop through letters
-use .find to locate objects from the authors, recipients, topics and letter array that have matching ids. 
-set the found objects equal to a variable that will house the information you need from each of the found objects (name, email, topic, body etc)
-use these variables to create the html for the sent letters interpolating the information you need into the html. 









DONT NEED ---------------------------------------------


topics.js ---------------
-this module will need to include the html format for radio buttons to select topic
CLICK EVENT
-this module will need a click event listener for when a radio button is selected
-it will invoke the setter function to set the id of that topic into transient state


recipients.js -----------
-this module will need a dropdown menu to select recipient(use ternary operator to keep selected)
CHANGE EVENT
-this module will need a change even listener for when a recipient is selected
-it will invoke the setter function to set the recipient id into transient state

submit.js --------------
-this module is responsible for the html for the 'send letter' button
CLICK EVENT
-create a click event that will invoke the sendLetter()
CLICK EVENT
-create a click event that will invoke the sendLetter()

-create a sendLetter()
-this function needs to get the letter id and place it in transient state (setter function)
-this function also needs to POST the new letter body to the letters array in api (postLetter())
-it then needs to POST transient state into letters array in the api (postLetter())
*/