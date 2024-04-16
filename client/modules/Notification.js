const notificationList = document.querySelector("#notification-list");
class Notification {
  constructor(content) {
    this.content = content;
    this.time = 0;
    this.timeAgoElement = this.render();
    setInterval(() => {
      this.time++;
      this.update();
    }, 60000);
  }
  render() {
    const template = document.querySelector("#notification-template");
    const templateClone = template.content.cloneNode(true);
    const timeAgo = templateClone.querySelector(".notification-time");
    const contentElement = templateClone.querySelector(".notification-content");
    contentElement.textContent = this.content;
    notificationList.appendChild(templateClone);
    return timeAgo;
  }
  update() {
    this.timeAgoElement.textContent = this.time + " min ago";
  }
}
export default Notification;
