const $cardDetails = document.getElementById('cardDetails')

const locationSearch = window.location.search
console.log(locationSearch)

const objetoURL = new URLSearchParams(window.location.search)
console.log(objetoURL)

const keyValue = objetoURL.get("id")
console.log(keyValue)

const eventFound = data.events.find (event => event.id === keyValue)
console.log(eventFound)




function printCards(event){
    let template = ""
    template =
  `       <div class=" d-flex flex-row m-2 bg-light" name = ${event.name} >
  <img src="${event.image}" class="card-img-top imgCardDetails" alt="image">
  <div class=" d-flex flex-column justify-content-between p-5 pt-2 ps-3">
    <div class="d-flex flex-row justify-content-center"><h5 class="card-title p-3 pb-1">${event.name}</h5></div>
    <ul class="infoDetails">
      <li>Date: ${event.date}</li>
      <li>Category: ${event.category}</li>
      <li>Place: ${event.place}</li>
      <li>Capacity: ${event.capacity}</li>
    </ul>
    <div class="d-flex flex-row justify-content-between p-2 footCard">
    </div>
  </div>
  </div>
  `
  return template
}
 
function  printCardsInHTML(event, elementoHTML){
    elementoHTML.innerHTML = printCards(event)
  }

  printCardsInHTML(eventFound, $cardDetails)
  