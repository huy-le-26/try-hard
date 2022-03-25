import { ConversationList } from "./coversationList.js";
import { ConversationInfo } from "./conversationInfo.js";
import { Composer } from "./composer.js";
import { MessageList } from "./mesageList.js";
import { UserList } from "./userList.js";

class Chat {
  activeConversation;
  subcribeConversationMessages = null;

  container = document.createElement("div");
  btnLogout = document.createElement("button");

  conversationList = new ConversationList();
  conversationInfor = new ConversationInfo();
  composer = new Composer();
  messageList = new MessageList();
  userList = new UserList();

  constructor() {
    this.container.appendChild(this.conversationList.container);

    this.conversationList.setOnConversationItemClick(
      this.setActiveConversation
    );

    this.container.appendChild(this.conversationInfor.container);
    this.subcribeConversation();
    ////
    this.conversationList.container.classList.add("left-content");
    ///
    const divContent = document.createElement("div");
    divContent.classList.add("right-content");
    this.container.appendChild(divContent);
    divContent.appendChild(this.conversationInfor.container);

    const divMainContent = document.createElement("div");
    divContent.appendChild(divMainContent);
    divMainContent.classList.add("right__main-content");

    const divMessages = document.createElement("div");
    divMainContent.appendChild(divMessages);
    divMessages.appendChild(this.messageList.container);
    divMessages.appendChild(this.composer.container);

    divMainContent.appendChild(this.userList.container);

    this.subcribeConversation();
  }

  //  biến lưu trữ lại các thay đổi của  Conversation
  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;

    //
    this.conversationInfor.setName(conversation.name);
    //
    this.conversationList.setStyleActiveConversation(conversation);
    ///
    this.composer.setActiveConversation(conversation);
    console.log("123", conversation);
    this.userList.setActiveConversation(conversation);

    this.messageList.clearMessage();

    this.subcribeConversationMessageList();
  };
  // =============================================================

  // hàm gét thời gian thực trên firebase để lấy ra chi tiết các cuộc trò chuyện
  subcribeConversation = () => {
    db.collection("conversations").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New conversation: ", change.doc.data());

        
          this.conversationList.handleCreateConversationAdded(
            change.doc.id,
            change.doc.data().name,
            change.doc.data().users
          );
        }
        if (change.type === "modified") {
          console.log("Modified conversation: ");
          this.userList.setActiveConversation({
            id: change.doc.id,
            name: change.doc.data().name,
            users: change.doc.data().users,
          });
        }
        
        if (change.type === "removed") {
          console.log("Removed conversation: ", change.doc.data());
        }
      });
    });
  };
  // ===============================================================
}
// listener
subcribeConversationMessageList = () => {
  if (this.subcribeConversationMessages !== null) {
    this.subcribeConversationMessages();
  }

  // Connect to listen
  this.subcribeConversationMessages = db
    .collection("messages")
    .where("conversationId", "==", this.activeConversation.id)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        this.messageList.addMessage(change.doc.data());
      });
    });
  // => Function()
};


export { Chat };
