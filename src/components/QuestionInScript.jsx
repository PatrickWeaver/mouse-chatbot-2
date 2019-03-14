const React = require('react');

module.exports = function(props) {
  return (
    <li className="script-message message script-question">
      <div className="script-message-text" >
        <p className={'message-text ' + (props.sent ? 'strikethrough' : '')} data-type={props.type}>{props.messageText}</p>
      </div>
      <div
        className="edit-button script-button"
        onClick={props.handleStartEditingMessage}
      >📝</div>
      <div
        className="delete-button script-button"
        onClick={props.handleDeleteMessage}
      >🚫</div>
    </li>
  )
}