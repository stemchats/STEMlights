// Button
// Parameters (button text, callback function)
// EFFECTS:
// - Creates a button with button text, 
// and adds an event listener to this button on click to go to specified callback function with the proper parameters

function createButton(buttonText, callbackFunc){
    let btn = document.createElement("button"); 
    btn.innerHTML = buttonText;
    document.querySelector("button");
    btn.addEventListener("click", callbackFunc());
    document.body.appendChild(btn);

}

// Create card
// Parameters ([title, desc, image], page)
// EFFECTS:
// - Check if each argument contains proper field, else if is null then skip over that field
// - Create the card with specified fields and the specified classes (the row/column specifications, 
// will be using bootstrap most likely) based on page

function createCard(array, page){

}

// Pagination
// Parameters ([createcard specifications], (returned) editions list, increment, page)
// EFFECTS:
// Add the created cards to a container div with correct classes (the row/column specifications, will be using bootstrap most likely) based on page
// Increment the global index counter by the specified increment (either 10 or 12 depending on page being called from)

function pagination(cardSpecsArray, returnedEditionsList, increment, page){

}

// Search Page
// REQUIRES: 
//  - Search result (and how many editions are matched to the search query)
// MODIFIES:
//  - The search page 
//  - Adds the matched editions to the returned editions list
// EFFECTS:
//  - Displays 10 initial page results (or less), 1 card (has title, desc, image) per row
//  - Adds a “see more results” button at the bottom, where upon being pressed add another 10 results (or less) to the page

function searchPage(returnedEditionsList){
    //pass info from newSearch function here (search.js)
}

// Newsletter Archive
// MODIFIES:
//  - The newsletter archive page 
// EFFECTS:
//  - Displays 4 cards (title, desc) per row, and show 3 rows initially
//  - Adds a “load more” button at the bottom, where upon being pressed add another 3 rows to the page 

function newsletterArchive(){

}