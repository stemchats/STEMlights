const createSend = async(edition) => {
        const editionRef = firebase.firestore().collection("createSend").doc("edition"+edition);
        const doc = await editionRef.get();
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          const string_of_html = doc.data().html;
          let new_element = document.createRange().createContextualFragment(string_of_html);
          editionSection.append(new_element);
          //console.log(html);
        }
}

// loads edition + create directory
const assignBanners = async(edition) => {
  await createSend(edition);
  const sectionBanners = document.querySelectorAll(".section-header-img");
  sectionBanners.forEach((banner, index) => {
    if(sections[index] != "title") {
      banner.id = sections[index];
      createDirectory(sections[index]); //add title name [banner.id] of each section to the directory
    }
  });
  addstyle(); // overwrite inline css, currently centers buttons
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
