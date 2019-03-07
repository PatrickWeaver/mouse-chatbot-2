const React = require('react');
const ReactDOM = require('react-dom');
var dragula = require('react-dragula');
const Message = require('./Message');

function getIndexInParent (el) {
  return Array.from(el.parentNode.children)
}


class Script extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveChange = this.handleSaveChange.bind(this);
  }
  
  handleEditMessage(m) {
   console.log(m); 
  }
  
  handleSaveChange(newMessage, key) {
    console.log("Save! " + key + ": " + newMessage);
    this.props.changeChat(newMessage, key);
  }
  
  componentDidMount() {
    var container = this.scriptList;
    var drake = dragula([container], {
      revertOnSpill: true,
    }).on('drop', (el, cont) => {
      console.log("DROP");
      console.log(Array.from(el.parentNode.children));
      var newArray = Array.from(el.parentNode.children);
      console.log(newArray);
      this.props.reorder(newArray);
      drake.cancel();
    });
  } 
  
  componentWillUnmount() {
  }
  
  render() {
    
    console.log("****")
    console.log(this.props.data);
    
    const messages = this.props.data.map((message, index) =>
      <Message
        message={message}
        key = {index}
        index = {index}
        botChatCount = {this.props.botChatCount}
        type = {message.type} // Need this even though it is part of message to be consistent with the Log messages
        editMessage = {this.handleEditMessage}
        handleDeleteMessage = {this.props.handleDeleteMessage}
        saveChange = {this.handleSaveChange}
      />                       
    );
    
    return (
      <div id="script">
        <h2>Script:</h2>  
        <ol
          id="script-messages"
          className='container'
          ref={(scriptList) => { this.scriptList = scriptList; }}
        >
          {messages}
        </ol> 
        <div
          id="new-script-message"
          onClick={this.props.newBlankMessage}
        >+</div>
                                         
      </div>
                                                                  
      
    )
  }
}

module.exports = Script;