const editionSection = document.getElementById("edition"); //section where the edition will be rendered
let isSearched = false; //default case, no search has been done, load all editions

if (sessionStorage.getItem('initial load') == null) {
  let defaultLoad = sessionStorage.setItem('initial load', 1);
}
let isDefault;
let lastPage = sessionStorage.getItem('Page');

function checkDefault() {
  if (sessionStorage.getItem('initial load') == 1) {
    isDefault = true;
  } else if (sessionStorage.getItem('initial load') == 0) {
    isDefault = false;
  }
}
//sets the default value to true on load
checkDefault();

function removeWhiteSpace() {
  document.getElementById("space_div").style.height = "0vh";
}

function insertionSort(arr, arr2, arr3) {
  for (let i = 1; i < arr.length; i++) {

    // Start comparing current element with every element before it
    for (let j = i - 1; j > -1; j--) {

      // Swap elements as required
      if (arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        [arr2[j + 1], arr2[j]] = [arr2[j], arr2[j + 1]];
        [arr3[j + 1], arr3[j]] = [arr3[j], arr3[j + 1]];
      }
    }
  }
  return arr, arr2, arr3;
}

var editionsList = [];
var imageList = [];
var descList = [];

// sort returned edition array and calls pagination function
const sortList = async (searchedEditions, isSearched) => {

if (isSearched) {

    //adding the number of query responses
    $('#num_results').empty();
    let pResult = document.createElement('p'); //pResult = paragraph object of results
    if (searchedEditions.length == 1) {
      results = "Found 1 result for \"" + sessionStorage.getItem("query") + "\"";
    } else if (searchedEditions.length > 1) {
      results = "Found " + searchedEditions.length + " results for \"" + sessionStorage.getItem("query") + "\"";
    } else if (searchedEditions.length == 0) {
      results = "Found 0 results for \"" + sessionStorage.getItem("query") + "\"";
      // empties pagination
      $('.pagination').empty();
    }

    pResult.innerHTML = results;
    // adding styles to results
    pResult.style.fontWeight = "bold";
    pResult.style.fontStyle = "italic";

    document.getElementById("num_results").appendChild(pResult);

    editionsList = [];
    imageList = [];
    descList = [];
    // console.log(allEditions);
    // array of image src + description of the returned edition (list)
    for (let i = 0; i < searchedEditions.length; i++) {
      for (const data of imageAndDesc) {
        if (searchedEditions[i] == data[0]) {
          editionsList.push(data[0]); // edition#
          imageList.push(data[1]["card-img"]);
          descList.push(data[1].desc);
        }
      }
    }
  }

  // console.log(editionsList)
  // console.log(imageList)
  // console.log(descList)

  //substring values so only number remains
  for (var i = 0; i < editionsList.length; i++) {
    editionsList[i] = editionsList[i].substring(7);
  } //end

  //cnvert values to integers
  for (var i = 0; i < editionsList.length; i++) {
    editionsList[i] = parseInt(editionsList[i]);
  } //end

  //sort
  editionsList, imageList, descList = insertionSort(editionsList, imageList, descList);

  //convert values back to strings
  for (var i = 0; i < editionsList.length; i++) {
    editionsList[i] = editionsList[i].toString();
  }
  //call pagination
  if (!isDefault) {
    //if not default load, pass the last page visited as argument
    pagination2(lastPage);
  } else if (isDefault) {
    //if default load just load first page
    sessionStorage.setItem('initial load', 0);
    pagination2(1);
  }
}

// sortList([], false);
sortList();

let sectionsList = ["title", "challenge", "corona", "coronavirus", "news", "opportunities", "politics", "spotlight", "qna", "investemgations", "voices", "scifi", "history", "media"]

// generate 3 most recent articles [cards] on home page
async function cardDeck() {
  deckEditionsList = [];
  deckImageList = [];
  deckDescList = [];

  let editionsRef = firebase.firestore().collection('editions');
  let allEditions = await editionsRef.get();
  for (const doc of allEditions.docs) {
    deckEditionsList.push(doc.id);
    var doc_data = doc.get('card-img');
    var desc_data = doc.get('desc');
    deckImageList.push(doc_data);
    deckDescList.push(desc_data);
  }

  //substring values so only number remains
  for (var i = 0; i < deckEditionsList.length; i++) {
    deckEditionsList[i] = deckEditionsList[i].substring(7);
  } //end

  //cnvert values to integers
  for (var i = 0; i < deckEditionsList.length; i++) {
    deckEditionsList[i] = parseInt(deckEditionsList[i]);
  } //end

  //sort
  deckEditionsList, deckImageList, deckDescList = insertionSort(deckEditionsList, deckImageList, deckDescList);

  //convert values back to strings
  for (var i = 0; i < deckEditionsList.length; i++) {
    deckEditionsList[i] = deckEditionsList[i].toString();
  }

  $('.card-deck').empty();

  var pageSize = 10;
  var pageCount = Math.ceil((deckEditionsList.length) / pageSize);

  var buttonSelect = 1; //will have the value of the clicked "page number" at the bottom of the editions newsletter page
  var returnedList;
  var returnedImageList;
  var returnedDescList;

  var threshold = deckEditionsList.length - (pageSize * (buttonSelect));

  if (threshold < 0) {
    returnedList = deckEditionsList.slice(0, deckEditionsList.length - (pageSize * (buttonSelect - 1)));
    returnedImageList = deckImageList.slice(0, deckImageList.length - (pageSize * (buttonSelect - 1)));
    returnedDescList = deckDescList.slice(0, deckDescList.length - (pageSize * (buttonSelect - 1)));
  } else { //end if
    returnedList = deckEditionsList.slice(deckEditionsList.length - (pageSize * (buttonSelect)), deckEditionsList.length - (pageSize * (buttonSelect - 1)));
    returnedImageList = deckImageList.slice(deckImageList.length - (pageSize * (buttonSelect)), deckImageList.length - (pageSize * (buttonSelect - 1)));
    returnedDescList = deckDescList.slice(deckDescList.length - (pageSize * (buttonSelect)), deckDescList.length - (pageSize * (buttonSelect - 1)));
  }
  for (var i = returnedList.length - 1; i > returnedList.length - 4; i--) {

    var href_val = "/archive/" + returnedList[i] + ".html";
    //creating the main card div
    var card_div = document.createElement("div");
    card_div.setAttribute("class", "card h-100");
    // card_div.setAttribute("style", "width: 33.33%");

    var a_tag = document.createElement("a");
    a_tag.setAttribute("href", href_val);
    a_tag.setAttribute("style", "width: 33.33%");
    // a_tag.setAttribute("class", "col");

    //creating the card body div
    var card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    var image = new Image();
    image.src = returnedImageList[i];
    image.setAttribute("alt", "Newsletter Image");
    image.setAttribute("style", "width: 100%");
    var header = document.createElement("h2");
    header.setAttribute("class", "card-title");
    header.innerHTML = "Edition #" + returnedList[i];
    var desc = document.createElement("p");
    desc.setAttribute("class", "card-text");
    desc.innerHTML = returnedDescList[i];
    // card_body.setAttribute("style", "width: 33.33%");

    //adding to card body
    card_body.append(image);
    card_body.appendChild(header);
    card_body.appendChild(desc);

    //adding card body to card div
    card_div.appendChild(card_body);

    a_tag.appendChild(card_div);

    document.getElementById("card-deck").appendChild(a_tag);

  }
}



// creates edition cards + pagination
function pagination2(inputChoice) {
  //remember the page number in session storage
  sessionStorage.setItem('Page', inputChoice);
  //remember search query in search bar
  query.value = sessionStorage.getItem("query");

  $('.pagination').empty();
  $('#the_cards').empty();

  var pageSize = 10;
  var pageCount = Math.ceil((editionsList.length) / pageSize);

  var buttonSelect = inputChoice; //will have the value of the clicked "page number" at the bottom of the editions newsletter page
  var returnedList;
  var returnedImageList;
  var returnedDescList;

  var threshold = editionsList.length - (pageSize * (buttonSelect));

  if (threshold < 0) {
    returnedList = editionsList.slice(0, editionsList.length - (pageSize * (buttonSelect - 1)));
    returnedImageList = imageList.slice(0, imageList.length - (pageSize * (buttonSelect - 1)));
    returnedDescList = descList.slice(0, descList.length - (pageSize * (buttonSelect - 1)));
  } else { //end if
    returnedList = editionsList.slice(editionsList.length - (pageSize * (buttonSelect)), editionsList.length - (pageSize * (buttonSelect - 1)));
    returnedImageList = imageList.slice(imageList.length - (pageSize * (buttonSelect)), imageList.length - (pageSize * (buttonSelect - 1)));
    returnedDescList = descList.slice(descList.length - (pageSize * (buttonSelect)), descList.length - (pageSize * (buttonSelect - 1)));
  }



  // generates the cards on the newsletter page
  for (var i = returnedList.length - 1; i > -1; i--) {

    var href_val = "/archive/" + returnedList[i] + ".html";
    //creating the main card div
    var card_div = document.createElement("div");
    card_div.setAttribute("class", "card");
    var a_tag = document.createElement("a");
    a_tag.setAttribute("href", href_val);

    //creating the card body div
    var card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    var image = new Image();
    image.src = returnedImageList[i];
    image.setAttribute("alt", "Newsletter Image");
    var header = document.createElement("h2");
    header.setAttribute("class", "card-title");
    header.innerHTML = "Edition #" + returnedList[i];
    var desc = document.createElement("p");
    desc.setAttribute("class", "card-text");
    desc.innerHTML = returnedDescList[i];

    //adding to card body
    card_body.append(image);
    card_body.appendChild(header);
    card_body.appendChild(desc);

    //adding card body to card div
    card_div.appendChild(card_body);

    a_tag.appendChild(card_div);
    document.getElementById("the_cards").appendChild(a_tag);
  } //end for

  // removeWhiteSpace();

} //end function

cardDeck();

//for adding each edition from createsend
//get all elements from createsend and filter them out
// var all = document.getElementsByTagName("*");
//list.filter(elem => elem.tag === 'p'  elem.tag === 'img'  ... etc)


const elements = {
  image: function() {
    const img = document.createElement("img");
    img.src = this.content.link;
    if (typeof this.content.class == "string") {
      img.classList.add(this.content.class);
    }
    if (typeof this.content.title == "string") {
      img.id = this.content.title; //set
      createDirectory(this.content.title); //add title name of each section to the directory
    }
    editionSection.appendChild(img);
  },
  hyperlink: function() {
    const link = document.createElement("a");
    link.href = this.content.link;
    link.textContent = this.content.text;
    if (typeof this.content.class == "string") {
      link.classList.add(this.content.class);
    }
    editionSection.appendChild(link);
  },
  paragraph: function() {
    const p = document.createElement("p");
    p.innerHTML = this.content;
    editionSection.appendChild(p);
  },
  header: function() {
    const head = document.createElement("h4");
    head.innerHTML = this.content;
    editionSection.appendChild(head);
  },
  button: function() {
    const button = document.createElement("button");
    button.setAttribute('onclick', "window.open('" + this.content.link + "','_blank');");
    button.textContent = this.content.text;
    editionSection.appendChild(button);
  },
  video: function() {
    const video = document.createElement("iframe");
    const yt = document.createElement("div");
    yt.classList.add("yt-container");
    video.classList.add("responsive-iframe");
    video.setAttribute('frameborder', "0");
    video.setAttribute('allowfullscreen', "");
    video.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    video.src = this.content.link;
    yt.appendChild(video);
    editionSection.appendChild(yt);
  }
};

function createEdition(edition) {
  for (var i = 0; i < sections.length; i++) { //how many sections the edition has, iterates through sections (below)
    firebase.firestore().collection("editions").doc("edition" + edition).collection(sections[i]).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data(); //retrieves all the sections as 'objects'
          let entries1 = Object.entries(data); //return array of each object's key-value pairs
          for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
            let keyword = `${key}`; //the different key properties
            let values = `${value}`; //the different value properties
            let renderElement = new Object();
            renderElement.content = value;
            //create a new object with content property of value
            let entries2 = Object.entries(elements); //create array of the 'elements'
            for (let j = 0; j < entries2.length; j++) { //access the elements + call the apropriate function to the element
              if (keyword.includes(entries2[j][0]) == true) {
                if (entries2[j][0] == "image") { //use call method
                  elements.image.call(renderElement);
                } else if (entries2[j][0] == "header") {
                  elements.header.call(renderElement);
                } else if (entries2[j][0] == "hyperlink") {
                  elements.hyperlink.call(renderElement);
                } else if (entries2[j][0] == "paragraph") {
                  elements.paragraph.call(renderElement);
                } else if (entries2[j][0] == "button") {
                  elements.button.call(renderElement);
                } else if (entries2[j][0] == "video") {
                  elements.video.call(renderElement);
                }
              }
            }
          }
        });
      });
  };
}

// creating a dynamic directory for each edition page
var directory = document.getElementById('directory');
var count = 0;

function createDirectory(title) {
  count++;
  var linkText = document.createElement('li');
  var directoryLink = document.createElement('a');
  directoryLink.classList.add("dir-link");
  directoryLink.setAttribute('href', "#" + title);
  directoryLink.textContent = title;
  linkText.appendChild(directoryLink); //<li><a class="dir-link">SECTION TITLE</a></li>

  var after = document.createElement('span');
  after.classList.add("after");
  var afterButton = document.createElement('a');
  afterButton.setAttribute('href', "#" + title);
  afterButton.appendChild(after);
  linkText.appendChild(afterButton); //<li><a class="dir-link">SECTION TITLE</a><a><span class="after">(BUTTON)</span></a></li>

  directory.insertBefore(linkText, directory.childNodes[count + 1]);
  // directory.appendChild(linkText);
}

// creates the share button beneath directory of every edition
function createShareButton(editionNum) {
  var shareBlock = document.createElement('div');
  shareBlock.className = "share-button sharer";
  directory.appendChild(shareBlock);

  var shareButt = document.createElement('button');
  shareButt.type = "button";
  shareButt.className = "btn btn-success share-btn";
  shareButt.innerHTML = "Share";
  shareBlock.appendChild(shareButt);

  var socials = document.createElement('div');
  socials.className = "social top center networks-5";
  shareBlock.appendChild(socials);

  var facebook = document.createElement('a');
  facebook.className = "fbtn share facebook";
  facebook.href = "https://www.facebook.com/sharer/sharer.php?u=https://stemlights.stemchats.org/edition/" + editionNum.toString() + ".html";
  facebook.innerHTML = "<i class=\"fa fa-facebook\"></i>";
  socials.appendChild(facebook);

  var twitter = document.createElement('a');
  twitter.className = "fbtn share twitter";
  twitter.href = "https://twitter.com/intent/tweet?text=title&amp;url=https://stemlights.stemchats.org/edition/" + editionNum.toString() + "html&amp;via=creativedevs";
  twitter.innerHTML = "<i class=\"fa fa-twitter\"></i>";
  socials.appendChild(twitter);

  var pinterest = document.createElement('a');
  pinterest.className = "fbtn share pinterest";
  //pinterest.href = "http://pinterest.com/pin/create/button/?url=https://stemlights.stemchats.org/edition/49.html&amp;description=data&amp;media=image";
  pinterest.href = "http://pinterest.com/pin/create/link/?url=http%3A%2F%2Fstemlights.stemchats.org/edition/" + editionNum.toString() + ".html"
  pinterest.innerHTML = "<i class=\"fa fa-pinterest\"></i>";
  socials.appendChild(pinterest);

  var linkedin = document.createElement('a');
  linkedin.className = "fbtn share linkedin";
  linkedin.href = "https://www.linkedin.com/sharing/share-offsite/?url=https://stemlights.stemchats.org/edition/" + editionNum.toString() + ".html"
  //linkedin.href = "http://www.linkedin.com/shareArticle?mini=true&amp;url=https://stemlights.stemchats.org/edition/49.html&amp;title=title&amp;source=url/";
  linkedin.innerHTML = "<i class=\"fa fa-linkedin\"></i>";
  socials.appendChild(linkedin);
}

//createShareButton();

// create editions cards
var editions = document.getElementsByClassName("card");

function createEditions() {
  var desc = [];

  for (var i = editions.length - 1; i >= 0; i--) {
    var children = editions[i].getElementsByTagName("*");
    for (var j = 0; j < children.length; j++) {
      if (children[j].className == "card-text") {
        desc[i] = children[j].textContent;
      }
    }
    editions[i].parentNode.removeChild(editions[i]);
  }

  for (var i = editionsList.length - 1; i >= 0; i--) {
    var ed = document.createElement('div');
    ed.classList.add('card');
    var body = document.createElement('div');
    body.classList.add('card-body');

    var link = document.createElement('a');
    link.setAttribute('href', "/archive/" + editionsList[i] + ".html");
    ed.appendChild(link);
    link.appendChild(body);

    var edName = document.createElement('h2');
    edName.textContent = "Edition #" + (editionsList[i]);
    body.appendChild(edName);

    var descTxt = document.createElement('p');
    if (desc[editionsList.length - i]) {
      descTxt.textContent = desc[editionsList.length - i - 1];
    }
    body.appendChild(descTxt);

    editions = document.getElementById("editions");
    editions.appendChild(ed);
  }
}
