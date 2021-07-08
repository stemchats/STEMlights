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

const searchData = async() => {
  //get edition list
  await getEditionList();
  console.log("loading data collection");
  for(let i=0; i<editionsList.length; i++) {
    await FirestoreClient.deletion("data/edition"+(i+8)); // starting from edition 8
    let changes = {};
    for(let j=0; j<sectionsList.length; j++) {
        const data = await FirestoreClient.read("editions/edition"+(i+8)+"/"+sectionsList[j]+"/page");
        if(data.data() != undefined) {
          let entries1 = Object.entries(data.data()); //return array of each object's key-value pairs
          for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              let keyword = `${key}`;
              let values = "";
              if(keyword.includes("image") && value["title"] != undefined) {
                values = value["title"]; // get image title
                changes[keyword] = values;
              } else if(keyword.includes("hyperlink") && value["text"] != undefined) {
                values = value["text"]; // get hyperlink title
                changes[keyword] = values;
              } else if(!`${value}`.includes("object")) {
                values = `${value}`; // values that are not standard nested elements (e.g. buttons, images without title) are filtered out
                changes[keyword] = values;
              }
            }
        }
      }
      await FirestoreClient.create("data/edition"+(i+8), changes);
    }
    console.log("completed loading");
  }

// const observer = async() => {
//   // watches changes to editions collection, if so, reload searchData function
//   const response = await FirestoreClient.observer("editions");
//   if(typeof response == "string") {
//     // update the data
//     console.log(response);
//   }
// }
//
// observer();
searchData();
