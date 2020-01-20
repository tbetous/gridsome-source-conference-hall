const axios = require('axios').default

const getConfirmedSpeakers = require('./utils/get-confirmed-speakers')
const getConfirmedTalks = require('./utils/get-confirmed-talks')
const getConfirmedCategories = require('./utils/get-confirmed-categories')
const getConfirmedFormats = require('./utils/get-confirmed-formats')

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
      const { data: event } = await axios.get(`${BASE_URL}/${eventId}`, {
        params: { key: apiKey }
      })

      this.addSpeakers(actions, event)
      this.addCategories(actions, event)
      this.addFormats(actions, event)
      this.addTalks(actions, event)
      this.addEvent(actions, event)
    })
  }

  // getFormattedEvent(event) {
  //   return {
  //     ...event,
  //     id: this.eventId,
  //     speakers: this.getNodeSpeakers(event.speakers),
  //     talks: this.getNodeTalks(event.talks)
  //   }
  // }

  getNodeEvent(event) {
    return {
      ...event,
      speakers: event.speakers.map(speaker => speaker.id),
      talks: event.talks.map(talk => talk.id),
      categories: event.categories.map(category => category.id),
      formats: event.formats.map(format => format.id)
    }
  }

  getNodeSpeakers(speakers) {
    return speakers.map(this.getNodeSpeaker)
  }

  getNodeSpeaker(speaker) {
    return {
      ...speaker,
      id: speaker.uid
    }
  }

  getNodeTalks(talks) {
    return talks.map(this.getNodeTalk)
  }

  getNodeTalk(talk, id) {
    return {
      ...talk,
      id
    }
  }

  addSpeakers(actions, event) {
    const collection = actions.addCollection('Speaker')
    const speakers = this.filterConfirmedTalks
      ? getConfirmedSpeakers(event)
      : event.speakers
    this.getNodeSpeakers(speakers).forEach(speaker => {
      collection.addNode(speaker)
    })
  }

  addCategories(actions, event) {
    const collection = actions.addCollection('Category')
    const categories = this.filterConfirmedTalks
      ? getConfirmedCategories(event)
      : event.categories
    categories.forEach(category => {
      collection.addNode(category)
    })
  }

  addFormats(actions, event) {
    const collection = actions.addCollection('Format')
    const formats = this.filterConfirmedTalks
      ? getConfirmedFormats(event)
      : event.formats
    formats.forEach(format => {
      collection.addNode(format)
    })
  }

  addTalks(actions, event) {
    const collection = actions.addCollection('Talk')
    collection.addReference('speakers', '[Speaker]')
    collection.addReference('categories', 'Category')
    collection.addReference('formats', 'Format')
    const talks = this.filterConfirmedTalks
      ? getConfirmedTalks(event)
      : event.talks
    this.getNodeTalks(talks).forEach(talk => {
      collection.addNode(talk)
    })
  }

  addEvent(actions, event) {
    const collection = actions.addCollection('Event')
    collection.addReference('speakers', '[Speaker]')
    collection.addReference('talks', '[Talk]')
    collection.addReference('categories', '[Category]')
    collection.addReference('formats', '[Format]')
    collection.addNode(event)
  }
}

module.exports = ConferenceHallSource
