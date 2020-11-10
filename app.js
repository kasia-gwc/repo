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
            let short_link = nic.result.short_link
            createCard(short_link)
        })
        .catch((error) => console.log(error))
})

mainContainer.addEventListener('notify', (event) => {
    console.log('notified triggered', event)
})

/* 
  <div class="card">
    <form id="short-link-form">
      <input type="text" placeholder="shrtco.de/S2RynK" />
      <input type="submit" class="button-copy" value="Copy" />
    </form>
  </div> 
*/

function createCard(short_link) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')

    const formElement = document.createElement('form')
    formElement.id = 'short-link-form'

    const inputShortLink = document.createElement('input')
    inputShortLink.value = short_link
    inputShortLink.readOnly = true

    const buttonElement = document.createElement('input')
    buttonElement.type = 'submit'
    buttonElement.classList.add('button-copy')
    buttonElement.value = 'Copy'

    buttonElement.addEventListener('click', event => {
        event.preventDefault()
        buttonElement.classList.toggle("button-copy")
        buttonElement.classList.toggle("button-copied")
        buttonElement.value = 'Copied'
        inputShortLink.select()
        document.execCommand("copy")
        /* alert("Copied the link") */
    }
    )

    formElement.appendChild(inputShortLink)
    formElement.appendChild(buttonElement)
    cardElement.appendChild(formElement)
    document.getElementById('shorten-links-container').appendChild(cardElement)
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

