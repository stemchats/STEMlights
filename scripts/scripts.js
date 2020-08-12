
var db = firebase.firestore()


const editionSection = document.getElementById("edition");
hide = () => {
   editionSection.innerHTML = "";
}
const collection = document.getElementsByClassName("editions");
//selects all [anchor] elements with class "editions"
// const array = [];
// array.push(...collection);
// //push collection to an arry
// array.forEach(event);
// //add eventlistener to each anchor tag (element of the array)
// function event(value, i) {
//   value.addEventListener("click", function(e) {
//     e.preventDefault();
//     createEdition(value.id);
//   });
// }

// db.collection("editions").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         //console.log(doc.id);

//         console.log(createEdition(doc.id));

//     });
// });
//
//
// //create edition will add everything/basically create the entire page
function createEdition(edition){

      db.collection("editions").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc);
              // doc.data() is never undefined for query doc snapshots
              //console.log(doc.id);
              // console.log(createEdition(doc.id));

          });
      });

     //  var main = document.getElementById('editionId');
     //
     //  var div = document.createElement("div");
     //  div.textContent = edition;
     //
     // main.appendChild(div);
}
/*

what we have:
- have 3 hardcoded options on the main page (more, less, whatever)
- on click (any of them), will redirect to new page
- on new page, will be a diff html file
- will generate the new edition (create edition) based on the document id
- (add firebase imports to the new file, yay)
-
*/
