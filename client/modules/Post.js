import Comment from "./Comment.js";
import Notification from "./Notification.js";
class Post {
  constructor(
    id,
    author,
    creationDate,
    title,
    likes,
    description,
    currentUserLogin
  ) {
    this.id = id;
    this.author = author;
    if (creationDate === null) this.creationDate = new Date();
    else this.creationDate = new Date(creationDate);
    this.title = title;
    this.likes = likes;
    this.liked = false;
    this.description = description;
    this.comments = [];
    this.currentUserLogin = currentUserLogin;
    this.isDetailsVisible = false;
    this.elements = this.render();
    this.fetchComments();
    this.updateTime(this.elements.timeAgo);
    setInterval(() => this.updateTime(this.elements.timeAgo), 60000);
  }
  calcTimeAgo() {
    const nowMinutes = new Date().getTime();
    const creationMinuts = this.creationDate.getTime();
    const seconds = (nowMinutes - creationMinuts) / 1000;
    return Math.floor(seconds / 3600);
  }
  updateTime(timeEl) {
    timeEl.textContent = this.calcTimeAgo() + " hours ago";
  }
  render() {
    const postTemplate = document.querySelector("#post-template");
    const templateCopy = postTemplate.content.cloneNode(true);
    const authorName = templateCopy.querySelector(".post-author-name");
    const title = templateCopy.querySelector(".post-title");
    const content = templateCopy.querySelector(".post-text-content");
    const likes = templateCopy.querySelector(".like-counter");
    const comments = templateCopy.querySelector(".comment-counter");
    const timeAgo = templateCopy.querySelector(".post-add-time");
    const likeIcon = templateCopy.querySelector(".like-icon");
    likeIcon.addEventListener("click", () => {
      this.like();
    });

    const postContainer = templateCopy.querySelector(".post-container");
    postContainer.addEventListener("click", (e) => {
      if (
        e.target !== likeIcon &&
        !e.target.classList.contains("like-button-container")
      ) {
        this.renderPostDetails();
      }
    });

    authorName.textContent = this.author;
    title.textContent = this.title;
    if (this.description.length >= 370) {
      content.textContent = this.description.substring(0, 370) + "...";
    } else {
      content.textContent = this.description;
    }
    likes.textContent = this.likes;
    comments.textContent = this.comments.length;

    postList.appendChild(templateCopy);

    return {
      likes,
      comments,
      likeIcon,
      timeAgo,
    };
  }
  update() {
    this.elements.likes.textContent = this.likes;
    this.elements.comments.textContent = this.comments.length;
    if (this.liked) {
      this.elements.likeIcon.name = "heart";
      this.elements.likeIcon.style.setProperty("color", "var(--accent-color)");
    } else {
      this.elements.likeIcon.name = "heart-outline";
      this.elements.likeIcon.style.setProperty("color", "var(--light-text)");
    }
  }
  like() {
    if (this.liked) {
      this.likes--;
    } else {
      this.likes++;
      new Notification("You liked a post", "heart-circle-outline");
    }
    this.liked = !this.liked;
    this.update();
    this.updateDetails();
    fetch("http://localhost:3000/posts", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: this.id,
        likes: this.likes,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => console.log(data));
  }
  renderPostDetails() {
    this.isDetailsVisible = true;
    const postDetailsTemplate = document.querySelector(
      ".post-details-template"
    );
    const templateCopy = postDetailsTemplate.content.cloneNode(true);
    const detAuthorName = templateCopy.querySelector(".post-author-name");
    const detTitle = templateCopy.querySelector(".post-title");
    const detContent = templateCopy.querySelector(".post-text-content");
    const detLikes = templateCopy.querySelector(".like-counter");
    const detLikeIcon = templateCopy.querySelector(".like-icon");
    const exitButton = templateCopy.querySelector(".exit-button");
    const timeAgo = templateCopy.querySelector(".post-add-time");
    const postDetailsContainer = templateCopy.querySelector(
      ".post-details-container"
    );
    const commentSection = templateCopy.querySelector(".comment-section");
    const commentInput = templateCopy.querySelector("#comment");

    detAuthorName.textContent = this.author;
    detTitle.textContent = this.title;
    detContent.textContent = this.description;
    detLikes.textContent = this.likes;

    detLikeIcon.addEventListener("click", () => {
      this.like();
    });

    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addComment(this.currentUserLogin, new Date(), commentInput.value);
        this.updateDetails();
        commentInput.value = "";
        this.update();
        new Notification("You commented a post", "chatbubbles-outline");
      }
    });

    exitButton.addEventListener("click", () => {
      postDetailsContainer.remove();
      this.isDetailsVisible = false;
    });

    this.renderComments(commentSection);
    this.updateTime(timeAgo);
    document.body.appendChild(templateCopy);
  }
  updateDetails() {
    if (!this.isDetailsVisible) {
      return;
    }
    const likeIconDet = document.querySelector(
      ".post-details-container .like-icon"
    );
    const likeCounterDet = document.querySelector(
      ".post-details-container .like-counter"
    );
    const commentList = document.querySelector(".comment-section");
    commentList.innerHTML = "";
    this.renderComments(commentList);

    likeCounterDet.textContent = this.likes;
    if (this.liked) {
      likeIconDet.name = "heart";
      likeIconDet.style.setProperty("color", "var(--accent-color)");
    } else {
      likeIconDet.name = "heart-outline";
      likeIconDet.style.setProperty("color", "var(--light-text)");
    }
  }
  addComment(login, create_date, description) {
    const comment = new Comment(login, create_date, description);
    this.comments.push(comment);
  }
  async fetchComments() {
    const response = await fetch(
      `http://localhost:3000/comments?postId=${this.id}`
    );
    const data = await response.json();
    console.log(data);
    data.forEach((comment) => {
      this.comments.push(
        new Comment(comment.login, comment.create_date, comment.content)
      );
    });
    this.update();
  }
  renderComments(commentList) {
    this.comments.forEach((comment) => {
      const commentElement = comment.render();
      commentList.appendChild(commentElement);
    });
  }
  uploadToDatabase(userId) {
    fetch("http://localhost:3000/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: userId,
        create_date: "2024-01-01",
        title: this.title,
        content: this.content,
      }),
    });
  }
}

export default Post;
