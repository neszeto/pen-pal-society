import { getApplicationState, postLetter, setAuthor, setRecipient, setTopic } from "./dataAccess.js"

/*
letter.js---------------
-this module will need to include a dropdown menu to select author(use ternary operator to keeps selected)
-this module is reponsible for rendering the html format for the letter (user input).
-this module will need to include the html format for radio buttons to select topic
-this module will need a dropdown menu to select recipient(use ternary operator to keep selected)
-this module is responsible for the html for the 'send letter' button


CLICK EVENT
-create a click event that will identify when the send letter button is clicked
-when clicked, it will call the postLetter() on the transient state object to push it into the letter array in the api


CHANGE EVENT

*/
/*ALGORITHM
-import the getter function and create variable to set equal to the authors array
-create an export function named letter() and make a forloop that loops through the authors array
-create html for the drop down menu selection for each author (use ternary operator to keep selected)
-create user input field for letter body after the for loop
 */



export const letter = () => {
    let state = getApplicationState()
    let authors = state.authors
    let topics = state.topics
    let recipients = state.recipients

    let html = ""
    html += `<h3>Author</h3>
    <select id="authorSelect">
    <option value="">Choose author...</option>`

    for (let author of authors) {
        html += `<option id="author--${author.id}" value="${author.id}" ${author.id === state.transientState.authorId ? "selected" : ""}>${author.name}</option>`
    }

    html += `</select>`
    html += `<div class="field">
        <label class="label" for="letterBody">Letter</label>
        <textArea type="text" name="letterBody" class="input" /></textArea> 
        </div>`
    html += `<h3>Topics</h3>`

    for (let topic of topics) { 
        html += `<input type="radio" name="topics" value="${topic.id}" ${topic.id === state.transientState.topicId ? "selected" : ""}/>${topic.topic}`
    }

    html += `<h3>Recipient</h3>
    <select id="recipientSelect">
    <option value="">Choose recipient...</option>`

    for (let recipient of recipients) {
        html += `<option id="recipient--${recipient.id}" value="${recipient.id}" ${recipient.id === state.transientState.recipientId ? "selected": ""}>${recipient.name}</option>`
    }
    html+= `</select>`
    html+= `<div>
    <button class="send" id="sendLetter">Send Letter</button>
    </div>`

    return html
}

const mainContainer = document.querySelector("#container")


mainContainer.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "authorSelect") {
            setAuthor(parseInt(changeEvent.target.value))
        }
    }
)

mainContainer.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name === "topics")
        setTopic(parseInt(changeEvent.target.value))
    }
)

mainContainer.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "recipientSelect") {
            setRecipient(parseInt(changeEvent.target.value))
        }
    }
)

mainContainer.addEventListener(
    "click",
    (clickEvent) => {
        if (clickEvent.target.id === "sendLetter") {
            let state = getApplicationState()
            const body = document.querySelector("textArea[name='letterBody']").value
            const todaysDate = new Date()
            const day = todaysDate.getDate()
            const month = todaysDate.getMonth()
            const year = todaysDate.getFullYear()
            let currentDate = `${month}/${day}/${year}`

            const authorIdentifier = state.transientState.authorId
            const recipientIdentifier = state.transientState.recipientId
            const topicIdentifier = state.transientState.topicId

            const completedLetter = {
                authorId: authorIdentifier,
                recipientId: recipientIdentifier,
                topicId: topicIdentifier,
                letterBody: body,
                timeStamp: currentDate
            }
            postLetter(completedLetter)
        }
    }
)




