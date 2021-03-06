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

const longLink = document.getElementById('long-link-form')
const notificationContainer: HTMLDivElement = document.querySelector(
  '#notification-container'
) as HTMLDivElement
const spinner: HTMLElement = document.querySelector('.spinner') as HTMLElement
const shortenLinksContainer: HTMLDivElement = document.getElementById(
  'shorten-links-container'
) as HTMLDivElement

if (longLink) {
  longLink.addEventListener('submit', (event: any) => {
    event.preventDefault()
    spinner.style.display = 'flex'

    const url = event.target.link.value
    const apiUrl = `https://api.shrtco.de/v2/shorten?url=${url}`
    fetch(apiUrl).then((response) => {
      const json = response.json()
      json.then((data) => {
        spinner.style.display = 'none'
        if (data.ok) {
          // everything is good
          const shortLink = data.result.short_link
          // below line dispatches and creates an event at the same time.
          createCard(shortLink)
        } else {
          const errorMessage = data.error
          // below line dispatches and creates an event at the same time. It can be done in one instruction or split it in to two
          notificationContainer.dispatchEvent(
            new CustomEvent('notify', { detail: errorMessage })
          )
        }
      })
    })
  })
}

function createCard(shortLink: string) {
  const cardElement = document.createElement('div')
  cardElement.classList.add('card')

  const formElement = document.createElement('form')
  formElement.id = 'short-link-form'

  const inputShortLink = document.createElement('input')
  inputShortLink.value = shortLink
  inputShortLink.readOnly = true

  const buttonElement = document.createElement('button')
  buttonElement.type = 'submit'
  buttonElement.classList.add('button-copy')
  buttonElement.innerHTML = 'Copy'

  buttonElement.addEventListener('click', (event) => {
    event.preventDefault()
    buttonElement.classList.toggle('button-copy')
    buttonElement.classList.toggle('button-copied')

    if (buttonElement.classList.contains('button-copy')) {
      buttonElement.value = 'Copy'
    } else {
      buttonElement.value = 'Copied'
      notificationContainer.dispatchEvent(
        new CustomEvent('notify', {
          detail: 'Link successfully copied! 🎊'
        }) as any
      )
    }

    inputShortLink.select()
    document.execCommand('copy')
    /* alert("Copied the link") */
  })

  formElement.appendChild(inputShortLink)
  formElement.appendChild(buttonElement)
  cardElement.appendChild(formElement)
  shortenLinksContainer.appendChild(cardElement)
}
/**
 * 0. Create a function first and pass a param then execute it after line 25
 * 1. Create an empty div using document.createElement('div') and give and add a class using classList.add('card') const cardElement
 * 2. Create a form in javascript using document.createElement('form') and give a id short-link-form e.g. const formElement
 * 3. Create an input element in js using document.createElement('input') and assign it to a constant e.g const inputShortLink =
 *  3.1 set value to what you get from the api result.short_link
 *  3.2 set readonly to true
 * 4 Create an input element using document.createElement('input') and assign it to a const buttonElement
 *  4.1 set type submit
 *  4.2 add a class using .classList.add('button-copy')
 *  4.3 set value to Copy
 * 5. Append number 3 and number 4 to number 2 using appendChild e.g. formElement.appendChild([inputShortLink, buttonElement])
 * 6. Append formElement to cardElement.appendChild(formElement)
 * 7. Append cardElement to shorten-links-container element
 */

/**
 * stage 2
 * 1. addEventListener 'click' to the buttonElement and enure preventDefault happens
 * 2. When the button is clicked, toggle class button-copy with button-copied
 * 3. to copy the short_link to the clipboard
 *
 */

/* Notification html example
    <div class="success-alert">
      <strong>Link successfully copied! 🎊</strong>
      <input type="button" class="close" data-dismiss="alert" value="OK" />
    </div>
  */

/**
 * Displaying notifications
 *
 * 1. Create a CustomEvent('notify', { detail: errorMessage }) whenever error happens and store it in a const event = new CustomEvent('notify', { detail: errorMessage })
 *  1.1 use notificationContainer to dispatch e.g. notificationContainer.dispatchEvent(event)
 * 2. Make notification-container to listen to 'notify' events notificationContainer.addEventListener('notify', ...)
 * 3. Create a function and call it createNotification(message) { }
 * 4. Create empty div using document.createElement('div') e.g. const notificationElement
 *  4.1 add using classList.add('success-alert')
 * 5. Create strong element using const strongElement = document.createElement('strong')
 *  5.1 assign message parameter here strongElement.innerHtml = `${message} 🎊`
 * 6. Create input element using document.createElement('input') and store in a constant e.g. buttonElement
 *  6.1 add a class using buttonElement.classList.add('close')
 *  6.2 buttonElement.value = 'OK'
 *  6.3 buttonElement.type = 'button'
 * 7. notificationElement.appendChild(buttonElement)
 * 8. notificationElement.appendChild(strongElement)
 * 9. notificationContainer.appendChild(notificationElement)
 *
 */

notificationContainer.addEventListener('notify', (event: any) => {
  console.log(event.detail)
  createNotification(event.detail)
})
function createNotification(message: string) {
  const notificationElement = document.createElement('div')
  notificationElement.classList.add('success-alert')

  const strongElement = document.createElement('strong')
  strongElement.innerHTML = `${message}`

  const buttonElement = document.createElement('input')
  buttonElement.classList.add('close')
  buttonElement.type = 'button'
  buttonElement.value = 'OK'
  buttonElement.addEventListener('click', (event) => {
    // notificationContainer.style.display = 'none'
    notificationContainer.innerHTML = ''
  })

  notificationElement.appendChild(buttonElement)
  notificationElement.appendChild(strongElement)
  notificationContainer.appendChild(notificationElement)
}
