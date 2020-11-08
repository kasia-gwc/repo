/**
 * 1 Get form reference using document.getElementById('long-link-form')
 * 2 Add a submit listener to the form using addEventListener('submit')
 * 3 do event.preventDefault() to prevent default action JS/Browser performs
 * 4 access and store link values from the event using event.target.link.value in a constant
 * 5 Interpolate apiUrl and the link value together e.g. `https://api.shrtco.de/v2/shorten?url=${url}` in a constant
 * 6 fetch(apiUrl)
 *  .then(response => response.json())
 *  .then(response => console.log(response)) response will consist { ok, result }
 *  .catch(error => console.log(error))
 */
const mainContainer = document.querySelector('.main-container')
const longLink = document.getElementById('long-link-form')

longLink.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(event)

  const url = event.target.link.value
  const apiUrl = `https://api.shrtco.de/v2/shorten?url=${url}`

  fetch(apiUrl)
    .then((response) => response.json())
    .then((nic) => {
      const shortUrl = nic.result.short_link
      mainContainer.dispatchEvent(
        new CustomEvent('notify', { detail: shortUrl })
      )
    })
    .catch((error) => console.log(error))
})

mainContainer.addEventListener('notify', (event) => {
  console.log('notified triggered', event)
})
