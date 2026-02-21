/* eslint-disable no-console */
import browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener((message, _sender) => {
    console.log('Background received:', message)
    return Promise.resolve({ status: 'ok' })
})
