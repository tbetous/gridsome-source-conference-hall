const getTalksRelatedIds = require('./get-talks-related-ids')

/**
 * Remove all event speakers, categories and formats that not associated to a talk.
 * @param {*} event
 */
const cleanEvent = event => {
  const talksRelatedIds = getTalksRelatedIds(event.talks)

  return {
    ...event,
    speakers: event.speakers.filter(speaker =>
      talksRelatedIds.speakers.includes(speaker.uid)
    ),
    formats: event.formats.filter(format =>
      talksRelatedIds.formats.includes(format.id)
    ),
    categories: event.categories.filter(category =>
      talksRelatedIds.categories.includes(category.id)
    )
  }
}

module.exports = cleanEvent
