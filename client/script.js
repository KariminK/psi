import Post from "./modules/Post.js";
import Notification from "./modules/Notification.js";

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

new Post(2, "lubiespac", 2137, "tytulposta", 2137, "asd a  dad asd asd asd as dad sad a asdhjahjghj d ad    asgdsad a ajh ahj ajhdgjhd ad ash a dah jdg ash dgd asgd ajdgajgas asj dasga");
new Post(2, "lubiespac", 2137, "tytulposta", 2137, "asd a  dad asd asd asd as dad sad a asdhjahjghj d ad    asgdsad a ajh ahj ajhdgjhd ad ash a dah jdg ash dgd asgd ajdgajgas asj dasga");
new Post(2, "lubiespac", 2137, "tytulposta", 2137, "asd a  dad asd asd asd as dad sad a asdhjahjghj d ad    asgdsad a ajh ahj ajhdgjhd ad ash a dah jdg ash dgd asgd ajdgajgas asj dasga");
new Post(2, "lubiespac", 2137, "tytulposta", 2137, "asd a  dad asd asd asd as dad sad a asdhjahjghj d ad    asgdsad a ajh ahj ajhdgjhd ad ash a dah jdg ash dgd asgd ajdgajgas asj dasga");
new Post(2, "lubiespac", 2137, "tytulposta", 2137, "asd a  dad asd asd asd as dad sad a asdhjahjghj d ad    asgdsad a ajh ahj ajhdgjhd ad ash a dah jdg ash dgd asgd ajdgajgas asj dasga");

