const React = require('react');
const ReactDOM = require('react-dom');

const hash = window.location.hash;

var botScript = [
  { type: "statement", message: "This is the first thing I say." },
  { type: "statement", message: "This is the second thing I say." },
  { type: "statement", message: "The third thing I say is this." },
  { type: "statement", message: "Smoop" },
  { type: "question", message: "How are you?" }
]

var botChatCount = 0;

/* Import Components */
const App = require('./components/App');

ReactDOM.render(<App botScript={botScript} botChatCount={botChatCount} />, document.getElementById('main'));