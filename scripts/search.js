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

const allEditionsData = []; // will contain array of all editions live in database

const loadData = async() => {
    let editionsRef = db.collection('data');
    let allEditions = await editionsRef.get();
    for(const doc of allEditions.docs) {
        allEditionsData.push([doc.id, doc.data()]);
      }
}

loadData();

const search = async(queryString) => {
    //load all editions data from 'data' collection first
    // await loadData();
    let returnEditions = []; //the editions that match queryString

    //for(const doc of allEditionsData) {
    for(var j = 0;j<allEditionsData.length;j++){
        //let entries1 = Object.entries(doc); //return array of each object's key-value pairs
        let entries1 = Object.entries(allEditionsData[j]);
        let data = Object.keys(entries1[1][1]).map((key) => entries1[1][1][key]);
        for(let i = 0;i<data.length;i++){
          //console.log(j+ " | " + data[i]);
          if(data[i].includes(`${queryString}`) == true && returnEditions.includes(entries1[0][1]) === false) {
            returnEditions.push(entries1[0][1]);
          }
        }
    }
    console.log(returnEditions);
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
