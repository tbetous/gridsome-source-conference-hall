/**
 * Get all speakers, formats and categories related to given talks
 * @param {*} talks An array of talks
 */
const getTalksRelatedIds = talks => {
  const aggregatedRelatedIds = talks.reduce(
    (aggregator, talk) => {
      return {
        speakers: aggregator.speakers.concat(talk.speakers),
        formats: aggregator.formats.concat(talk.formats),
        categories: aggregator.categories.concat(talk.categories)
      }
    },
    {
      speakers: [],
      formats: [],
      categories: []
    }
  )

  return {
    speakers: [...new Set(aggregatedRelatedIds.speakers)],
    formats: [...new Set(aggregatedRelatedIds.formats)],
    categories: [...new Set(aggregatedRelatedIds.categories)]
  }
}

module.exports = getTalksRelatedIds
