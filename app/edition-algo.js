let allDivs = document.getElementsByTagName("div");
// let allPara = document.getElementsByTagName("p");
let allPara = document.querySelectorAll("p");
let allSpan = document.getElementsByTagName("span");
let sections = document.getElementsByTagName("img");
let anchors = document.querySelectorAll("a");

let regex = /\s+/g;

// get text content from page
[...allPara].map(p => {
  // get all anchor tags
  let anchor = anchors.forEach(function(node) {
    return node;
  })

  // all text filtered through regex to remove excess spaces
  stringHTML = p.innerHTML;
  string = p.textContent;
  string = string.replace(regex, " ");
  string = string.replace(/^\s+|\s+$/g, "");

  p.removeAttribute("style");
  p.removeAttribute("class");
  p.removeAttribute("lang");
  // console.log(p);

  if(anchorRegex.test(p.innerHTML)) {
    console.log(p.innerHTML.match(anchorRegex));
    // console.log(p);
  }
});

// get images
// [...sections].map(img => console.log(img.alt));
