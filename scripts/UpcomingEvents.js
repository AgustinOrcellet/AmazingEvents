const $cardSectionUp = document.getElementById('cardSectionUp')


const fechaActual = new Date (data.currentDate)

const $currentDate = Date.parse(fechaActual)

const $formCheckUp = document.getElementById('formCheckUp')

const $search = document.getElementById('buscadorUp')


const $categories =[... new Set (data.events.map(element => element.category))]

const upcomingsE = []
 for(let event of data.events){
    if  ($currentDate < (Date.parse(new Date (event.date)))) 
         upcomingsE.push(event)
     }


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
        
printFormChecksInHTML($categories, $formCheckUp)
        
$formCheckUp.addEventListener("change", ()=>{
      const $doubleFilt = doubleFilter(upcomingsE,$search)
      printCardsInHTML($doubleFilt,$cardSectionUp)
      }
 )

function printCardsUp(event){
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
    <a href="./details.html?id=${event.id}" class="btn btn-secondary">Details</a>
  </div>
</div>
</div>
`
     return template
}


$search.addEventListener("keyup", ()=>{
     const $doubleFilter = doubleFilter(upcomingsE,$search)
     printCardsInHTML($doubleFilter,$cardSectionUp)
     if ($doubleFilter.length == 0){
          alert("No hay eventos con ese nombre")
          $search.value = ""
          uncheckAll()
          printCardsInHTML(upcomingsE, $cardSectionUp)
     }
   }
   )
   
function  printCardsInHTML(array, elementoHTML) {
     let estructura = ""
     array.forEach( string => {
          estructura += printCardsUp(string)
     } )
     elementoHTML.innerHTML = estructura
   
}

printCardsInHTML(upcomingsE, $cardSectionUp)
   
   
function filterByMarkedForms(array){
     let checkedForms = document.querySelectorAll("input[type='checkbox']:checked")
     let valuesForms = Array.from(checkedForms).map(form =>form.value) 
     let filtereCardsByForms = array.filter(event => valuesForms.includes(event.category))
     if(valuesForms.length !== 0){
       return  filtereCardsByForms
     }else{
       return upcomingsE
}}
   
function filterBySerch(array,input){
     let arrayFilteredBySearch = array.filter(objet => objet.name.toLowerCase().includes(input.value.toLowerCase()))  
     return arrayFilteredBySearch
}
   
   
function doubleFilter(array, input){
     let arrayFilteredByMarkedForms = filterByMarkedForms(array)
     let arrayDoubleFilter = filterBySerch(arrayFilteredByMarkedForms,input)
     return arrayDoubleFilter
}  
   
function uncheckAll() {
     document.querySelectorAll('#formCheckUp input[type=checkbox]').forEach(function(checkElement) {
         checkElement.checked = false;
     });
}   
   