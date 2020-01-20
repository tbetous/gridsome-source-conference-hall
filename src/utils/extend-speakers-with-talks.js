const getTalkBySpeakerId = require('./get-talk-by-speaker-id')

module.exports = event => {
  const talkIdsBySpeakerId = getTalkBySpeakerId(event.talk)

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
              talkIdsBySpeakerId[speaker.uid].flatMap(talk => talk.categories)
            )
          ]
        : []
    }))
  }
}
