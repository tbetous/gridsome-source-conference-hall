module.exports = (talks, states) => {
  return !states || states.length
    ? talks
    : talks.filter(talk => states.includes(talk.state))
}
