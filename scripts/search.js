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


//search function
// function search(queryString) {
//   const result = [];
//   console.log(`searched ${queryString}`);
//   for(let i=0; i<editionsList.length; i++) {
//     for(let j=0; j<sectionsList.length; j++) {
//         db.collection("editions").doc("edition" + editionsList[i]).collection(sectionsList[j]).get().then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     let entries1 = Object.entries(data); //return array of each object's key-value pairs
//                     for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
//                         let keyword = `${key}`; //the different key properties
//                         let values = `${value}`; //the different value properties
//                         if (values.includes(`${queryString}`) == true) {
//                             result.push("edition" + editionsList[i]);
//                         }
//                     }
//                     // console.log(formatArray(result));
//
//                 });
//                     return result;
//                     // editionsList.push(editionNum); //get rid of "edition" at the beginning
//                     // editionsList.sort((a, b) => {return a - b}) // sort editionList array into ascending numerical order
//               })
//         }
//     }
// }

let editionsRef = db.collection('editions').doc('edition8').collection('title');

const search = async (queryString) => {
    const editions = [];
    const returnEditions = [];
    let allEditions = await editionsRef.get();
    for(const doc of allEditions.docs){
        //console.log(doc.id, '=>', doc.data());
        // editions.push(doc.id);
        console.log(doc.data())
    }
    // editions is populated with all editions live in the database

    console.log(queryString)

    // for(let i = 0; i < editionsList.length; i++) { //iterate through each edition
    //   for(let j=0; j < sectionsList.length; j++) { //iterate through each possible subcollection in each edition
    //     let newEditions = await editionsRef.doc(editionsList[i]).collection(sectionsList[j]).get();
    //     for(const doc of newEditions.docs){
    //       const data = doc.data();
    //       let entries1 = Object.entries(data); //return array of each object's key-value pairs
    //       for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
    //           let keyword = `${key}`; //the different key properties
    //           let values = `${value}`; //the different value properties
    //           if (values.includes(`${queryString}`) == true) {
    //               returnEditions.push("edition" + editions[i]);
    //           }
    //       }
    //     }
    //   }
    // }
    // console.log(formatArray(returnEditions));
}


// clean up array
function formatArray(arr) {
    arr.sort();
    return arr.filter((value, index) => arr.indexOf(value) === index);
}
