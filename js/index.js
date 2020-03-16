// document.addEventListener("DOMContentLoaded", pageSetup)

// function pageSetup() {
//     fetchMonsters()
//     monsterForm().addEventListener('submit', processMonsterForm)
//     nextButton().addEventListener('click', () => paginate('next'))
//     backButton().addEventListener('click', () => paginate('back'))
// }

// function callPaginateNext() {
//     paginate('next')
// }

// function fetchMonsters(page_num=1) {
//     monsterContainer().innerHTML = ""
//     monsterContainer().dataset.currentPage = page_num
//     fetch(`http://localhost:3000/monsters?_limit=10&_page=${page_num}`)
//         .then(r => r.json())
//         .then(monsterJson => monsterJson.forEach(monster => renderMonster(monster)))
// }

// function paginate(direction) {
//     let currentPage = monsterContainer().dataset.currentPage 
//     if (direction === 'back') {
//         currentPage--
//     } else {
//         currentPage++
//     }
//     currentPage = Math.min(Math.max(currentPage, 1), 100)
//     fetchMonsters(currentPage)
// }

// function renderMonster(monster) {
//     let container = monsterContainer()
//     let card = document.createElement('div')
//     let monsterName = document.createElement('h2')
//     monsterName.innerText = monster.name 

//     let monsterAge = document.createElement('div')
//     monsterAge.innerText = monster.age

//     let monsterDesc = document.createElement('div')
//     monsterDesc.innerText = monster.description

//     container.appendChild(card)
//     card.appendChild(monsterName)
//     card.appendChild(monsterAge)
//     card.appendChild(monsterDesc)

// }

// function monsterContainer() {
//     return document.getElementById('monster-container')
// }

// function monsterForm() {
//     return document.getElementsByTagName('form')[0]
// }

// function processMonsterForm(event) {
//     event.preventDefault() 
//     let form = event.currentTarget

//     let name = form.children.name.value
//     let age = form.children.age.value 
//     let description = form.children.description.value

//     let monsterPayload = {"name": name, age: age, description: description}
//     fetch("http://localhost:3000/monsters", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(monsterPayload)
//     }).then(r => r.json())
//     .then(monster => renderMonster(monster))
//     .catch(error => console.log(`Paul's error: ${error}`))
//     form.reset()
// }

// function nextButton() {
//     return document.getElementById("next")
// }

// function backButton() {
//     return document.getElementById("back")
// }

const monsterForm = document.querySelector('#create-monster')
const monsterBox = document.querySelector('#monster-container')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector('#forward')
let pageStart = 0
let pageEnd = 50
backButton.addEventListener("click",previousPage)
forwardButton.addEventListener("click",nextPage)
document.addEventListener("submit",handleFormSubmit)

createMonsterForm=()=>{
    const a=document.createElement('form')
    b=document.createElement('input')
    c=document.createElement('input')
    d=document.createElement('input')
    e=document.createElement('button')
    a.id='monster-form'
    b.id='name'
    c.id='age'
    d.id='description'
    b.placeholder='name...'
    c.placeholder='age...'
    d.placeholder='description...'
    e.innerHTML='Create'
    a.append(b,c,d,e)

    monsterForm.appendChild(a)
    // addSubmitEventListener()
}

function handleFormSubmit(event){
    event.preventDefault()
    
    const monsterFormTarget = event.target
  
    const monsterName = monsterFormTarget["name"].value
    const monsterAge = monsterFormTarget["age"].value
    const monsterDesc = monsterFormTarget["description"].value
  
    const monObj = {
      name: monsterName,
      age: monsterAge,
      description: monsterDesc
    } 
      fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify(monObj)
    })
      .then(response => response.json())
      .then(actualNewMonster => {
        renderOneMonster(actualNewMonster)
      })
  
}

function renderOneMonster(monster) {
    const outerDiv = document.createElement("div")
    outerDiv.className = "monster-page"
    outerDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    `
    monsterBox.append(outerDiv)
}

function renderAllMonsters(monsterList) {
    monsterList.forEach(renderOneMonster)
}

function renderPage() {
    fetch("http://localhost:3000/monsters")
    .then(response => response.json())
    .then(actualMonstersData => {
        renderAllMonsters(actualMonstersData)
        showFifty()
    })
}

function previousPage() {
    if (pageStart === 0) {
        console.log("can't go back further")
    } else {
        pageStart-=50
        pageEnd-=50
    }
    showFifty()
}

function nextPage() {
    pageStart+=50
    pageEnd+=50
    showFifty()
}

function toggleDisplay(element) {
    const monPos = Array.from(element.parentNode.children).indexOf(element)
        if (monPos >= pageStart && monPos <= pageEnd) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
}

function showFifty() {
    const monAll = document.querySelectorAll(".monster-page");
    monAll.forEach(toggleDisplay)
}


/**************** Initial Render ****************/
//Make Form
createMonsterForm()
//Get monsters
renderPage()


