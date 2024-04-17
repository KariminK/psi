import Post from "./modules/Post.js";
import Notification from "./modules/Notification.js";
const USER = JSON.parse(localStorage.getItem("user"));
console.log(USER);
const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  console.log(posts);
  posts.forEach((post) => {
    new Post(
      post.id,
      post.login,
      post.create_date,
      post.title,
      post.likes,
      post.description,
      USER.login
    );
  });
};
fetchPosts();

const addPostTitleInput = document.querySelector("#create-post-title");
const addPostContentText = document.querySelector("#create-post-content");
const addPostWindow = document.querySelector("#add-post-window");
const closePostWindow = document.querySelector("#hide-post-window-button");
const addPostButton = document.querySelector("#add-post-text");
const createPostButton = document.querySelector("#add-post-button");
addPostButton.addEventListener("click", () => {
  addPostWindow.classList.remove("hidden");
});

closePostWindow.addEventListener("click", () => {
  addPostWindow.classList.add("hidden");
});

createPostButton.addEventListener("click", (e) => {
  e.preventDefault();
  const postTitle = addPostTitleInput.value;
  const postContent = addPostContentText.value;
  if (postTitle && postContent) {
    console.log(postTitle, " ", postContent);
    new Post(
      USER.id,
      USER.login,
      null,
      postTitle,
      0,
      postContent
    ).uploadToDatabase(USER.id);
    addPostContentText.value = "";
    addPostTitleInput.value = "";
    addPostWindow.classList.add("hidden");
    new Notification("You have just created a post", "happy-outline");
  }
});
