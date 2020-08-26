function search(edition){
    for(var i = 0;i<sections.length;i++){ //how many sections the edition has, iterates through sections (below)
        db.collection("editions").doc("edition" + edition).collection(sections[i]).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data = doc.data(); //retrieves all the sections as 'objects'
              
              
            });
          });
      };
    }