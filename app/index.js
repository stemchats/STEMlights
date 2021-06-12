const FirestoreClient = require('./firestoreClient');
// import module firestoreClient's functions
const editionsList = [];
let sectionsList = ["title", "challenge", "corona", "coronavirus", "news", "opportunities", "politics", "spotlight", "qna", "investemgations", "voices", "scifi", "history", "media"]

// const deletion = async() => {
//   await FirestoreClient.deletion('hello/page');
//   //example path = 'data/editionsData'
// }
// deletion();

// const create = async() => {
//   await FirestoreClient.create("hello/page", {edition: 1});
// }
// create();



const getEditionList = async() => {
  await FirestoreClient.getEditionList("editions", editionsList);
}

// create the data collection in firestore
const create = async() => {
  //get edition list
  await getEditionList();

  for(let i=0; i<editionsList.length; i++) {
    let changes = {};
    for(let j=0; j<sectionsList.length; j++) {
        const data = await FirestoreClient.read("editions/edition"+(i+8)+"/"+sectionsList[j]+"/page");
        // console.log(data.data())
        if(data.data() != undefined) {
          let entries1 = Object.entries(data.data()); //return array of each object's key-value pairs
          for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              let keyword = `${key}`; //the different key properties
              let values = `${value}`; //the different value properties
              changes[keyword] = values;
            }
        }
      }
      await FirestoreClient.create("data/edition"+(i+8), changes);
    }
  }

// create();
