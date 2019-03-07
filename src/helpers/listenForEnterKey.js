module.exports = function(e, callback) {
  if (e.charCode === 13 && !e.shiftKey) {
    e.preventDefault()
    callback()
  }
}