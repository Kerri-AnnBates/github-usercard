/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
// const cardEntry = document.querySelector('.cards');
// followersArray.forEach(user => {
//   axios.get(`https://api.github.com/users/${user}`).then((response) => {
//     cardEntry.appendChild(createGitHubCard(response.data));
//   });
// });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


axios.get('https://api.github.com/users/Kerri-AnnBates').then((response) => {

  const cardEntry = document.querySelector('.cards');
  cardEntry.appendChild(createGitHubCard(response.data));
  console.log(response)
  return getFollowersData(response.data.followers_url);
})
.then(response => {
  response.data.forEach(follower => {
    useFollowersData(follower.login);
  });
})
.catch((err) => {
  console.log('The data was not found', err);
});

// Get followes url programmatically
function getFollowersData(follower_url) {
  return axios.get(follower_url).then(response => {
    return response;
  });
}

// User followers data to build cards
function useFollowersData(username) {
  axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
      const cardEntry = document.querySelector('.cards');
      cardEntry.appendChild(createGitHubCard(response.data));
    });
}

// Create github card component
function createGitHubCard(data) {
  const cardDiv = document.createElement('div'),
  infoDiv = document.createElement('div'),
  nameTitle = document.createElement('h3'),
  username = document.createElement('p'),
  location = document.createElement('p'),
  profile = document.createElement('p'),
  followers = document.createElement('p'),
  following = document.createElement('p'),
  bio = document.createElement('p'),
  userImage = document.createElement('img'),
  button = document.createElement('button'),
  moreDetails = document.createElement('Div'),
  moreParagraph = document.createElement('p'),
  cardContainer = document.createElement('div');

  // Set up classes
  cardDiv.classList.add('card-parent');
  cardContainer.classList.add('card');
  infoDiv.classList.add('card-info');
  nameTitle.classList.add('name');
  username.classList.add('username');
  moreDetails.classList.add('details');

  const githubAnchor = document.createElement('a');
  githubAnchor.href = data.html_url;
  githubAnchor.textContent = data.html_url;
  profile.textContent = `Profile: `;
  profile.appendChild(githubAnchor);
  
  // Create structure
  cardDiv.appendChild(cardContainer);
  cardDiv.appendChild(moreDetails);
  moreDetails.appendChild(moreParagraph);
  cardContainer.appendChild(userImage);
  cardContainer.appendChild(infoDiv);
  infoDiv.appendChild(nameTitle);
  infoDiv.appendChild(username);
  infoDiv.appendChild(location);
  infoDiv.appendChild(profile);
  infoDiv.appendChild(followers);
  infoDiv.appendChild(following);
  infoDiv.appendChild(bio);
  infoDiv.appendChild(button);
  

  // Set up content
  userImage.src = data.avatar_url;
  nameTitle.textContent = data.name;
  username.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  button.textContent = 'See More';
  following.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  moreParagraph.textContent = data.bio;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    moreDetails.classList.toggle('show-details');
  });

  return cardDiv;
}