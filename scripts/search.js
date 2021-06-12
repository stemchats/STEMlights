const selectSearch = document.querySelector('.search-icon');
const query = document.querySelector('.search-input');

// search input text on click
selectSearch.addEventListener('click', (event) => {
  search(query.value);
})
// search input text on enter
query.addEventListener('keyup', (event) => {
  if(event.keyCode === 13) {
    search(query.value);
  }
})

const search = async (queryString) => {
    const editions = []; // will contain array of all editions live in database
      let editionsRef = db.collection('editions');
      let allEditions = await editionsRef.get();
      for(const doc of allEditions.docs){
          editions.push(doc.id);
      }
      search2(editions, queryString);
    }

const search2 = async (editionsList, queryString) => {
    const returnEditions = [];
    for(let i = 0; i < editionsList.length; i++) {
      for(let j = 0; j < sectionsList.length; j++) {
        let editionsRef = db.collection('editions').doc(editionsList[i]).collection(sectionsList[j]);
        let allEditions = await editionsRef.get();
        for(const doc of allEditions.docs){
            const data = doc.data();
            let entries1 = Object.entries(data); //return array of each object's key-value pairs
            for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
                let keyword = `${key}`; //the different key properties
                let values = `${value}`; //the different value properties
                if(values.includes(`${queryString}`) === true && returnEditions.includes(editionsList[i]) === false) {
                    returnEditions.push(editionsList[i]);
                }
            }
        }
      }
    }
    console.log(returnEditions) // returns an array of the editions which the query is found in
}


// SUPER SLOW SEARCH, NEED TO IMPLEMENT SEARCH VALIDATION AND REDUCE TIME
