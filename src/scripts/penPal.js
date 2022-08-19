import { letter } from "./letter.js"
import { sentLetters} from "./sentLetters.js"
/*
import { sentLetters } from "./sentLetters.js"
*/


/*penpal.js ---------------
-this module is responsible for the overall format of the html in the main container
-it will call the functions , letter(), topics(), recipients(), submit() and sentLetters() within it's html format
*/


export const penPal = () => {
    return `
    <section class="letterMaker">
        <h1>Pen Pal Society</h1>
           ${letter()}
    </section>
    <section class="sentLetter">
        <h1>Letters</h1>
        ${sentLetters()}
    </section>
    `
}
