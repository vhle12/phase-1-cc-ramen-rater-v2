// index.js
function displayRamen() {
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(data => {
    const imageOfRamen = document.querySelector("#ramen-menu");
    data.forEach(ramen => {
      const img = document.createElement('img');
      img.src = `${ramen.image}`;
      img.alt = `${ramen.name}`;
      imageOfRamen.append(img);
      img.addEventListener("click", () => {
        clickHandler(ramen);
      });
    });
  })
  .catch(error => console.log('Error fetching ramen data', error));
}

function clickHandler(ramen) {
  console.log("Image clicked", ramen);
  const detailImage = document.querySelector('.detail-image');
  const nameOfRamen = document.querySelector('.name');
  const restaurantofRamen = document.querySelector('.restaurant')
  const ratingOfRamen = document.querySelector('#rating-display')
  const commentOfRamen = document.querySelector('#comment-display')

  detailImage.src = ramen.image;
  detailImage.alt = ramen.image;
  nameOfRamen.textContent = ramen.name;
  restaurantofRamen.textContent = ramen.restaurant;
  ratingOfRamen.textContent = ramen.rating
  commentOfRamen.textContent = ramen.comment
};

function handleSubmit(event) {
  event.preventDefault();

  const newName = document.querySelector('#new-name').value;
  const newRestaurant = document.querySelector('#new-restaurant').value;
  const newImage = document.querySelector('#new-image').value;
  const newRating = document.querySelector('#new-rating').value;
  const newComment = document.querySelector('#new-comment').value;

  const newRamen = {
    name: newName,
    restaurant: newRestaurant,
    image: newImage,
    rating: newRating,
    comment: newComment
  };

  fetch("http://localhost:3000/ramens", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamen)
  })
  .then(response => response.json())
  .then(data => {
    const imageOfRamen = document.querySelector("#ramen-menu");
    const img = document.createElement('img');
    img.src = `${data.image}`;
    img.alt = `${data.name}`;
    imageOfRamen.append(img);
    img.addEventListener("click", () => {
      clickHandler(data);
    });
    // Clear form after submit
    
  })
  .catch(error => console.log('Error adding new ramen', error));
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', handleSubmit);
}

const main = () => {
  displayRamen();
  addSubmitListener();
}

main();


// Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
