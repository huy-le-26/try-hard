class Composer {
    activeConversation = null;
  
    container = document.createElement("div");
    form = document.createElement("form");
    input = document.createElement("input");
    btnEmotion = document.createElement("button");
  
    constructor() {
      this.input.type = "text";
      this.input.placeholder = "Type a message ...";
      this.btnEmotion.innerHTML = "💖";
  
      this.container.appendChild(this.form);
      this.form.appendChild(this.input);
      this.form.appendChild(this.btnEmotion);
  
      // Catching event enter press
      this.form.addEventListener("keypress", this.handleSendMessage);
      this.btnEmotion.addEventListener("click", this.handleSendEmotion);
    }
  
    setActiveConversation = (conversation) => {
      this.activeConversation = conversation;
    };
  
    handleSendMessage = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        // Check authentication
        /*
          - User is login
          - Active conversation not equal null
      */
        if (
          !firebase.auth().currentUser.email ||
          !this.activeConversation ||
          !this.input.value
        ) {
          // Alert
          /*
                ...
            */
          alert("Chọn hội thoại đi cu!!!!!👌");
          return;
        } else {
          // Send message
          db.collection("messages").add({
            content: this.input.value,
            sender: firebase.auth().currentUser.email,
            conversationId: this.activeConversation.id,
          });
        }
      }
    };
  
    handleSendEmotion = (event) => {
      event.preventDefault();
      if (!firebase.auth().currentUser.email || !this.activeConversation) {
        // Alert
        /*
                ...
            */
        alert("Chọn hội thoại đi cu!!!!!👌");
        return;
      } else {
        db.collection("messages").add({
          content: this.btnEmotion.innerHTML,
          sender: firebase.auth().currentUser.email,
          conversationId: this.activeConversation.id,
        });
      }
    };
  }
  
  export { Composer };