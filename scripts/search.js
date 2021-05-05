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
function search(queryString) {
  const result = [];
  console.log(`searched ${queryString}`);
  for(let i=0; i<editionsList.length; i++) {
    for(let j=0; j<sectionsList.length; j++) {
        db.collection("editions").doc("edition" + editionsList[i]).collection(sectionsList[j]).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    let entries1 = Object.entries(data); //return array of each object's key-value pairs
                    for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
                        let keyword = `${key}`; //the different key properties
                        let values = `${value}`; //the different value properties
                        if (values.includes(`${queryString}`) == true) {
                            result.push("edition" + editionsList[i]);
                        }
                    }
                    console.log(formatArray(result));
                });
                    // editionsList.push(editionNum); //get rid of "edition" at the beginning
                    // editionsList.sort((a, b) => {return a - b}) // sort editionList array into ascending numerical order
              })
        }
    }
}




// clean up array
function formatArray(arr) {
    arr.sort();
    return arr.filter((value, index) => arr.indexOf(value) === index);
}
