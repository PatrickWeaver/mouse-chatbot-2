const React = require('react');
const listenForEnterKey = require('../helpers/listenForEnterKey')

module.exports = function(props) {
  
  return (
    <li className="script-message message">
      <input
        autoFocus
        className="script-message-input"
        type="text"
        defaultValue={props.messageText}
        onChange={props.onChange}
        onKeyPress={(e) => listenForEnterKey(e, props.saveMessage)}
      ></input>
      <div
        className="save-button script-button"
        onClick={props.saveMessage}
      >💾</div>
    </li>
  )
}