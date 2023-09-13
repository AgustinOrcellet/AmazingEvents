const $cardSection = document.getElementById('cardSection')


const $formCheck = document.getElementById('formCheck')

const $search = document.querySelector('input[type="search"]')


fetch("https://mindhub-xj03.onrender.com/api/amazing") 
  .then( (response) => response.json()) 
  .then( data => {
     let events = data.events
     
     const $categories =[... new Set (events.map(element => element.category))]


     $formCheck.addEventListener("change", ()=>{
      const $doubleFilt = doubleFilter(events,$search)
      printCardsInHTML($doubleFilt,$cardSection)
    }
    )

    $search.addEventListener("keyup", ()=>{
      const $doubleFilter = doubleFilter(events,$search)
      printCardsInHTML($doubleFilter,$cardSection)
      if ($doubleFilter.length == 0){
         alert("No hay eventos con ese nombre")
         $search.value = ""
         uncheckAll()
         printCardsInHTML(events, $cardSection)
        }
      }
    )
    
    printFormChecksInHTML($categories, $formCheck)  

    printCardsInHTML(events, $cardSection)

    

  })
  .catch( error => {console.log(error)} )





function printChecks(category){
  let plantilla = ""
  plantilla =
`<div class="form-check form-check-inline">
<input class="form-check-input" type="checkbox" id="${category}" value="${category}">
<label class="form-check-label" for="${category}">${category}</label>
</div>
`
   return plantilla
}

function printFormChecksInHTML(array, elementoHTML){
  let formChecks = ""
  for(let category  of array){
    formChecks += printChecks(category) 
  }
elementoHTML.innerHTML = formChecks
}






function printCards(event){
  let template = ""
  template =
`<div class="card m-2" name = ${event.name} >
<img src="${event.image}" class="card-img-top imgCard" alt="outing_to_the_museum">
<div class=" d-flex flex-column justify-content-between">
  <div class="d-flex flex-row justify-content-center"><h5 class="card-title p-3 pb-1">${event.name}</h5></div>
  <p class="pCard p-2 cardDes">${event.description}</p>
  <div class="d-flex flex-row justify-content-between p-2 footCard">
    <div class="d-flex flex-row justify-content-center p-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-3" id="price">$
     ${event.price}
    </div>
    <a href="./details.html?_id=${event._id}" class="btn btn-secondary">Details</a>
  </div>
</div>
</div>
`
   return template
}



function  printCardsInHTML(array, elementoHTML) {
  let estructura = ""
  array.forEach( string => {
       estructura += printCards(string)
  } )
  elementoHTML.innerHTML = estructura

}



function filterByMarkedForms(array){
  let checkedForms = document.querySelectorAll("input[type='checkbox']:checked")
  let valuesForms = Array.from(checkedForms).map(form =>form.value) 
  let filteredCardsByForms = array.filter(event => valuesForms.includes(event.category))
  if(valuesForms.length !== 0){
    return  filteredCardsByForms
    
  }else{
    return  array
}}

function filterBySerch(array,input){
  let arrayFilteredBySearch = array.filter(objet => objet.name.toLowerCase().includes(input.value.toLowerCase()))
  return arrayFilteredBySearch
}


function doubleFilter(array,input){
  let arrayFilteredByMarkedForms = filterByMarkedForms(array)
  let arrayDoubleFilter = filterBySerch(arrayFilteredByMarkedForms,input)
  return arrayDoubleFilter
}  

function uncheckAll() {
  document.querySelectorAll('#formCheck input[type=checkbox]').forEach(function(checkElement) {
      checkElement.checked = false;
  });
}