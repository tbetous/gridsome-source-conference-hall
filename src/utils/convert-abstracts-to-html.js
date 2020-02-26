const showdown = require('showdown')

/**
 * Convert event abstracts from markdown to html
 * @param {*} event
 */
const convertAbstractsToHtml = event => {
  const converter = new showdown.Converter()
  return {
    ...event,
    talks: event.talks.map(talk => ({
      ...talk,
      abstract: converter.makeHtml(talk.abstract)
    }))
  }
}

module.exports = convertAbstractsToHtml
