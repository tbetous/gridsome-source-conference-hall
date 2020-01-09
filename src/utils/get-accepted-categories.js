const { ACCEPTED_STATE } = require('./constants')

module.exports = event => {
  const acceptedTalks = event.talks.filter(
    talk => talk.state === ACCEPTED_STATE
  )
  const acceptedTalkCategoryIds = Array.from(
    new Set(
      acceptedTalks.reduce((aggregator, talk) => {
        return aggregator.concat(talk.categories)
      }, [])
    )
  )
  return event.categories.filter(category =>
    acceptedTalkCategoryIds.includes(category.id)
  )
}
