const editionsListLive = []; //contains the edition numbers
const editionsData = []; //contains all the sections of each edition as objects


const getEditionListLive = async () => {
      let editionsRef = db.collection('editions');
      let allEditions = await editionsRef.get();
      for(const doc of allEditions.docs) {
          editionsListLive.push(doc.id);
      }
      return loadEditions(editionsListLive);
  }

const loadEditions = async (editionsListLive) => {
  for(let i = 0; i < editionsListLive.length; i++) {
    for(let j = 0; j < sectionsList.length; j++) {
        const snapshot = await db.collection('editions').doc(editionsListLive[i]).collection(sectionsList[j]).get()
        snapshot.docs.map(doc => {
          const data = doc.data();
          let entries1 = Object.entries(data); //return array of each object's key-value pairs
          for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              let values = `${value}`; //the different value properties
              if(key.includes('paragraph')) {
                // editionsData.push({"edition": editionsListLive[i], "value": values});
                // set a new document in collection "data"
                const dataRef = db.collection("data").doc("editionsData")
                await dataRef.set({
                    edition: editionsListLive[i],
                    value: values
                });
              }
          }
        });
    }
  }
  // console.log(editionsData);
}


getEditionListLive();
