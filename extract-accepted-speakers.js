module.exports = event => {
  const acceptedTalks = event.talks.filter(talk => talk.state == "accepted");
  const acceptedTalkSpeakerIds = Array.from(
    new Set(
      acceptedTalks.reduce((aggregator, talk) => {
        return aggregator.concat(talk.speakers);
      }, [])
    )
  );
  return event.speakers.filter(speaker =>
    acceptedTalkSpeakerIds.includes(speaker.uid)
  );
};
