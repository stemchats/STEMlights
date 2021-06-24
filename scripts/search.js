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

stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

function remove_stopwords(str) {
  res = []
  words = str.split(' ')
  for(i=0;i<words.length;i++) {
     word_clean = words[i].split(".").join("")
     if(!stopwords.includes(word_clean)) {
         res.push(word_clean)
     }
  }
  return(res.join(' '))
}  

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

          //regex stuff
          regexExp = /[\p{L}\d\s'.]/gu;
          if(queryString.match(regexExp)){
            qList = queryString.match(regexExp);
            qString = "";
            for(let i = 0;i<qList.length;i++){
              qString+=qList[i];
            }
            if(data[i].toLowerCase().includes(`${remove_stopwords(qString.toLowerCase())}`) == true && returnEditions.includes(entries1[0][1]) === false) {
              // returnEditions.push({name: entries1[0][1], image: imageLink, desc: descLink});
              returnEditions.push(entries1[0][1]);
            }
          }
        }
    }
    sortList(returnEditions, true);
  }
