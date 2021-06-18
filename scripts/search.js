const db = firebase.firestore();
const selectSearch = document.querySelector('.search-icon');
const query = document.querySelector('.search-input');

//local storage set up [initial load] [page]
myStorage = window.sessionStorage;

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

const allEditionsData = []; // will contain array of all edition data from database
const imageAndDesc = []; // will contain array of all edition image src and description text

const loadData = async() => {
    //get edition name + all sections of that edition
    let dataRef = db.collection('data');
    let allData = await dataRef.get();
    for(const doc of allData.docs) {
        allEditionsData.push([doc.id, doc.data()]);
    };

    //get edition image src and description text
    let editionRef = db.collection('editions');
    editionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        regex = /\d*/g;
        editionNum = "";
        if(doc.id.match(regex)) {
          let num = doc.id.match(regex);
          //loop through the match result to find edition number
          for(let i = 0; i < num.length; i++) {
            if(num[i] !== "") editionNum = "edition"+num[i];
          }
        }
        imageAndDesc.push([editionNum, doc.data()]);
        //NOTE: some images are used for multiple editions
      })
    });
    // console.log(imageAndDesc);
    // console.log(allEditionsData);
}

window.onload = loadData(); //load all editions data from 'data' collection first

const search = async(queryString) => {
    //remember query
    sessionStorage.setItem("query", queryString);

    let returnEditions = []; //the editions that match queryString

    //for(const doc of allEditionsData) {
    for(var j = 0;j<allEditionsData.length;j++){
        //let entries1 = Object.entries(doc); //return array of each object's key-value pairs
        let entries1 = Object.entries(allEditionsData[j]);
        let data = Object.keys(entries1[1][1]).map((key) => entries1[1][1][key]);
        for(let i = 0;i<data.length;i++){
          //console.log(j+ " | " + data[i]);
          if(data[i].includes(`${queryString}`) == true && returnEditions.includes(entries1[0][1]) === false) {
            // returnEditions.push({name: entries1[0][1], image: imageLink, desc: descLink});
            returnEditions.push(entries1[0][1]);
          }
        }
    }
    sortList(returnEditions, true);
  }
