/**
 * Get all talks by speaker id.
 * @param {*} talks
 */
const getTalksBySpeaker = talks => {
  return talks.reduce((aggregator, talk) => {
    talk.speakers.forEach(speakerId => {
      if (aggregator[`${speakerId}`]) {
        aggregator[`${speakerId}`].push(talk)
      } else {
        // eslint-disable-next-line no-param-reassign
        aggregator[`${speakerId}`] = [talk]
      }
    })
    return aggregator
  }, {})
}

module.exports = getTalksBySpeaker
