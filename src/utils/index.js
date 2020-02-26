const pipe = require('./pipe')
const cleanEvent = require('./clean-event')
const filterEventTalksByStates = require('./filter-event-talks-by-states')
const extendEventSpeakers = require('./extend-event-speakers')
const convertAbstractsToHtml = require('./convert-abstracts-to-html')

module.exports = {
  pipe,
  cleanEvent,
  filterEventTalksByStates,
  extendEventSpeakers,
  convertAbstractsToHtml
}
