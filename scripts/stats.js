const $tablaUno = document.getElementById('tablaUno')

const $tablaDos = document.getElementById('tablaDos')

const $tablaTres = document.getElementById('tablaTres')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})
fetch("https://mindhub-xj03.onrender.com/api/amazing") 
  .then( (response) => response.json()) 
  .then( data => {
     let events = data.events

     

     const fechaActual = new Date (data.currentDate)

     const $currentDate = Date.parse(fechaActual)

     const upcomingsE = []
      for(let event of events){
           if  ($currentDate < (Date.parse(new Date (event.date)))) 
         upcomingsE.push(event)
      }
      const pastE = []
      for(let event of data.events){
       if ($currentDate > (Date.parse(new Date (event.date))))
             pastE.push(event)
       } 

       const $categoriesPast =[... new Set (pastE.map(element => element.category))]

       const $categoriesUp =[... new Set (upcomingsE.map(element => element.category))]

       insertTable1InHTML(events,pastE,$tablaUno)

       insertTable2InHTML($tablaDos,crearobjetocategory($categoriesPast,pastE))

       insertTable3InHTML($tablaTres,crearobjetocategory($categoriesUp,upcomingsE))
     
     

})
.catch( error => {console.log(error)} )


//Funciones: Tabla 1

//Mayor asistencia

function highestPorcentAssistance(array){
    highestArray = []
    array.forEach(e => {
        highestArray .push(e.porcentaje)})
    let high = Math.max(...highestArray)
    return high
}
function highestPorcentAssistanceName(array){
    let highestPorcentName =''
    let objet = array.find(e=>e.porcentaje == highestPorcentAssistance(array))
    highestPorcentName = objet.name
        return highestPorcentName
    }

//Menor asistencia

function lowestPorcentAssistance(array){
    lowestArray = []
    array.forEach(e => {
        lowestArray .push(e.porcentaje)})
    let low = Math.min(...lowestArray)
    return low
}

function lowestPorcentAssistanceName(array){
    let lowestPorcentName =''
    let objet = array.find(e=>e.porcentaje == lowestPorcentAssistance(array))
    lowestPorcentName = objet.name
        return lowestPorcentName
    }

//Mayor capacidad

function eventsWithlargerCapacity(array){
    capacityArray = []
    array.forEach(e => {
      capacityArray.push(e.capacity)})
        let largerCapacity = Math.max(...capacityArray)
    return largerCapacity

    
}
function  eventsWithlargerCapacityName(array){
let largerCapacityName =''
let objet = array.find(e=>e.capacity == eventsWithlargerCapacity(array))
   largerCapacityName = objet.name
    return largerCapacityName
}


function makeTable1(array,array2){
    let tableModel = 
    `
    <table class="table table-striped my-4">
        <thead>
            <tr>
                <th colspan="3" class="bg-dark text-white">Events Statics<th>
            </tr    
            <tr>
                <th>Events with highest % of assistance</th>
                <th>Events with lowest % of assistance</th>
                <th>Events with larger capacity</th>
            </tr>
            <tr>
                <td>${highestPorcentAssistanceName(porcentaje(array2)) + ' ' + highestPorcentAssistance(porcentaje(array2)).toFixed(2)+'%'}</td> 
                <td>${lowestPorcentAssistanceName(porcentaje(array2)) + ' ' + lowestPorcentAssistance(porcentaje(array2)).toFixed(2)+'%'}</td>
                <td>${eventsWithlargerCapacityName(array) + ' ' + eventsWithlargerCapacity(array)}</td>
            </tr>
        <thead>
    <table>
    `
    return tableModel
}

function insertTable1InHTML(array,array2,elementoHTML){
elementoHTML.innerHTML = makeTable1(array,array2)
}


//Funciones: Tabla 2 y 3

function categoryClass(array,category){
    const  $category = []
    for(let event of array){
         if  (event.category == category) 
         $category.push(event)
    }return $category    
} 


function crearobjetocategory(array,array2){
    let arrayCatObjet = []
   
    function cat(name,revenue,porcentaje){
        this.name = name
        this.revenue = revenue
        this.porcentaje = porcentaje}
    array.forEach(c => {
        const cate = new cat(c,revenueXcategory(array2,c),porcentajeXcategory(array2,c))
        arrayCatObjet.push(cate)})
    
    return arrayCatObjet
    }

function revenueExEvent(array){
    array.forEach(event => {
       let $revenue=  event.estimate?event.estimate*event.price:event.assistance*event.price
        event['revenue']= $revenue})
         return array
}

function porcentaje(array){
    array.forEach(event => {
        let $porcentaje =  ((event.estimate?event.estimate / event.capacity:event.assistance / event.capacity)*100)
        event['porcentaje']= $porcentaje})
         return array
}


function totalRevenueX(array){
    let total= 0
    array.forEach(e => total+= e.revenue)
        return total
}
function totalPorcentajeX(array){
    let total= 0
    array.forEach(e => total+= e.porcentaje)
        return (total /array.length).toFixed(2) + '%'
}

function revenueXcategory(array,category){
    let total = totalRevenueX(categoryClass(revenueExEvent(array),category))
    return total
}

function porcentajeXcategory(array,category){
    let total = totalPorcentajeX(categoryClass(porcentaje(array),category))
    return total
}

// Funciones Tabla 2

function makeTable2Head(){
    let tableHeadModel = '<table class="table table-striped my-4">'
    tableHeadModel += '<thead><tr><th colspan="3" class="bg-dark text-white">Past Events statics by category<th><tr><thead>'
    tableHeadModel += '<tr><th>Category</th><th>Revenues</th><th>Porcents of asistence</th></tr>'
   return tableHeadModel
}
   
function makeTable2Body(categoria){   
    let template = ""
    template =
    `    <tr>
          <td>${categoria.name}</td>
          <td>${formatter.format(categoria.revenue)}</td>
          <td>${categoria.porcentaje}</td>
         </tr>  
    `
    return template
}



function insertTable2InHTML(elementoHTML,array){
    let estructura = makeTable2Head()
    array.forEach( categoria => {
         estructura += makeTable2Body(categoria)
    } )
    elementoHTML.innerHTML = estructura  
    }

//Funciones Tabla 3

function makeTable3Head(){
    let tableHeadModel = '<table class="table table-striped my-4">'
    tableHeadModel += '<thead><tr><th colspan="3" class="bg-dark text-white">Upcoming Events statics by category<th><tr><thead>'
    tableHeadModel += '<tr><th>Category</th><th>Revenues</th><th>Porcents of asistence</th></tr>'
   return tableHeadModel
}
   
function makeTable3Body(categoria){   
    let template = ""
    template =
    `    <tr>
          <td>${categoria.name}</td>
          <td>${formatter.format(categoria.revenue)}</td>
          <td>${categoria.porcentaje}</td>
         </tr>  
    `
    return template
}



function insertTable3InHTML(elementoHTML,array){
    let estructura = makeTable3Head()
    array.forEach( categoria => {
         estructura += makeTable3Body(categoria)
    } )
    elementoHTML.innerHTML = estructura  
    }



    

    





