const getTalkBySpeakerId = require('./get-talks-by-speaker-id')

/**
 * Add to the event speakers their talks and categories associated.
 * @param {*} event
 */
const extendEventSpeakers = event => {
  const talkIdsBySpeakerId = getTalkBySpeakerId(event.talks)

  return {
    ...event,
    speakers: event.speakers.map(speaker => ({
      ...speaker,
      talks: talkIdsBySpeakerId[speaker.uid]
        ? talkIdsBySpeakerId[speaker.uid].map(talk => talk.id)
        : [],
      categories: talkIdsBySpeakerId[speaker.uid]
        ? [
            ...new Set(
              talkIdsBySpeakerId[speaker.uid].map(talk => talk.categories)
            )
          ]
        : []
    }))
  }
}

module.exports = extendEventSpeakers
