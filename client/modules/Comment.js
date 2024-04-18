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
    return Math.floor(seconds / 60);
  }
  updateTime(timeEl) {
    const minutes = this.calcTimeAgo() - 120;
    const hours = minutes > 60 ? minutes % 60 : 0;
    let time = 0;
    console.log(hours);
    if (hours) {
      if (hours > 24) {
        time = hours % 24;
        timeEl.textContent = time + " days ago";
      } else if (hours == 0) {
        timeEl.textContent = ">1 hour ago";
      } else {
        time = hours;
        timeEl.textContent = time + " hours ago";
      }
    } else {
      if (minutes <= 1) {
        timeEl.textContent = "<1 minute ago";
      } else {
        timeEl.textContent = minutes + " minutes ago";
      }
    }
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
