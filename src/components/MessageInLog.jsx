const React = require('react');

module.exports = function(props) {
  
  return (
    <li className={"log-message message " + props.authorType + "-message"}>
      <p className="author"><strong>{props.author}</strong></p>
      <p className="time"><em>{props.timestamp}</em></p>
      <p className="message-text">{props.messageText}</p>
    </li>  
  )
}