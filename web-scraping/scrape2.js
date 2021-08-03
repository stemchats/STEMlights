// removes html <style> tag in <head>
function removeStyles() {
    $('style').remove();
    console.log('styles removed');
} 
removeStyles();



const html = document.getElementsByTagName('html')[0];
const body = document.getElementsByTagName('body')[0];
var all = document.querySelectorAll('*');

var header = document.createElement('div')
header.setAttribute('id', 'header');
body.appendChild(header);

var edition = document.createElement('div');
edition.setAttribute('id', 'edition');
body.appendChild(edition);

function filterElements() {
    console.log(all);
    //loop through all elements
    for (var i=0; i<all.length; i++) { 
        var element = all[i];
        var tag = element.tagName.toLowerCase();

        if (['p'].indexOf(tag) > -1) { 
            removeAttributes(element);
            edition.appendChild(element); 
            if (element.childNodes) { //if p element has children (ex. span, font..etc)
                extractChildren(element);
            }
        }

        if (tag == 'img') {
            var src = element.getAttribute('src');
            removeAttributes(element);
            element.setAttribute('src', src);
            edition.appendChild(element);
        }

    }
}
filterElements();



// removes all attributes (ex. style, width, src..etc)
function removeAttributes(element) {
    // console.log('element.attributes:', element.attributes);
    for (var i = 0, atts=element.attributes, n=atts.length, arr=[]; i<n; i++) {
        arr.push(atts[i].nodeName);
    }
    arr.forEach((attr) => {
        element.removeAttribute(attr);
    });
}
removeAttributes(html);
removeAttributes(body);



// recursive function to extract text/children from the parent element
function extractChildren(parent) {
    // console.log(parent, 'has children');
    
    parent.childNodes.forEach((child) => {
        if (child.nodeType == Node.ELEMENT_NODE) {
            var tag = child.tagName.toLowerCase();

            if (['span','em','a','div'].indexOf(tag) > -1) {
                // checks for purple text span or strong tag (= 'b' tag)
                if ((tag=='span' && child.style.color == 'rgb(166, 177, 225)') || tag == 'strong') { 
                    /* var b = document.createElement('b');
                    b.innerHTML = child.innerHTML;
                    parent.appendChild(b);
                    console.log('created b tag'); */
                    renameElement(child, 'b');
                }
                
                // checks for yellow text span (= 'h4' heading)
                if (child.style.color == 'rgb(246, 217, 112)') { 
                    renameElement(child, 'h4');
                    console.log('outerHTML:', child.outerHTML);
                    console.log('innerText:', child.innerText);
                    child.outerHTML = child.innerText;
                    console.log('outerHTML:', child.outerHTML);
                }

                // checks for  'a' tags & inserts them in place in the text
                if (tag=='a') { 
                    var href = child.getAttribute('href');
                    renameElement(child, 'a');
                    removeAttributes(child);
                    child.setAttribute('href', href);
                    child.setAttribute('target', '_blank');
                    child.outerHTML = child.innerHTML;
                    console.log('a tag created', child);
                }
                
                // checks for .btn div (= 'button' tag)
                if (child.classList.contains('btn')) { 
                    renameElement(child, 'button');
                    removeAttributes(child);
                    // child.setAttribute('onclick', child 'a' tag link)
                    console.log(child.classList);
                }

                extractChildren(child);

                child.outerHTML = child.innerHTML;
            }
        }
    });
}


// replaces span tag with actual tag name (ex. b, h4..etc)
function renameElement(element, newName) {
    var newElement = document.createElement(newName);
    newElement.innerHTML = element.innerHTML;
    if (element.parentNode)
        element.parentNode.replaceChild(newElement, element);
    console.log('replace', element, 'with', newElement);
}


// remove "meet our team" and social media links at bottom
function removeTeam() {
    for (var i=0; i<8; i++) {
        edition.removeChild(edition.lastElementChild);
    }
}
removeTeam();



function replaceHead() {
    // $( "head" ).load( "/edition/index.html".head );
    document.head.innerHTML = 
    '<head>\n' +
        '<!-- Bootstrap Meta Tags -->\n' +
        '<meta charset="utf-8">\n' +
        '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n' +
        '<meta name="description"\n' +
            'content="A weekly student-run newsletter that aims to provide equitable stem education while highlighting different STEM opportunities and news, while shining light on intersections where STEM can be applied, developed, and learned.">\n' +
        '<meta name="keywords" content="stemlights, stemlight, newsletter, edition, stem, stemchast, stemchats, nonprofit, students, programs">\n\n' +
        
        '<!-- Bootstrap CSS -->\n' +
        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/css/bootstrap.min.css"\n' +
            'integrity="sha384-VCmXjywReHh4PwowAiWNagnWcLhlEJLA5buUprzK8rxFgeH0kww/aWY76TfkUoSX" crossorigin="anonymous">\n' +
        '<!-- Font Awesome -->\n' +
        '<script src="https://kit.fontawesome.com/72d227a617.js" SameSite="none Secure" crossorigin="anonymous"></script>\n' +
        '<!-- Josefin Sans Font -->\n' +
        '<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">\n\n' +
        
        '<!-- icon -->\n' +
        '<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">\n' +
        '<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">\n' +
        '<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">\n' +
        '<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">\n' +
        '<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">\n' +
        '<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">\n' +
        '<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">\n' +
        '<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">\n' +
        '<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">\n' +
        '<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png">\n' +
        '<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">\n' +
        '<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">\n' +
        '<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">\n' +
        '<link rel="manifest" href="/manifest.json">\n' +
        '<meta name="msapplication-TileColor" content="#ffffff">\n' +
        '<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">\n' +
        '<meta name="theme-color" content="#ffffff">\n' +
        
        '<!-- Website CSS -->\n' +
        '<link rel="stylesheet" type="text/css" href="/styles/styles.css" />\n' +
        '<link rel="stylesheet" type="text/css" href="/styles/media.css">\n' +
        '<link href=\'https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i\' rel=\'stylesheet\'>\n' +
        '<title>STEMlights</title>\n' +
        
        '<!-- Global site tag (gtag.js) - Google Analytics -->\n' +
        '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172907340-2"></script>\n' +
        '<script>\n' +
            'window.dataLayer = window.dataLayer || [];\n' +
            'function gtag(){dataLayer.push(arguments);}\n' +
            'gtag(\'js\', new Date());\n' +
            'gtag(\'config\', \'UA-172907340-2\');\n' +
        '</script>\n' +
        '<script\n' +
            'src="https://code.jquery.com/jquery-3.5.1.min.js"\n' +
            'integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="\n' +
            'crossorigin="anonymous"></script>\n' +
        '<!-- load header into div with id="header" -->\n' +
        '<script>\n' +
                '$(function(){\n' +
                    '$("#header").load("/insertables/header.html");\n' +
                    '$("#footer").load("/insertables/footer.html");\n' +
                '});'
        '</script>\n' +
        '<!-- Scripts -->\n' +
        '<script type="text/javascript" src="/scripts/scripts.js"></script>\n' +
    '</head>'
}
replaceHead();