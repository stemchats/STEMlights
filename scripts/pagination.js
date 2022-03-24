// Button
// Parameters (button text, callback function)
// EFFECTS:
// - Creates a button with button text,
// and adds an event listener to this button on click to go to specified callback function with the proper parameters

function createButton(buttonText) {
  if(!document.body.contains(document.querySelector("#results"))) {
    let btn = document.createElement("button");
    btn.setAttribute("id", "results");
    btn.setAttribute("class", "btn btn-light");
    btn.innerHTML = buttonText;
    btn.addEventListener("click", (e) => {
      pagination(searchCardsIncrement, searchColumnSpecification);
      e.preventDefault();
    });
    loadButton.appendChild(btn);
  }
}

// Parameters ([title, desc, image path])
// EFFECTS:
// Creates the card based on specifications, then returns this card in HTML

function createCard(cardsArray) {
  // creates cards elements, and includes specific card information
  const col_div = document.createElement("div");
  col_div.setAttribute("class", "col");
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
  col_div.appendChild(a_tag);

  //add each card to a column, then we can add them to a row row-cols-x class div later on
  return col_div;
}

// Parameters (card)
// EFFECTS:
// Creates the card based on specifications, then returns this card in HTML
function addCard(card) {
  arrayOfCards.push(card);
}


function pagination(cardsPerLoad, columns) {
  // user clicks back into the search page, display up to (searchPageIncrement * cardsPerLoad) amount of cards
  if(columns == 1) {
    let amountToLoad = 0;
    if(cardsPerLoad <= arrayOfCards.length) {
      amountToLoad = cardsPerLoad;
    } else {
      amountToLoad = arrayOfCards.length;
    }
    console.log(amountToLoad);
    for (let i = 0; i < amountToLoad; i++) {
      rowDiv.appendChild(arrayOfCards[i]);
    }

  } else if(columns > 1) {
    // add the cards to the container on the page
    let columnString = columns.toString();
    let rowDiv = document.getElementById("rowDiv");
    rowDiv.setAttribute("class", "row row-cols-" + columnString);
    for (let j = 0; j < cardsPerLoad; j++) {
      rowDiv.appendChild(arrayOfCards[j]);
    }
    //test_div.appendChild(rowDiv);
  }
  // set arrayOfCards equal to a new arrayOfCards without the added cards
  arrayOfCards = arrayOfCards.splice(cardsPerLoad, arrayOfCards.length);

  // checks arrayOfCards is empty or not, if so remove see more results button
  if(arrayOfCards.length == 0) {
    loadButton.innerHTML = "";
  }
}//end of function

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

let searchPageIncrement = 1;
let searchCardsIncrement = 10;
let searchColumnSpecification = 1;

let archiveCardsIncrement = 12;
let archiveColumnSpecification = 4;

// the array of returned cards (representing editions) in  HTML format per search
let arrayOfCards = [];
let arrayOfCards2 = [];

// div where the searched editions show up
const test_div = document.getElementById("test");

// row div where searched editions are placed in
const rowDiv = document.getElementById("rowDiv");

// div where see more results button will show up
const loadButton = document.querySelector("#button");

function searchPage(returnedEditionsList) {
    rowDiv.innerHTML = "";
    loadButton.innerHTML = "";
    arrayOfCards = [];
    if(document.body.contains(document.querySelector("#results"))) {
      document.querySelector("#results").remove();
    };
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
    pagination(searchCardsIncrement, searchColumnSpecification);

    // button
    createButton("See more results");
}

// Newsletter Archive
// MODIFIES:
//  - The newsletter archive page
// EFFECTS:
//  - Displays 4 cards (title, desc) per row, and show 3 rows initially
//  - Adds a “load more” button at the bottom, where upon being pressed add another 3 rows to the page

function newsletterArchive() {
  console.log(imageAndDesc);
  rowDiv.innerHTML = "";
  loadButton.innerHTML = "";
  arrayOfCards = [];
  if(document.body.contains(document.querySelector("#results"))) {
    document.querySelector("#results").remove();
  };
  // iterates through image and description arrays

  for(let i = 0; i < imageAndDesc.length; i++) {
      // call create card function, passing in 3 parameters: edition number, image path, edition description
      let card = createCard([imageAndDesc[i][0].substring(7), imageAndDesc[i][1]["card-img"], imageAndDesc[i][1]["desc"]]);
      // add the subsequent card to arrayOfCards
      addCard(card);
  }

  // call pagination
  pagination(searchCardsIncrement, searchColumnSpecification);

  // button
  createButton("Load more");
}
