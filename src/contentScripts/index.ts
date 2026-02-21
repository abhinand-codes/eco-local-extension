import browser from 'webextension-polyfill'

function getPageContext() {
  const title
    = document.querySelector('h1')?.textContent
      || document.title
      || ''
  const metaKeywords
    = document.querySelector('meta[name="keywords"]')
      ?.getAttribute('content') || ''

  return { title, keywords: metaKeywords }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'GET_PAGE_CONTEXT') {
    return Promise.resolve(getPageContext())
  }
})
