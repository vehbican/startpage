/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"maps":"https://maps.google.com/","bb":"https://ieu.blackboard.com/ultra/institution-page","chat":"https://chat.openai.com/","git":"https://github.com/","tw":"https://www.twitch.tv/","ce":"https://ce.ieu.edu.tr/en/curr"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"TsriiByQsY11n9Te","label":"Main","bookmarks":[{"id":"134SnDQontIwcEtg","label":"Whatsapp","url":"https://web.whatsapp.com/"},{"id":"GYHuNueQNPpg9wrQ","label":"Translate","url":"https://www.google.com/search?q=google%20translate"},{"id":"PH4fRrYH0AtsQnp0","label":"Lichess","url":"https://lichess.org/"},{"id":"WFLYqkjdCitaaS0P","label":"Twitter","url":"https://twitter.com/home?lang=tr"}]},{"id":"L8uVecUTS1NY1mM4","label":"School","bookmarks":[{"id":"27EfayyMoLBxd1rM","label":"Blackboard","url":"https://ieu.blackboard.com/ultra/institution-page"},{"id":"cvmZb4Rd8N58DhGK","label":"Oasis","url":"https://oasis.izmirekonomi.edu.tr/index"},{"id":"tWQPd0q3a9hktkhC","label":"Overleaf","url":"https://www.overleaf.com/project"},{"id":"YwgKs2CN2cJHqlwS","label":"Linkedin","url":"https://www.linkedin.com/feed/"}]},{"id":"e2K9ocjXnv0T3UTP","label":"Coding","bookmarks":[{"id":"iLoXDnFbzwqL1flT","label":"Github","url":"https://github.com/"},{"id":"xUtz6OjsgZZJ7aYk","label":"Chatgpt","url":"https://chat.openai.com/"}]},{"id":"1Q3Qk2AfJVsuZiYy","label":"Mail","bookmarks":[{"id":"W9RZoeolkZJALQkQ","label":"Outlook","url":"https://outlook.live.com/mail/0/"},{"id":"sXyH1pyde8Xjk1tH","label":"Webmail","url":"https://zcstd.izmirekonomi.edu.tr/#1"}]},{"id":"fKUXG7E0p9GLvZj9","label":"Video","bookmarks":[{"id":"Q4ySgyAuDTw6pkSh","label":"Youtube","url":"https://www.youtube.com/"},{"id":"yObt6v7WB7BC9e25","label":"Twitch","url":"https://www.twitch.tv/"},{"id":"wvphSn5sUmCzqdDV","label":"Netflix","url":"https://www.netflix.com/browse"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
