// Button
// Parameters (button text, callback function)
// EFFECTS:
// - Creates a button with button text,
// and adds an event listener to this button on click to go to specified callback function with the proper parameters

function createButton(buttonText) {
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-light");
    btn.innerHTML = buttonText;
    const seeMoreResults = document.querySelector("#button");
    btn.addEventListener("click", pagination(searchRowSpecification, searchColumnSpecification));
    document.body.appendChild(btn);
}

// Parameters ([title, desc, image path])
// EFFECTS:
// Creates the card based on specifications, then returns this card in HTML

function createCard(cardsArray) {
  // creates cards elements, and includes specific card information
  const a_tag = document.createElement("a");
  a_tag.setAttribute("href", "/archive/"+cardsArray[0]+".html");
  const card_div = document.createElement("div");
  card_div.setAttribute("class", "card");
  const card_body = document.createElement("div");
  card_body.setAttribute("class", "card-body");
  const img_element = document.createElement("img")
  img_element.setAttribute("src", cardsArray[1]);
  img_element.setAttribute("alt", "Newsletter Image");
  img_element.setAttribute("style", "width: 100%");
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "card-title")
  h2.textContent = "Edition #" + cardsArray[0];
  const p_tag = document.createElement("p");
  p_tag.setAttribute("class", "card-text");
  p_tag.textContent = cardsArray[2];

  // construct the HTML of the card
  card_body.appendChild(img_element);
  card_body.appendChild(h2);
  card_body.appendChild(p_tag);
  card_div.appendChild(card_body);
  a_tag.appendChild(card_div);
  return a_tag;
}

// Parameters (card)
// EFFECTS:
// Creates the card based on specifications, then returns this card in HTML
function addCard(card) {
  arrayOfCards.push(card);
}



function pagination(cardsPerLoad, columns) {
  // add the cards to the containr on the page
  let amountToLoad = searchIncrement * cardsPerLoad;
  for (let i = 0; i < amountToLoad; i++) {
    test_div.appendChild(arrayOfCards[i]);
  }
  // set arrayOfCards equal to a new arrayOfCards without the added cards
  arrayOfCards = arrayOfCards.splice(amountToLoad, arrayOfCards.length);


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

let searchIncrement = 1;
let searchRowSpecification = 10;
let searchColumnSpecification = "1";

// the array of returned cards (representing editions) in  HTML format per search
let arrayOfCards = [];

// div where the searched editions show up
const test_div = document.getElementById("test");

function searchPage(returnedEditionsList) {
    //pass info from newSearch function here (search.js)

    // iterates through image and description arrays
    for(let i = 0; i < imageAndDesc.length; i++) {
      // iterates through editions array that has "matched" editions
        for(let j = 0; j < returnedEditionsList.length; j++) {

          // sync the edition from "matched" editions to the corresponding image path and description for that edition
            if(returnedEditionsList[j] == imageAndDesc[i][0]) {

                // call create card function, passing in 3 parameters: edition number, image path, edition description
                let card = createCard([imageAndDesc[i][0].substring(7), imageAndDesc[i][1]["card-img"], imageAndDesc[i][1]["desc"]]);

                // add the subsequent card to arrayOfCards
                addCard(card);




            }
        }//end for
    }//end for

    // First case for pagination call: first load on search
    // Second case: user clicks on "see more results"

    // call pagination
    pagination(searchRowSpecification, searchColumnSpecification);

    // button
    createButton("See more results");
}

// Newsletter Archive
// MODIFIES:
//  - The newsletter archive page
// EFFECTS:
//  - Displays 4 cards (title, desc) per row, and show 3 rows initially
//  - Adds a “load more” button at the bottom, where upon being pressed add another 3 rows to the page

function newsletterArchive(){

}
