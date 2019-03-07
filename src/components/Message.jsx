const React = require('react');

const MessageEditingInScript = require('./MessageEditingInScript')
const MessageInScript = require('./MessageInScript')
const MessageInLog = require('./MessageInLog')

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartEditingMessage = this.handleStartEditingMessage.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
    this.state = {
      type: this.props.type,
      messageText: this.props.message.messageText,
      editedMessageText: this.props.message.messageText
    }
  }
  
  handleStartEditingMessage() {
    this.setState({
      type: "edit"
    }) 
  }
  
  saveMessage() {
    this.setState((state, props) => {
      return {
        type: "script"
      }
    })
    this.props.saveChange(this.state.editedMessageText, this.props.index);
  }
  
  onChange(event) {
    this.setState({editedMessageText: event.target.value});
  }

  render() {
    
    // 🚸 Was using this to use linebreaks in spades app: {nl2br(this.props.message.text)}
          
    // In Log:
    if (this.state.type === "log") {
      return <MessageInLog {...this.props.message} />
      
    // In script list:
    } else if (this.state.type === "script") {
      return (
        <MessageInScript
          {...this.props.message}
          sent = {this.props.index < this.props.botChatCount}
          handleStartEditingMessage = {this.handleStartEditingMessage}
          handleDeleteMessage = {() => this.props.handleDeleteMessage(this.props.index)}
        />
      )
      
    // While editing Script
    } else if (this.state.type === "edit") {
      return ( 
        <MessageEditingInScript
          messageText = {this.props.message.messageText}
          onChange = {this.onChange.bind(this)}
          saveMessage = {this.saveMessage}
        />
      )
    } else {
      return <h1>OOPS</h1>
    }
  }
}

module.exports = Message;