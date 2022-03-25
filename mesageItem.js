class MessageItem {
    container = document.createElement("div");
    content = document.createElement("div");
    sender = document.createElement("div");
  
    constructor(content, sender) {
      this.content.innerHTML = content;
      this.sender.innerHTML = sender;
  
      this.container.appendChild(this.sender);
      this.container.appendChild(this.content);
    }
  }
  export { MessageItem };