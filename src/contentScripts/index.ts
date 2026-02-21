import browser from 'webextension-polyfill'

function getPageContext() {
  const title = document.querySelector('h1')?.textContent || ''
  return { title }
}

browser.runtime.sendMessage({
  type: 'PAGE_LOAD',
  data: getPageContext(),
})

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'GET_PAGE_CONTEXT') {
    return Promise.resolve(getPageContext())
  }
})
