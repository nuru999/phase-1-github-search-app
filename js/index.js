console.log("hi")
// Function to make an api request to retrieve github users//
async function searchUsers(username) {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await response.json();
      return data.items; // Return an array of user objects
    }
  
  // Function to make an API request to get user repositories//
async function getUserRepositories(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      return data; // Return an array of user's repositories
    } 
  
  // Function to display user information on the page//
function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
  
    users.forEach((user) => {
      const listItem = document.createElement('li');
      const userLink = document.createElement('a');
      userLink.href = user.html_url;
      userLink.textContent = user.login;
  
      listItem.appendChild(userLink);
      userList.appendChild(listItem);
  
      // Add a click event listener to each user link//
      userLink.addEventListener('click', async () => {
       
          const repositories = await getUserRepositories(user.login);
          displayRepositories(repositories);
      });
    });
  }
  
  // Function to display user repositories on the page//
  function displayRepositories(repositories) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repositories.forEach((repo) => {
      const listItem = document.createElement('li');
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
  
      listItem.appendChild(repoLink);
      reposList.appendChild(listItem);
    });
  }
  
  // Event listener for the form submission//
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search');
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm !== '') {
          const users = await searchUsers(searchTerm);
          displayUsers(users);
      }
    });
  });
  This is js