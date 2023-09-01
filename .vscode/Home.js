const $cardSection = document.getElementById('cardSection')


function printHTMLhome(event){
   let template = ""
   template =
`<div class="card m-2">
<img src="${event.image}" class="card-img-top imgCard" alt="outing_to_the_museum">
<div class=" d-flex flex-column justify-content-between">
   <div class="d-flex flex-row justify-content-center"><h5 class="card-title p-3 pb-1">${event.name}</h5></div>
   <p class="pCard p-2 cardDes">${event.description}</p>
   <div class="d-flex flex-row justify-content-between p-2 footCard">
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

let cards = ""
for(let event  of data.events){
    cards += printHTMLhome(event)
}

$cardSection.innerHTML = cards

