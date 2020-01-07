module.exports = event => {
  return event.talks.filter(talk => talk.state == "accepted");
};
