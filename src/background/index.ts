import browser from 'webextension-polyfill'
import { searchOpenFoodFacts } from './api'

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'SEARCH_API') {
    return searchOpenFoodFacts(message.query)
      .then(results => ({ results }))
      .catch((err) => {
        console.error('Background SEARCH_API error:', err)
        return { results: [], error: true }
      })
  }

  // Handle other messages or keep connection alive
  return Promise.resolve({ status: 'ok' })
})
