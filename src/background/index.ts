import browser from 'webextension-polyfill'
import { searchOpenFoodFacts } from './api'

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'SEARCH_API') {
        return searchOpenFoodFacts(message.query)
            .then(results => ({ results }))
    }

    return Promise.resolve({ status: 'ok' })
})
