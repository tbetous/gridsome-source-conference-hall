const { ACCEPTED_STATE } = require('./constants')

module.exports = event => {
  return event.talks.filter(talk => talk.state === ACCEPTED_STATE)
}
