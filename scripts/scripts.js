const db = firebase.firestore()
const editionSection = document.getElementById("edition"); //section where the edition will be rendered

function insertionSort(arr, arr2) {
    for (let i = 1; i < arr.length; i++) {

        // Start comparing current element with every element before it
        for (let j = i - 1; j > -1; j--) {

            // Swap elements as required
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                [arr2[j + 1], arr2[j]] = [arr2[j], arr2[j + 1]];
            }
        }
    }
    return arr, arr2;
}

//const editionsList = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51"];
var editionsList = [];
var imageList = [];
const getEditionsList = async () => {
    let editionsRef = db.collection('editions');
    let allEditions = await editionsRef.get();
    for(const doc of allEditions.docs){

        editionsList.push(doc.id);
        var doc_data = doc.get('card-img');
        //console.log(doc.id, '=>', doc_data);
        imageList.push(doc_data);
    }//end for

    //substring values so only number remains
    for(var i = 0;i<editionsList.length;i++){
        editionsList[i]=editionsList[i].substring(7);
    }//end

    //cnvert values to integers
    for(var i = 0;i<editionsList.length;i++){
        editionsList[i] = parseInt(editionsList[i]);
    }//end

    //sort
    editionsList, imageList = insertionSort(editionsList, imageList);

    //convert values back to strings
    for(var i = 0;i<editionsList.length;i++){
        editionsList[i] = editionsList[i].toString();
    }//end

    //call pagination
    pagination2(1);
}//end func

// getEditionsList();
let sectionsList = ["title", "challenge", "corona", "coronavirus", "news", "opportunities", "politics", "spotlight", "qna", "investemgations", "voices", "scifi", "history", "media"]

var imageDict = {
    8: "/images/edition8/e8thumbnail.svg",
    9: "/images/edition9/coronacarehome.svg",
    10: "/images/edition10/e10thumbnail.svg",
    11: "/images/edition11/coronahome.svg",
    12: "/images/edition12/e12thumbnail.svg",
    13: "/images/edition13/coronahome.svg",
    14: "/images/edition14/pridehome.svg",
    15: "/images/edition15/conspiracieshome.svg",
    16: "/images/edition16/e16thumbnail.svg",
    17: "/images/edition17/collegehome.svg",
    18: "/images/edition18/digital_learning.svg",
    19: "/images/edition19/phone_addiction.svg",
    20: "/images/edition20/movie-scifiorfact.svg",
    21: "/images/edition21/meditation.svg",
    22: "/images/edition22/eco.svg",
    23: "/images/edition23/earth.svg",
    24: "/images/edition24/voting.svg",
    25: "/images/edition25/edition25home.svg",
    26: "/images/edition26/edition26home.svg",
    27: "/images/edition27/edition27home.svg",
    28: "/images/edition28/politics_img.svg",
    29: "/images/edition29/thumbnail_29.svg",
    30: "/images/edition30/thumbnail30.svg",
    31: "/images/edition31/thumbnail31.svg",
    32: "/images/edition32/thumbnail.svg",
    33: "/images/edition33/thumbnail33.svg",
    34: "/images/edition34/thumbnail.svg",
    35: "/images/edition35/thumbnail35.svg",
    36: "/images/edition36/newyear.svg",
    37: "/images/edition37/thumbnail_37.svg",
    38: "/images/edition38/capitol.svg",
    39: "/images/edition39/temp.svg",
    40: "/images/edition40/thumbnail40.svg",
    41: "/images/edition41/med.svg",
    42: "/images/edition42/thumbnail_42.svg",
    43: "/images/edition43/thumbnail.svg",
    44: "/images/edition44/thumbnail44.svg",
    45: "/images/edition45/thumbnail45.svg",
    46: "/images/edition46/edition46.svg",
    47: "/images/edition47/celebration.svg",
    48: "/images/edition48/thumbnail_48.svg",
};

function pagination2(inputChoice) {
    $('.pagination').empty();
    //var result = document.getElementById("the_cards")
    $('#the_cards').empty();

    var pageSize = 10;

    var pageCount = Math.ceil((editionsList.length) / pageSize);

    //test val for buttonSelect

    //I believe this work

    var buttonSelect = inputChoice; //will have the value of the clicked "page number" at the bottom of the editions newsletter page
    var returnedList;
    var returnedImageList;

    var threshold = editionsList.length - (pageSize * (buttonSelect));

    if (threshold < 0) {
        returnedList = editionsList.slice(0, editionsList.length - (pageSize * (buttonSelect - 1)));
        returnedImageList = imageList.slice(0, imageList.length - (pageSize * (buttonSelect - 1)));
    } else {//end if
        returnedList = editionsList.slice(editionsList.length - (pageSize * (buttonSelect)), editionsList.length - (pageSize * (buttonSelect - 1)));
        returnedImageList = imageList.slice(imageList.length - (pageSize * (buttonSelect)), imageList.length - (pageSize * (buttonSelect - 1)));
    }

    console.log(returnedList);

    for (var i = returnedList.length - 1; i > -1; i--) {

        var href_val = "/edition/" + returnedList[i] + ".html";
        //creating the main card div
        var card_div = document.createElement("div");
        card_div.setAttribute("class", "card");
        //card_div.setAttribute("href", href_val);
        var a_tag = document.createElement("a");
        a_tag.setAttribute("href", href_val);

        // <div onclick="location.href='newurl.html';">&nbsp;</div>

        //console.log(href_val);
        //card_div

        //creating the card body div
        var card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");
        var image = new Image();
        image.src= returnedImageList[i];
        image.setAttribute("alt", "Newsletter Image");
        var header = document.createElement("h2");
        header.setAttribute("class", "card-title");
        header.innerHTML = "Edition #" + returnedList[i];
        var desc = document.createElement("p");
        desc.setAttribute("class", "card-text");
        desc.innerHTML = "Generic Description Text (for now)"

        //adding to card body
        card_body.append(image);
        card_body.appendChild(header);
        card_body.appendChild(desc);
        //card_body.appendChild(a_tag);

        //adding card body to card div
        //card_div.appendChild(a_tag);
        card_div.appendChild(card_body);

        a_tag.appendChild(card_div);

        document.getElementById("the_cards").appendChild(a_tag);

        //This is an example of a card
        {/* <div class="card">
        <a href="/edition/47.html">
            <div class="card-body">
                <img src="/images/edition47/celebration.svg" alt="Newsletter Image">
                <h2 class="card-title">Edition #47</h2>
                <p class="card-text">This newsletter is the final installment of our Women's History Month series! We'll be diving into Daylight Savings Time, highlighting Dr. Susan La Flesche Picotte, sharing STEM opportunities, and more!</p>
            </div>
        </a>
        </div> */}

    }//end for

    //   $(".pagination").append();
    // <li class="page-item disabled">
    //   <a class="page-link" href="#" tabindex="-1">Previous</a>
    // </li>

    if(inputChoice==1){
        $(".pagination").append('<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>');
    } else if(inputChoice!=1){
        $(".pagination").append('<li class="page-item" ><a class="page-link" onclick="pagination2(' + (inputChoice-1) + ')" href="#">Previous</a></li>');
    }

    for (var i = 0; i < pageCount; i++) {
        if (i == inputChoice-1)
            $(".pagination").append('<li class="page-item active" ><a class="page-link" onclick="pagination2(' + (i + 1) + ')" href="#">' + (i + 1) + '</a></li>');
        else
            $(".pagination").append('<li class="page-item"><a class="page-link" onclick="pagination2(' + (i + 1) + ')" href="#">' + (i + 1) + '</a></li>');
    }

    if(inputChoice==pageCount){
        $(".pagination").append('<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>');
    } else if(inputChoice!=pageCount){
        $(".pagination").append('<li class="page-item" ><a class="page-link" onclick="pagination2(' + (inputChoice+1) + ')" href="#">Next</a></li>');
    }
    //console.log("please work")
}//end function
// pagination2(1);


//we use page count in the newsletter index and create pageCount many buttons

// if (n >= pageSize * (page - 1) && n < pageSize * page)
//       $(this).show();
// });


// async function printEdition(){
//   console.log('calling');
//   const result = await pagination();
//   console.log(result);
// }
// printEdition();

// console.log("editionsList:", editionsList);


//for adding each edition from createsend
//get all elements from createsend and filter them out
// var all = document.getElementsByTagName("*");
//list.filter(elem => elem.tag === 'p'  elem.tag === 'img'  ... etc)




// WORKING WITH EDITIONSLIST

parsedEditions = JSON.parse(localStorage.getItem("editions"));

console.log(parsedEditions);

// for(var i=0; i<localStorage['editions'].length; i++){
//   console.log(localStorage['editions'][i]);
// }


const elements = {
    image: function () {
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
    hyperlink: function () {
        const link = document.createElement("a");
        link.href = this.content.link;
        link.textContent = this.content.text;
        if (typeof this.content.class == "string") {
            link.classList.add(this.content.class);
        }
        editionSection.appendChild(link);
    },
    paragraph: function () {
        const p = document.createElement("p");
        p.innerHTML = this.content;
        editionSection.appendChild(p);
    },
    header: function () {
        const head = document.createElement("h4");
        head.innerHTML = this.content;
        editionSection.appendChild(head);
    },
    button: function () {
        const button = document.createElement("button");
        button.setAttribute('onclick', "window.open('" + this.content.link + "','_blank');");
        button.textContent = this.content.text;
        editionSection.appendChild(button);
    },
    video: function () {
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
// <iframe width="560" height="315" src="https://www.youtube.com/embed/U8r3oTVMtQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

function createEdition(edition) {
    for (var i = 0; i < sections.length; i++) { //how many sections the edition has, iterates through sections (below)
        db.collection("editions").doc("edition" + edition).collection(sections[i]).get()
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

function createDirectory(title) {
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

    directory.appendChild(linkText);
}


// create editions cards
var editions = document.getElementsByClassName("card");

function createEditions() {
    var desc = [];

    for (var i=editions.length-1; i>=0; i--) {
        var children = editions[i].getElementsByTagName("*");
        for (var j = 0; j < children.length; j++) {
            if (children[j].className == "card-text") {
                desc[i] = children[j].textContent;
            }
        }
        editions[i].parentNode.removeChild(editions[i]);
    }

    for (var i = editionsList.length-1; i>=0; i--) {
        var ed = document.createElement('div');
        ed.classList.add('card');
        var body = document.createElement('div');
        body.classList.add('card-body');

        var link = document.createElement('a');
        link.setAttribute('href', "/edition/"+editionsList[i]+".html");
        ed.appendChild(link);
        link.appendChild(body);

        var edName = document.createElement('h2');
        edName.textContent = "Edition #" + (editionsList[i]);
        body.appendChild(edName);

        var descTxt = document.createElement('p');
        if (desc[editionsList.length-i]) {
            descTxt.textContent = desc[editionsList.length-i-1];
        }
        body.appendChild(descTxt);

        editions = document.getElementById("editions");
        editions.appendChild(ed);
    }
}
