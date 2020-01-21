const axios = require('axios').default

const {
  pipe,
  cleanEvent,
  filterEventTalksByStates,
  extendEventSpeakers
} = require('./utils')
const { CONFIRMED_STATE } = require('./utils/constants')

const BASE_URL = 'https://conference-hall.io/api/v1/event'

class ConferenceHallSource {
  static defaultOptions() {
    return {
      apiKey: null,
      eventId: null,
      filterConfirmedTalks: false
    }
  }

  constructor(api, { apiKey, eventId, filterConfirmedTalks }) {
    this.eventId = eventId
    this.apiKey = apiKey
    this.filterConfirmedTalks = filterConfirmedTalks

    if (!apiKey) {
      throw new Error(`Missing Conference-hall plugin apiKey option`)
    }

    if (!eventId) {
      throw new Error(`Missing Conference-hall plugin eventId option`)
    }

    api.loadSource(async actions => {
      const { data } = await axios.get(`${BASE_URL}/${eventId}`, {
        params: { key: apiKey }
      })

      const event = pipe(data).apply(
        filterEventTalksByStates(this.getTargettedStates()),
        extendEventSpeakers,
        cleanEvent
      )

      this.addSpeakers(actions, event)
      this.addCategories(actions, event)
      this.addFormats(actions, event)
      this.addTalks(actions, event)
      this.addEvent(actions, event)
    })
  }

  getTargettedStates() {
    return [].concat(this.filterConfirmedTalks ? CONFIRMED_STATE : [])
  }

  getNodeEvent(event) {
    return {
      ...event,
      speakers: event.speakers.map(speaker => speaker.uid),
      talks: event.talks.map(talk => talk.id),
      categories: event.categories.map(category => category.id),
      formats: event.formats.map(format => format.id)
    }
  }

  getNodeSpeakers(speakers) {
    return speakers.map(speaker => ({
      ...speaker,
      id: speaker.uid
    }))
  }

  addSpeakers(actions, event) {
    const collection = actions.addCollection('Speaker')
    collection.addReference('talks', '[Talk]')
    collection.addReference('categories', '[Category]')
    this.getNodeSpeakers(event.speakers).forEach(speaker => {
      collection.addNode(speaker)
    })
  }

  addCategories(actions, event) {
    const collection = actions.addCollection('Category')
    event.categories.forEach(category => {
      collection.addNode(category)
    })
  }

  addFormats(actions, event) {
    const collection = actions.addCollection('Format')
    event.formats.forEach(format => {
      collection.addNode(format)
    })
  }

  addTalks(actions, event) {
    const collection = actions.addCollection('Talk')
    collection.addReference('speakers', '[Speaker]')
    collection.addReference('categories', 'Category')
    collection.addReference('formats', 'Format')
    event.talks.forEach(talk => {
      collection.addNode(talk)
    })
  }

  addEvent(actions, event) {
    const collection = actions.addCollection('Event')
    collection.addReference('speakers', '[Speaker]')
    collection.addReference('talks', '[Talk]')
    collection.addReference('categories', '[Category]')
    collection.addReference('formats', '[Format]')
    collection.addNode(this.getNodeEvent(event))
  }
}

module.exports = ConferenceHallSource
