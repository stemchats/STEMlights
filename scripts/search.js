const selectSearch = document.querySelector('.search-icon');
const query = document.querySelector('.search-input');

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

//search function
function search(queryString) {
  console.log(`searched ${queryString}`);
}
