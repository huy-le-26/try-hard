import { ConversationItem } from "./conversationItem.js";
import { CreateConversationForm } from "./createConversationForm.js";

class ConversationList {
  container = document.createElement("div");
  btnCreateConversation = document.createElement("button");
  createConversationForm = new CreateConversationForm();

  onConversationItemClick;
  //
  conversations = [];

  constructor() {
    this.btnCreateConversation.innerHTML = "+ Create Conversation";
    this.btnCreateConversation.addEventListener("click", this.handleVisible);

    this.container.appendChild(this.btnCreateConversation);
    this.container.appendChild(this.createConversationForm.container);
  }
// ham bat su kien khi click vao moi itemconvesation
  setOnConversationItemClick = (listener) => {
    // this.onConversationItemClick = () => {};
    this.onConversationItemClick = listener;
  };
// hàm hiển thị các bộ phận của conversation (id, name, users) KHI thêm các conversation mới vào ConversationList
  handleCreateConversationAdded = (id, name, users) => {
    const conversation = new ConversationItem(id, name, users);
    //


    conversation.setOnClick((id, name, users) => {
      // gắn sự kiện onclick vào các conversation
      // Get conversation information
      // console.log(id, name, users);

      this.onConversationItemClick({
        id: id,
        name: name,
        users: users,
      });
    });
    //
    this.conversations.push(conversation);
// thêm tát cả các conversations vào trong 1 mảng mới
    ////
    this.container.appendChild(conversation.container);
  };
// hàm hiển thị hightlight
  setStyleActiveConversation = (conversation) => {
    this.conversations.forEach((item) => {
      // lọc các conversation trong mảng mới 
      if (item.id === conversation.id) {
        item.setActiveHighlight(true);
      } else {
        item.setActiveHighlight(false);
      }
    });
  };

  handleVisible = () => {
    this.createConversationForm.setVisible(true);
  };
}

export { ConversationList };