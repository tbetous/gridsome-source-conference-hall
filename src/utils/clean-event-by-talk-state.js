const filterTalksByState = require('./filter-talks-by-state')
const getTalksRelatedIds = require('./get-talks-related-ids')

module.exports = (event, states) => {
  const filteredTalks = filterTalksByState(event.talks, states)
  const filteredTalksRelatedIds = getTalksRelatedIds(filteredTalks)

  return {
    ...event,
    speakers: event.speakers.filter(speaker =>
      filteredTalksRelatedIds.speakers.includes(speaker.uid)
    ),
    formats: event.formats.filter(format =>
      filteredTalksRelatedIds.formats.includes(format.id)
    ),
    categories: event.categories.filter(category =>
      filteredTalksRelatedIds.categories.includes(category.id)
    )
  }
}
