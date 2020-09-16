const db = firebase.firestore()
const editionSection = document.getElementById("edition"); //section where the edition will be rendered


// const input = document.querySelector('#searchBar');
// input.addEventListener("click", search);

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
what we have:
- have 3 hardcoded options on the main page (more, less, whatever)
- on click (any of them), will redirect to new page
- on new page, will be a diff html file
- will generate the new edition (create edition) based on the document id
- (add firebase imports to the new file, yay)


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


// loop generating editions in newsletter page
var edition = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
for (var i=0; i<edition.length; i++) {
  var editionNum = document.createElement('div');
  editionNum.classList.add('card');
}

// var editionNum;
// //var sectionName;

// var editions_array = [];
// //var sections_array = [];

// var sections_ = ["title", "investemgations", "politics", "voices", "news", "opportunities", "challenge", "coronavirus", "spotlight"];
// function search(input){
//   var edition_= [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // update this later depending on # of completed editions (searches through them)
//   for(let j = 0; j<edition_.length;j++){

//     for(var i = 0;i<sections_.length;i++){ //how many sections the edition has, iterates through sections (below)

//       db.collection("editions").doc("edition" + edition_[j]).collection(sections_[i]).get()
//         .then(querySnapshot => {
//           querySnapshot.forEach(doc => {
//             const data = doc.data(); //retrieves all the sections as 'objects'
//             let entries1 = Object.entries(data); //return array of each object's key-value pairs
//             for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
//               let new_val = `${value}`;

//               if(new_val.includes(input.target.value)==true){
//                 //console.log(new_val);
//                 //create a card thingy ig?
//                 editionNum = edition_[j];
//                 //console.log(editionNum);
//                 //sectionName = sections[i];
//                 if(editions_array.length == 0) {
//                   editions_array.push(editionNum);
//                   console.log(editionNum);
//                 } else if(editions_array.length>0) {
//                   for (var g = 0; g < editions_array.length; g++) {
//                     console.log(editionNum);
//                     //console.log(editions_array[g]);
//                     if(editionNum != editions_array[g]) {
//                       editions_array.push(editionNum);
//                       console.log(editionNum);
//                     }

//                   }
//                 }



//               }
//             }
//           });
//         });
//     };
//   }
//   }


//   for(var i = 0;i<editions_array.length;i++){
//     console.log(editions_array[i]);
//   }

//   console.log(editions_array);

//   // console.log(searchbar);

//   // searchbar.addEventListener("search", search(this.value))
