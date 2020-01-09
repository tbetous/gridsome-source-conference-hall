module.exports = (eventId, event) => {
  return {
    ...event,
    id: eventId,
    speakers: event.speakers.map(speaker => ({
      ...speaker,
      id: event.speaker.uid
    })),
    talks: event.talks.map((talk, index) => ({
      ...talk,
      id: index
    }))
  }
}
