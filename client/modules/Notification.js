const notificationList = document.querySelector("#notification-list");
class Notification {
  constructor(content, icon) {
    this.content = content;
    this.icon = icon;
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
    const notificationIcon = templateClone.querySelector(".notification-icon");
    contentElement.textContent = this.content;
    notificationIcon.name = this.icon;
    notificationList.appendChild(templateClone);
    return timeAgo;
  }
  update() {
    this.timeAgoElement.textContent = this.time + " min ago";
  }
}
export default Notification;
