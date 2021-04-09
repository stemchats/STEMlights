const db = firebase.firestore()
const editionSection = document.getElementById("edition"); //section where the edition will be rendered

var editionsList = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"];

function pagination(){
  db.collection("editions")
  .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          //console.log(doc.data()); // For data inside doc
          //console.log(doc.id); // For doc name
          var doc_name = doc.id;
          //console.log(doc_name.substring(7));
          editionsList.push(doc_name.substring(7)); //get rid of "edition" at the beginning

          
          // var href_val = "/"+doc_name.substring(0, 7)+"/"+doc_name.substring(7)+".html";
          // //creating the main card div
          // var card_div = document.createElement("div").setAttribute("class", "card").setAttribute("href", href_val);
          
          // //console.log(href_val);
          // //card_div

          // //creating the card body div
          // var card_body = document.createElement("div").setAttribute("class", "card-body");
          // var header = document.createElement("h2").setAttribute("class", "card-title");
          // header.innerHTML="Edition #"+ doc_name.substring(7);
          // var desc = document.createElement("p").setAttribute("class", "card-text");
          // desc.innerHTML="Generic Description Text (for now) AND NO IMAGE YET"

          // //adding to card body
          // card_body.appendChild(header);
          // card_body.appendChild(desc);

          // //adding card body to card div
          // card_div.appendChild(card_body);

          // document.getElementById("the_cards").appendChild(card_div);

      });
      console.log("editionsList:", editionsList);
  });
  console.log("editionsList:", editionsList);
}
// end of pagination function
// pagination();

//Pagination yay!!

//Things to do:
//- make sure the button changes from passive to active
//- dynamically iterate through card list and generate cards based on returned value from button
//- dynamically create next and previous buttons

function pagination2(inputChoice){
  $('.pagination').empty();
  var pageSize = 10;

  var pageCount = Math.ceil((editionsList.length) / pageSize);

  $(".pagination").append();
// <li class="page-item disabled">
//   <a class="page-link" href="#" tabindex="-1">Previous</a>
// </li>
  for (var i = 0; i < pageCount; i++) {
  if (i == 0)
    $(".pagination").append('<li class="page-item active" aria-current = "page" ><a class="page-link" href="#">' + (i + 1) + '</a></li>');
  else
    $(".pagination").append('<li class="page-item"><a class="page-link" onclick="pagination2('+(i+1)+')" href="#">' + (i + 1) + '</a></li>');
  }
  console.log("please work");

  $(".pagination li").click(function() {
    $(".pagination li").removeClass("page-item active");
    $(".pagination li").addClass("page-item");
    $(this).removeClass("page-item");
    $(this).addClass("page-item active");
    console.log("tears");
  });

}//end function
//pagination2(1);



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

// WORKING WITH EDITIONSLIST

parsedEditions = JSON.parse(localStorage.getItem("editions"));

console.log(parsedEditions);

// for(var i=0; i<localStorage['editions'].length; i++){
//   console.log(localStorage['editions'][i]);
// }


const elements = {
    image: function() {
      const img = document.createElement("img");
      img.src = this.content.link;
      if(typeof this.content.class == "string") {
        img.classList.add(this.content.class);
      }
      if(typeof this.content.title == "string") {
         img.id = this.content.title; //set
         createDirectory(this.content.title); //add title name of each section to the directory
      }
      editionSection.appendChild(img);
    },
    hyperlink: function() {
      const link = document.createElement("a");
      link.href = this.content.link;
      link.textContent = this.content.text;
      if(typeof this.content.class == "string") {
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
      video.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      video.src = this.content.link;
      yt.appendChild(video);
      editionSection.appendChild(yt);
    }
};
// <iframe width="560" height="315" src="https://www.youtube.com/embed/U8r3oTVMtQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

function createEdition(edition){
  for(var i = 0;i<sections.length;i++){ //how many sections the edition has, iterates through sections (below)
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
              for(let j=0;j<entries2.length;j++) { //access the elements + call the apropriate function to the element
                if(keyword.includes(entries2[j][0])==true) {
                  if(entries2[j][0] == "image") { //use call method
                    elements.image.call(renderElement);
                  } else if(entries2[j][0] == "header") {
                    elements.header.call(renderElement);
                  } else if(entries2[j][0] == "hyperlink") {
                    elements.hyperlink.call(renderElement);
                  } else if(entries2[j][0] == "paragraph") {
                    elements.paragraph.call(renderElement);
                  } else if(entries2[j][0] == "button") {
                    elements.button.call(renderElement);
                  } else if(entries2[j][0] == "video") {
                    elements.video.call(renderElement);
                  }
                }
              }
            }
          });
        });
    };
  }


/*
8/13/2020

- rename each field alphanumerically for each field in each section
  - e.g (1) header, (2), image1, etc.
- add a sections array to each html file with the unique order of the sections in the given edition
  - e.g for edition15, var sections = [title, investemgations, politics, challenges, etc.]
- creating the individual functions for each element type
- using a parse function to find out which element function to call
  - e.g if we use (1) header, it should call the createHeader() function
*/

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


// loop generating editions in <i class="fas fa-angle-left"></i> Back to newsletter
var edition = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
for (var i=0; i<edition.length; i++) {
  var editionNum = document.createElement('div');
  editionNum.classList.add('card');
}
