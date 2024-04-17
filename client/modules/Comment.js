class Comment {
  constructor(author, date, description) {
    this.author = author;
    this.creationDate = new Date(date);
    this.description = description;
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
    const comTemplate = document.querySelector(".comment-template");
    const templateCopy = comTemplate.content.cloneNode(true);
    const author = templateCopy.querySelector(".comment-author-name");
    const addTime = templateCopy.querySelector(".comment-add-time");
    const description = templateCopy.querySelector(".comment-description");
    const container = templateCopy.querySelector(".comment-container");

    author.textContent = this.author;
    description.textContent = this.description;
    this.updateTime(addTime);
    return container;
  }
}

export default Comment;
