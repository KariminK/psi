class Post {
  constructor(id, author, creationDate, title, likes, description, comments) {
    this.id = id;
    this.author = author;
    this.creationDate = creationDate;
    this.title = title;
    this.likes = likes;
    this.liked = false;
    this.description = description;
    this.comments = comments;
    this.isDetailsVisible = false;
    this.elements = this.render();
  }
  render() {
    const postTemplate = document.querySelector("#post-template");
    const templateCopy = postTemplate.content.cloneNode(true);

    const authorName = templateCopy.querySelector(".post-author-name");
    const title = templateCopy.querySelector(".post-title");
    const content = templateCopy.querySelector(".post-text-content");
    const likes = templateCopy.querySelector(".like-counter");
    const comments = templateCopy.querySelector(".comment-counter");

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
    }
    this.liked = !this.liked;
    this.update();
    this.updateDetails();
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
    const postDetailsContainer = templateCopy.querySelector(
      ".post-details-container"
    );

    detAuthorName.textContent = this.author;
    detTitle.textContent = this.title;
    detContent.textContent = this.description;
    detLikes.textContent = this.likes;

    detLikeIcon.addEventListener("click", () => {
      this.like();
    });

    exitButton.addEventListener("click", () => {
      postDetailsContainer.remove();
      this.isDetailsVisible = false;
    });

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

    likeCounterDet.textContent = this.likes;
    if (this.liked) {
      likeIconDet.name = "heart";
      likeIconDet.style.setProperty("color", "var(--accent-color)");
    } else {
      likeIconDet.name = "heart-outline";
      likeIconDet.style.setProperty("color", "var(--light-text)");
    }
  }
}

export default Post;
