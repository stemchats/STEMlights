const FirestoreClient = require('./firestoreClient');
// import module firestoreClient's functions

// const deletion = async() => {
//   await FirestoreClient.deletion('hello/page');
//   //example path = 'data/editionsData'
// }
// deletion();

// const create = async() => {
//   await FirestoreClient.create("hello/page", {edition: 1});
// }
// create();

const read = async() => {
  await FirestoreClient.read("data/editionsData");
}
read();
