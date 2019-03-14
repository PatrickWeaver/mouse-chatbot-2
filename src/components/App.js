const React = require('react');
const Log = require('./Log');
const Compose = require('./Compose');
const Script = require('./Script');
const $ = require('jquery');
const Base64 = require('js-base64').Base64;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.base64Script = this.base64Script.bind(this);
    this.updateChatData = this.updateChatData.bind(this);
    this.newGuestChat = this.newGuestChat.bind(this);
    this.reorderScript = this.reorderScript.bind(this);
    this.changeChat = this.changeChat.bind(this);
    this.handleNewBlankMessage = this.handleNewBlankMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.reset = this.reset.bind(this);
    
    this.state = {
      guestName: "Guest",
      botScript: this.mapMessages(this.props.botScript),
      botChatCount: this.props.botChatCount,
      chatData: []
    }
    // 🚸 This is duplicated below, probably shouldn't be.
    var chatData = {
    }
  }
  
  base64Script() {
    return Base64.encode(JSON.stringify(this.state.botScript));
  }
  
  mapMessages(messageArray) {
    return messageArray.map((message, index) => {
      return {
        type: message.type,
        messageText: message.message,
        index: index
      }
    })
  }
  
  updateChatData(data) {
    console.log("Updating Data!");
    console.log(data);
    this.setState((state, props) => ({
      chatData: state.chatData.concat([data])
    }));
  }
  
  crossOutMessageFromScript(index) {
    
  }
  
  newGuestChat(newMessage) {
    var guestChat = {
      author: this.state.guestName,
      authorType: "person",
      messageText: newMessage,
      timestamp: Date()
    }

    this.updateChatData(guestChat);
    
    setTimeout(() => {
      this.newBotChat();
    }, 500);
  }
  
  newBotChat() {
    console.log("BOTCHAT");
    var botChat =  {
      author: "Bot",
      authorType: "bot",
      messageText: this.state.botScript[this.state.botChatCount].messageText,
      timestamp: Date()
    }
    this.crossOutMessageFromScript(this.state.botChatCount)
    this.state.botChatCount += 1;
    this.updateChatData(botChat);
    
  }
  
  reorderScript(newOrder) {
    var newScriptData = []
    for (var i in newOrder) {
      //console.log(i + ": $$");
      const message = newOrder[i].firstChild.firstChild.innerText;
      const type = newOrder[i].firstChild.firstChild.dataset.type;
      newScriptData.push({type: type, message: message});
    }
    //console.log("NSD");
    //console.log(newScriptData);

    this.setState({
      botScript: this.mapMessages(newScriptData)
    })
  }
  
  changeChat(newMessage, key) {
    console.log("New Chats");
    console.log(key + ": " + newMessage);
    var botScript = this.state.botScript;
    botScript[key].messageText = newMessage;
    botScript[key].type = "statement";
    this.setState({
      botScript: botScript
    })
  }
  
  handleNewBlankMessage() {
    console.log("NEW MESSAGE");
    this.setState((state, props) => ({
      botScript: state.botScript.concat({type: "edit", text: "", index: state.botScript.length})
    }));
  }
  
  deleteMessage(index) {
    this.setState((state, props) => {
      var updatedBotScript = state.botScript;
      updatedBotScript.splice(index, 1);
      return {
        botScript: updatedBotScript
      }
    })
  }
  
  reset() {
    this.setState(() => ({
      botChatCount: this.props.botChatCount,
      chatData: []
    }), this.newBotChat)
  }
  
  componentDidMount() {
    this.newBotChat();
  }
  
  componentWillUnmount() {
  }
  
  render() {
    return (
      <div id="app">
        <div id="chat">
          <Log pollInterval={500} data={this.state.chatData} />
          <Compose
            onNewChat={this.newGuestChat}
            handleKeyPress={this.handleKeyPress}
          />
        </div>
        <div
          id="reset-button"
          onClick={this.reset}
        >🔁</div>
        <Script
          data = {this.state.botScript}
          reorder = {this.reorderScript}
          changeChat = {this.changeChat}
          newBlankMessage = {this.handleNewBlankMessage}
          botChatCount = {this.state.botChatCount}
          handleDeleteMessage = {this.deleteMessage}
          base64Script = {this.base64Script()}
        />
      </div>   
    )
  }
}

module.exports = App;