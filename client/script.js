import Post from "./modules/Post.js";

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
      post.description
    );
  });
};
fetchPosts();

const addPostButton = document.querySelector("#add-post-text");
const addPostWindow = document.querySelector("#add-post-window");
const closePostWindow = document.querySelector("#hide-post-window-button");

addPostButton.addEventListener('click', ()=>{
  addPostWindow.classList.remove("hidden");
});

closePostWindow.addEventListener('click', ()=>{
  addPostWindow.classList.add("hidden");
});