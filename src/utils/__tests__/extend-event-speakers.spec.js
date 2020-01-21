const extendEventSpeakers = require('../extend-event-speakers')

const event = {
  name: 'EVENT1',
  talks: [
    {
      id: 'TALK_1',
      speakers: ['SPEAKER_1', 'SPEAKER_2'],
      formats: 'FORMAT_1',
      categories: 'CATEGORY_1'
    },
    {
      id: 'TALK_2',
      speakers: ['SPEAKER_1'],
      formats: 'FORMAT_2',
      categories: 'CATEGORY_2'
    }
  ],
  speakers: [
    {
      uid: 'SPEAKER_1'
    },
    {
      uid: 'SPEAKER_2'
    },
    {
      uid: 'SPEAKER_3'
    }
  ],
  categories: [
    {
      id: 'CATEGORY_1'
    },
    {
      id: 'CATEGORY_2'
    }
  ],
  formats: [
    {
      id: 'FORMAT_1'
    },
    {
      id: 'FORMAT_2'
    }
  ]
}

describe('extendEventSpeakers', () => {
  const result = extendEventSpeakers(event)
  it('should return event with talks added to speakers (only one talk)', () => {
    expect(result.speakers[1].talks).toEqual(['TALK_1'])
  })
  it('should return event with talks added to speakers (multiple talks)', () => {
    expect(result.speakers[0].talks).toEqual(['TALK_1', 'TALK_2'])
  })
  it('should return event with talks added to speakers (no talks)', () => {
    expect(result.speakers[2].talks).toEqual([])
  })
  it('should return event with categories added to speakers (only one category)', () => {
    expect(result.speakers[1].categories).toEqual(['CATEGORY_1'])
  })
  it('should return event with categories added to speakers (multiple categories)', () => {
    expect(result.speakers[0].categories).toEqual(['CATEGORY_1', 'CATEGORY_2'])
  })
  it('should return event with categories added to speakers (no category)', () => {
    expect(result.speakers[2].categories).toEqual([])
  })
})
