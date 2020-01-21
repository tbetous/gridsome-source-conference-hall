const getTalksRelatedIds = require('../get-talks-related-ids')

describe('getTalksRelatedIds', () => {
  it('should return an empty array of speakers if there is no talks', () => {
    expect(getTalksRelatedIds([]).speakers).toEqual([])
  })
  it('should return an empty array of categories if there is no talks', () => {
    expect(getTalksRelatedIds([]).categories).toEqual([])
  })
  it('should return an empty array of formats if there is no talks', () => {
    expect(getTalksRelatedIds([]).formats).toEqual([])
  })
  it('should return all related speakers ids once', () => {
    const talks = [
      {
        speakers: ['4', '3']
      },
      {
        speakers: ['2']
      },
      {
        speakers: ['4', '1']
      }
    ]

    expect(getTalksRelatedIds(talks).speakers).toEqual(['4', '3', '2', '1'])
  })
  it('should return all related formats ids once', () => {
    const talks = [
      {
        formats: '4'
      },
      {
        formats: '2'
      },
      {
        formats: '1'
      },
      {
        formats: '4'
      }
    ]

    expect(getTalksRelatedIds(talks).formats).toEqual(['4', '2', '1'])
  })
  it('should return all related categories ids once', () => {
    const talks = [
      {
        categories: '4'
      },
      {
        categories: '2'
      },
      {
        categories: '1'
      },
      {
        categories: '4'
      }
    ]

    expect(getTalksRelatedIds(talks).categories).toEqual(['4', '2', '1'])
  })
})
