const { CONFIRMED_STATE } = require('./constants')

module.exports = event => {
  const acceptedTalks = event.talks.filter(
    talk => talk.state === CONFIRMED_STATE
  )
  const acceptedTalkFormatIds = Array.from(
    new Set(
      acceptedTalks.reduce((aggregator, talk) => {
        return aggregator.concat(talk.formats)
      }, [])
    )
  )
  return event.formats.filter(format =>
    acceptedTalkFormatIds.includes(format.id)
  )
}
