import { getApplicationState } from "./dataAccess.js"
/*sentLetters.js------------
-this module is responsible for rendering the html for displaying sent letters
-use a for loop to loop through letters
-use .find to locate objects from the authors, recipients, topics array that have matching ids. 
-set the found objects equal to a variable that will house the information you need from each of the found objects (name, email, topic, body etc)
-use these variables to create the html for the sent letters interpolating the information you need into the html. 
*/


export const sentLetters = () => {
    let state = getApplicationState()
    let letters = state.letters
    let recipients = state.recipients
    let authors = state.authors
    let topics = state.topics

    let html = ""

    for (let letter of letters) {
        const foundAuthor = authors.find(
            (author) => {
                return letter.authorId === author.id
            }
        )
        const authorName = foundAuthor.name
        const authorEmail = foundAuthor.email 

        const foundTopic = topics.find(
            (topic) => {
                return letter.topicId === topic.id
            }
        )
        const topicOfChoice = foundTopic.topic
        
        const foundRecipient = recipients.find(
            (recipient) => {
                return letter.recipientId === recipient.id
            }
        )
        const recipientName = foundRecipient.name
        const recipientEmail = foundRecipient.email

        html += `<div class="letterBody">
        <p>Dear ${recipientName} (${recipientEmail}),</p>
        <p>${letter.letterBody}</p>
        <p>Sincerely, ${authorName} (${authorEmail})</p>
        <p>Sent on ${letter.timeStamp}</p>
        <div class="chosenTopic">
        <p>${topicOfChoice}</p>
        </div>
        </div>`
    }
    return html
}