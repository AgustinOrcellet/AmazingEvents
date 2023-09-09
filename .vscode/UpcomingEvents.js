const $cardSectionUp = document.getElementById('cardSectionUp')


const fechaActual = new Date (data.currentDate)

const $currentDate = Date.parse(fechaActual)

const upcomingsE = []
 for(let event of data.events){
    if  ($currentDate < (Date.parse(new Date (event.date)))) 
         upcomingsE.push(event)
     }

function printHTML(event){
    let template = ""
    template =
`<div class="card m-2">
<img src="${event.image}" class="card-img-top imgCard" alt="outing_to_the_museum">
<div class=" d-flex flex-column">
    <div class="d-flex flex-row justify-content-center"><h5 class="card-title p-3 pb-1">${event.name}</h5></div>
    <p class="pCard p-2 cardDes">${event.description}</p>
    <div class="d-flex flex-row justify-content-between p-2">
      <div class="d-flex flex-row justify-content-center p-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-3" id="price">$
       ${event.price}
      </div>
      <a href="./Details.html" class="btn btn-secondary">Details</a>
    </div>
</div>
</div>
`
     return template
}

let cardsUP = ""
for(let event  of upcomingsE){
     cardsUP += printHTML(event)
}

 $cardSectionUp.innerHTML = cardsUP


