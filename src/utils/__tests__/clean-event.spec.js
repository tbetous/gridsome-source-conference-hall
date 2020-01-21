const cleanEventByTalkStates = require('../clean-event')

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
      speakers: ['SPEAKER_1', 'SPEAKER_3'],
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

describe('cleanEventByTalkStates', () => {
  it('should return cleaned event without speaker that have no assigned talk', () => {
    expect(
      cleanEventByTalkStates({
        ...event,
        speakers: [
          ...event.speakers,
          {
            uid: 'UNKNOWN_SPEAKER'
          }
        ]
      })
    ).toEqual(event)
  })
  it('should return cleaned event without format that have no assigned talk', () => {
    expect(
      cleanEventByTalkStates({
        ...event,
        formats: [
          ...event.formats,
          {
            uid: 'UNKNOWN_FORMATS'
          }
        ]
      })
    ).toEqual(event)
  })
  it('should return cleaned event with format that have no assigned talk', () => {
    expect(
      cleanEventByTalkStates({
        ...event,
        categories: [
          ...event.categories,
          {
            uid: 'UNKNOWN_CATEGORY'
          }
        ]
      })
    ).toEqual(event)
  })
})
