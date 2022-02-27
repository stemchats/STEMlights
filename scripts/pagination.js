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

/*
    <a href="/edition/83.html">
<div class="card">
<div class="card-body">
<img src="/images/edition83/83.svg" alt="Newsletter Image">
<h2 class="card-title">Edition #83</h2>
<p class="card-text">This week, we will be discussing AI for climate change, spotlighting Mary Golda Ross, and as always, providing STEM opportunities for students.</p>
</div>
</div>
</a>

edition85
*/

function searchPage(returnedEditionsList){
    //pass info from newSearch function here (search.js)
    let arrayOfCards = [];
    for(var i = 0;i<imageAndDesc.length;i++){
        for(var j = 0;j<returnedEditionsList.length;j++){
            if(returnedEditionsList[j]==imageAndDesc[i][0]){
                const test_div = document.getElementById("test");

                const atag = document.createElement("a");
                atag.setAttribute("href", "/archive/"+imageAndDesc[i][0].substring(7)+".html");
                const card_div = document.createElement("div");
                card_div.setAttribute("class", "card");
                const card_body = document.createElement("div");
                card_body.setAttribute("class", "card-body");
                const img_element = document.createElement("img")
                img_element.setAttribute("src", imageAndDesc[i][1]["card-img"]);
                img_element.setAttribute("alt", "Newsletter Image");
                img_element.setAttribute("style", "width: 100%");
                const h2 = document.createElement("h2");
                h2.setAttribute("class", "card-title")
                h2.textContent = "Edition #" + imageAndDesc[i][0].substring(7);
                const ptag = document.createElement("p");
                ptag.setAttribute("class", "card-text");
                ptag.textContent = imageAndDesc[i][1]["desc"];

                card_body.appendChild(img_element);
                card_body.appendChild(h2);
                card_body.appendChild(ptag);

                card_div.appendChild(card_body);
                atag.appendChild(card_div);

                arrayOfCards.push(atag);
                test_div.appendChild(atag);
            }
        }//end for
    }//end for
}

// Newsletter Archive
// MODIFIES:
//  - The newsletter archive page 
// EFFECTS:
//  - Displays 4 cards (title, desc) per row, and show 3 rows initially
//  - Adds a “load more” button at the bottom, where upon being pressed add another 3 rows to the page 

function newsletterArchive(){

}