let contactId
let currentContact = {}
let contacts = []
loadContacts()
drawContacts()

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target
  let contactName = form.contactName.value
  let contactNumber = form.contactNumber.value
  // @ts-ignore
  let emContact = document.getElementById("emContact").checked
  currentContact = contacts.find(contact => contact.name == contactName)
  if (!currentContact) {
    contactId = generateId()
    currentContact = {
      ID: contactId,
      name: contactName,
      number: contactNumber,
      emcontact: emContact
    }
    contacts.push(currentContact)
    saveContacts()
  }
  form.reset()
  document.getElementById("new-contact-form").classList.add("hidden")
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactData = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactData) {
    contacts = contactData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""
  contacts.forEach(contact => {
    template += `
      <div class="card mt-1 mb-1 ${contact.emcontact ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>${contact.number}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.ID}')"></i>
        </div>
    </div>`
  })
  document.getElementById("contacts").innerHTML = template
}

function mydrawContacts() {
  let template = ""
  contacts.forEach(contact => {
    if (contact.emcontact) {
      template += `
      <div class="card mt-1 mb-1 emergency-contact">
        <h6 class="mt-1 mb-1">${contact.ID}</h6>
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>${contact.number}</span>
          </p>
          <button type="button" onclick="removeContact('${contact.ID}')">Remove</button>
          <i class="action fa fa-trash text-danger"></i>
        </div>
    </div>`} else {
      template += `
      <div class="card mt-1 mb-1">
        <h6 class="mt-1 mb-1">${contact.ID}</h6>
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
          <i class="fa fa-fw fa-phone"></i>
          <span>${contact.number}</span>
          </p>
          <button type="button" onclick="removeContact('${contact.ID}')">Remove</button>
          <i class="action fa fa-trash text-danger"></i>
        </div>
      </div>`}
  })
  document.getElementById("contacts").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.ID === contactId)
  if (index == -1) {
    throw new Error("Invalid Contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  let contactFormElement = document.getElementById("new-contact-form")
  contactFormElement.classList.toggle("hidden")
  // @ts-ignore
  contactFormElement.reset()
}

function mytoggleAddContactForm() {
  let contactFormElement = document.getElementById("new-contact-form")
  if (contactFormElement.classList.contains("hidden")) {
    contactFormElement.classList.remove("hidden")
  } else {
    contactFormElement.classList.add("hidden")
  }
  // @ts-ignore
  contactFormElement.reset()
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}
