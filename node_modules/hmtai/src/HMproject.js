const fetch = require('node-fetch')
const endpoints = require('./data/endpoints')

const baseURI = 'https://hmtai.hatsunia.cfd/v2/'
const getter = async endpoint => await fetch(baseURI + endpoint).then(res => res.json()).then(res => res.url)

class hmtai {
    constructor() {
        this.#self = this;

        for (const category in endpoints) {
            for (const endpoint of endpoints[category]) {
                this.#self[category][endpoint] = getter.bind(null, endpoint)
            }
        }
    }

    #self
    sfw = {}
    nsfw = {}
}

module.exports = hmtai