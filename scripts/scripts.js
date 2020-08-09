
var db = firebase.firestore()





// db.collection("editions").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         //console.log(doc.id);
        
//         console.log(createEdition(doc.id));

//     });
// });

//create edition will add everything/basically create the entire page
function createEdition(edition){

    db.collection("editions").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id);
            
            console.log(createEdition(doc.id));
    
        });
    });

    var main = document.getElementById('15');

    var div = document.createElement("div");
    div.textContent = edition;

   main.appendChild(div);
    
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



