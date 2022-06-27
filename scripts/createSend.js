// loads edition + create directory
const assignBanners = async(edition) => {
  await createSend(edition);
  try {
    const dividerImages = document.querySelectorAll('[alt="sectionImage"]');
    [...dividerImages].map(image => image.classList.add("section-header-img"));
  }
  catch (e) {
    console.log("old edition")
  }
  const sectionBanners = document.querySelectorAll(".section-header-img");
  sectionBanners.forEach((banner, index) => {
    if(sections[index] != "title") {
      banner.id = sections[index];
      createDirectory(sections[index]); //add title name [banner.id] of each section to the directory
    }
  });
  addstyle(); // overwrite inline css, currently centers buttons
}

// gets raw HTML string from firebase, add to page and call getText function to load onto search database
const createSend = async(edition) => {
  const editionRef = firebase.firestore().collection("createSend").doc("edition"+edition);
  const doc = await editionRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const string_of_html = doc.data().html;
    let new_element = document.createRange().createContextualFragment(string_of_html);
    editionSection.append(new_element);
    getText(edition);
  }
}

// write fixes and additional styles to createsend link here
function addstyle() {
  const edition = document.querySelector("#edition")
  let buttons = edition.querySelectorAll(".btn");
  let parentButton = buttons.parentNode;
  // centers buttons by accessing parent element
  buttons.forEach(button => {
    button.parentNode.style.textAlign = "center";
  })
}


// get text content from page and adds to firebase
let textArray = [];
let regex = /\s+/g;
let str = '';

const getText = async(edition) => {
  let allText = editionSection.querySelectorAll("p");
  [...allText].map(p => {
    // all text through regex to remove excess spaces
    stringHTML = p.innerHTML;
    string = p.textContent;
    string = string.replace(regex, " ");
    string = string.replace(/^\s+|\s+$/g, "");
    str += string;
  });
  textArray.push(str);

  const dataRef = firebase.firestore().collection("searchData").doc("edition"+edition);
  const doc = await dataRef.get();
  if (!doc.exists) {
    dataRef.set({textArray});
    console.log("data added!")
  } else {
    console.log("data already exists!");
  }
}
