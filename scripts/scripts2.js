var sections = ["title", "investemgations", "politics", "voices", "news", "opportunities", "challenge", ];
function search(input){
  var edition = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // update this later depending on # of completed editions (searches through them)
  for(var j = 0; j<edition.length;j++){
    for(var i = 0;i<sections.length;i++){ //how many sections the edition has, iterates through sections (below)
      db.collection("editions").doc("edition" + edition[j]).collection(sections[i]).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data(); //retrieves all the sections as 'objects'
            let entries1 = Object.entries(data); //return array of each object's key-value pairs
            for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              console.log(value);
              if(value.includes(input)==true){
                //create a card thingy ig?
              }
            }
          });
        });
    };
  }
  }
  search("hi");
    