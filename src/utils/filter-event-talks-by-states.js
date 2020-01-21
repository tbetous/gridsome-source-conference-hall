/**
 * Filter event talks by given states. This function returns a function that takes the event to filter.
 * @param {*} states
 */
const filterEventTalksByStates = states => event => {
  return !states || !states.length
    ? event
    : {
        ...event,
        talks: event.talks.filter(talk => states.includes(talk.state))
      }
}

module.exports = filterEventTalksByStates
