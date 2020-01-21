const getTalksBySpeakerId = require('../get-talks-by-speaker-id')

describe('getTalksBySpeakerId', () => {
  it('should return an empty object if it there is no talks', () => {
    expect(getTalksBySpeakerId([])).toEqual({})
  })
  it('should return talks by speaker id', () => {
    const talk1 = {
      speakers: ['speaker_1']
    }
    const talk2 = {
      speakers: ['speaker_1', 'speaker_2']
    }
    expect(getTalksBySpeakerId([talk1, talk2])).toEqual({
      speaker_1: [talk1, talk2],
      speaker_2: [talk2]
    })
  })
})
