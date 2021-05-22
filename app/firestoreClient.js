const Firestore = require('@google-cloud/firestore');
const path = require('path');

// Create a new client
class FirestoreClient {
  constructor() {
    this.firestore = new Firestore({
      projectId: 'stemlights-website',
      keyFilename: path.join('./ServiceAccountKey.json')
    })
  }
  // Enter new data into the document/create if doesnt exist.
  async create(path, data) {
    const docRef = this.firestore.doc(path);
    await docRef.set(data);
    console.log('Entered new data into the document');
  }

  // Update an existing document.
  async update(path, data) {
    const docRef = this.firestore.doc(path);
    await docRef.update(data);
    console.log('Updated an existing document');
  }

  // Read the document.
  async read(path) {
    const docRef = this.firestore.doc(path);
    const doc = await docRef.get();
    return doc;
  }

  // Delete the document.
  async deletion(path) {
    const docRef = this.firestore.doc(path);
    await docRef.delete();
    console.log('Deleted the document');
  }

  //get edition list
  async getEditionList(path, arr) {
    const editionRef = this.firestore.collection(path);
    let allEditions = await editionRef.get();
    for(const doc of allEditions.docs){
        arr.push(doc.id);
    }
  }

  async isSubCollection(path) {
    const docLength = this.firestore.doc.length;
    return docLength;
  }
}
module.exports = new FirestoreClient();
