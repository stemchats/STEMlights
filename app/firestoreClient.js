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
    console.log(doc);
  }

  // Delete the document.
  async deletion(path) {
    const docRef = this.firestore.doc(path);
    await docRef.delete();
    console.log('Deleted the document');
  }

}
module.exports = new FirestoreClient();
