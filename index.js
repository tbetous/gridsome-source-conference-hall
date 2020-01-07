const axios = require("axios").default;

const extractAcceptedSpeakers = require("./extract-accepted-speakers");
const extractAcceptedTalks = require("./extract-accepted-talks");
const extractAcceptedCategories = require("./extract-accepted-categories");
const extractAcceptedFormats = require("./extract-accepted-formats");

const BASE_URL = "https://conference-hall.io/api/v1/event";

class ConferenceHallSource {
  static defaultOptions() {
    return {
      apiKey: null,
      eventId: null,
      filterAcceptedTalks: true
    };
  }

  constructor(api, { apiKey, eventId, filterAcceptedTalks }) {
    this.eventId = eventId;
    this.apiKey = apiKey;
    this.filterAcceptedTalks = filterAcceptedTalks;

    if (!apiKey) {
      throw new Error(`Missing Conference-hall plugin apiKey option`);
    }

    if (!eventId) {
      throw new Error(`Missing Conference-hall plugin eventId option`);
    }

    api.loadSource(async actions => {
      let { data: event } = await axios.get(`${BASE_URL}/${eventId}`, {
        params: { key: apiKey }
      });

      this.formatEvent(event);
      this.addSpeakers(actions, event);
      this.addCategories(actions, event);
      this.addFormats(actions, event);
      this.addTalks(actions, event);
      this.addEvent(actions, event);
    });
  }

  formatEvent(event) {
    event.id = this.eventId;
    event.speakers = event.speakers.map(speaker => ({
      ...speaker,
      id: speaker.uid
    }));
    event.talks = event.talks.map((talk, index) => ({
      ...talk,
      id: index
    }));
  }

  addSpeakers(actions, event) {
    const collection = actions.addCollection("Speaker");
    const speakers = this.filterAcceptedTalks
      ? extractAcceptedSpeakers(event)
      : event.speakers;
    speakers.forEach(speaker => {
      collection.addNode({
        ...speaker
      });
    });
  }

  addCategories(actions, event) {
    const collection = actions.addCollection("Category");
    const categories = this.filterAcceptedTalks
      ? extractAcceptedCategories(event)
      : event.categories;
    categories.forEach(category => {
      collection.addNode({
        ...category
      });
    });
  }

  addFormats(actions, event) {
    const collection = actions.addCollection("Format");
    const formats = this.filterAcceptedTalks
      ? extractAcceptedFormats(event)
      : event.formats;
    formats.forEach(format => {
      collection.addNode({
        ...format
      });
    });
  }

  addTalks(actions, event) {
    const collection = actions.addCollection("Talk");
    collection.addReference("speakers", "[Speaker]");
    collection.addReference("categories", "Category");
    collection.addReference("formats", "Format");
    const talks = this.filterAcceptedTalks
      ? extractAcceptedTalks(event)
      : event.talks;
    talks.forEach(talk => {
      collection.addNode({
        ...talk
      });
    });
  }

  addEvent(actions, event) {
    const collection = actions.addCollection("Event");
    collection.addReference("speakers", "[Speaker]");
    collection.addReference("talks", "[Talk]");
    collection.addReference("categories", "[Category]");
    collection.addReference("formats", "[Format]");
    collection.addNode(event);
  }
}

module.exports = ConferenceHallSource;
