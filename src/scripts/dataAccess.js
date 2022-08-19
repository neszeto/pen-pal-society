/*dataAccess.js ------------
-this module will house all the data in application state 
-create fetch functions to get all data from api into application state 
-create a getter function for application state

-create a postLetter() function that performs a POST request to the api (this will post the users letter into letters array) -announce state change
*/

const applicationState = {
    authors:[],
    letters:[],
    recipients:[],
    topics:[], 
    
    transientState: {

    }
}

//FETCH FUNCTIONS
const API = "http://localhost:8088" 

export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (authorsData) => {
                applicationState.authors = authorsData
            }
        )
}

export const fetchLetters = () => {
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(
            (lettersData) => {
                applicationState.letters = lettersData
            }
        )
}

export const fetchRecipients = () => {
    return fetch(`${API}/recipients`)
        .then(response => response.json())
        .then(
            (recipientsData) => {
                applicationState.recipients = recipientsData
            }
        )
}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topicsData) => {
                applicationState.topics = topicsData
            }
        )
}


//GETTER FUNCTION 
export const getApplicationState = () => {
    return { ...applicationState }
}




const mainContainer = document.querySelector("#container")

//SETTER FUNCTIONS
export const setAuthor = (Id) => {
    applicationState.transientState.authorId = Id
   // mainContainer.dispatchEvent( new CustomEvent("stateChanged"))
}

export const setTopic= (Id) => {
    applicationState.transientState.topicId = Id
   // mainContainer.dispatchEvent( new CustomEvent("stateChanged"))
}

export const setRecipient = (Id) => {
    applicationState.transientState.recipientId = Id
  //  mainContainer.dispatchEvent( new CustomEvent("stateChanged"))
}



//HTTP REQUSTS


export const postLetter = (completedLetter) => {
    const fetchOptions = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedLetter) 
    }
    return fetch(`${API}/letters`, fetchOptions) 
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

