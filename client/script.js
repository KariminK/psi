import Post from "./modules/Post.js";
import Notification from "./modules/Notification.js";

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
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
