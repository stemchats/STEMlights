
var db = firebase.firestore()


const editionSection = document.getElementById("edition");
hide = () => {
   editionSection.innerHTML = "";
}
const collection = document.getElementsByClassName("editions");




var sections = ["investemgations", "opportunities", "news"];
var fields = ["paragraph1", "paragraph2", "paragraph3"];


for(var i = 0;i<sections.length;i++){
  for(var j = 0;j<fields.length;j++){
    db.collection("editions").doc("edition15").collection(sections[i]).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data().fields[j]);
      });
    });
  }
}




db.collection("editions").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log(doc.id);
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id);
      // console.log(createEdition(doc.id));

  });
});
function createEdition(edition){

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


8/13/2020

- rename each field alphanumerically for each field in each section
  - e.g (1) header, (2), image1, etc.
- add a sections array to each html file with the unique order of the sections in the given edition
  - e.g for edition15, var sections = [title, investemgations, politics, challenges, etc.]
- creating the individual functions for each element type
- using a parse function to find out which element function to call 
  - e.g if we use (1) header, it should call the createHeader() function
*/
