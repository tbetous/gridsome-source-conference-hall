const {
  CONFIRMED_STATE,
  ACCEPTED_STATE,
  REFUSED_STATE
} = require('../constants')
const filterEventTalksByStates = require('../filter-event-talks-by-states')

const confirmedTalk = {
  state: CONFIRMED_STATE
}

const acceptedTalk = {
  state: ACCEPTED_STATE
}

const refusedTalk = {
  state: REFUSED_STATE
}

const event = {
  name: 'EVENT_1',
  talks: [confirmedTalk, acceptedTalk, refusedTalk]
}

describe('filterEventTalksByStates', () => {
  it('should return event with all talks if no state is given', () => {
    expect(filterEventTalksByStates()(event)).toEqual(event)
  })
  it('should return event with all talks if empty state array is given', () => {
    expect(filterEventTalksByStates([])(event)).toEqual(event)
  })
  it('should return event with talks filtered by given states', () => {
    expect(
      filterEventTalksByStates([CONFIRMED_STATE, REFUSED_STATE])(event)
    ).toEqual({
      ...event,
      talks: [confirmedTalk, refusedTalk]
    })
  })
})
