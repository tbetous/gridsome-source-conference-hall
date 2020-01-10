const { CONFIRMED_STATE } = require('./constants')

module.exports = event => {
  return event.talks.filter(talk => talk.state === CONFIRMED_STATE)
}
