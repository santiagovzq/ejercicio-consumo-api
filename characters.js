const apiUrl = "https://breakingbadapi.com/api/"

// const fakeCharacters = [
//     {
//         character: "Ea anim aute ut commodo ut magna reprehenderit commodo aliquip ipsum.",
//         nickname: "Nombre de autor 1",
//         id: 1
//     },
//     {
//         character: "Magna cupidatat duis labore reprehenderit.",
//         nickname: "Nombre de autor 2",
//         id: 2
//     },
//     {
//         character: "Magna esse ullamco excepteur id id velit occaecat cillum occaecat anim incididunt ad ad veniam.",
//         nickname: "Nombre de autor 3",
//         id: 3
//     },
//     {
//         character: "Nostrud sint dolore elit amet Lorem aliquip eiusmod velit do ea.",
//         nickname: "Nombre de autor 4",
//         id: 4
//     },
//     {
//         character: "Do qui irure consectetur dolore sit nostrud Lorem qui est laborum do id eu.",
//         nickname: "Nombre de autor 5",
//         id: 5
//     }
// ]

let pageNum = 0
let elementsPerPage = 6

function doQuery({ 
    endpoint,
    displayFunction,
    pageNum,
    elementsPerPage,
}) {

    const offset = pageNum * elementsPerPage

    const queryString = `?limit=${elementsPerPage}&offset=${offset}`

    // Mandamos una solicitud y obtenemos una promesa
    const request = fetch(apiUrl + endpoint + queryString)

    // Esperar a que resuelva la promesa
    request.then(function(response) {
        // Info sobre la respuesta
        console.log("response", response)

        // Extraer 'cuerpo' de la respuesta
        response.json().then(function(data) {
            console.log("data", data)

            // Proteger código, si function es function ejecutar
            if(typeof displayFunction == "function") {
                displayFunction( data )
            }

        })
    })

    console.log("request", request)
}



function formatCharacter( character ) {
    return {
        id: character.char_id,
        name: character.name,
        nickname: character.nickname,
        image: character.img
    }
}

function displayCharacters( data ) {
    console.log("display", data);

    const formattedCharacters = data.map( formatCharacter )
    formattedCharacters.forEach(createAppendCharacter)
}

function openElement( event ) {
    const el = event.target
    console.log("id", el.getAttribute("data-id"))
}

function setupInteraction( element ) {
    element.addEventListener("click", openElement)
}

function createAppendCharacter( character ) {
    const container = document.querySelector("#characters")
    const characterBox = createCharacterHTML( character )
    setupInteraction( characterBox )
    container.append( characterBox)
}

function createCharacterHTML( character ) {

    const model = document.querySelector(".character.model")
    const characterBox = model.cloneNode( true )
    characterBox.classList.remove("model")
    
    const nameBox = characterBox.querySelector(".name")
    const nicknameBox = characterBox.querySelector(".nickname")

    const img = characterBox.querySelector(".image img");
   
    // const characterBox = document.createElement("article")
    // const textBox = document.createElement("p")
    // const nicknameBox = document.createElement("p")

    // textBox.classList.add("text")
    // nicknameBox.classList.add("nickname")
    
    nameBox.innerHTML = character.name
    nicknameBox.innerHTML = character.nickname

    img.setAttribute("src", character.image)
    characterBox.setAttribute("data-id", character.id)

    // characterBox.append( textBox )
    // characterBox.append( nicknameBox )

    characterBox.classList.add("character")

    return characterBox
}


function loadMore() {
    doQuery({
        endpoint:"characters", 
        pageNum,
        elementsPerPage,
        displayFunction: displayCharacters
    })
    pageNum++
}

function setupPagination() {
    const btn = document.querySelector("#load-more")
    btn.addEventListener("click", loadMore)
}

function windowScroll() {
    console.log("scroll y", window.scrollY, window.innerHeight)
    const container = document.querySelector("#characters")
    console.log("container height", container.clientHeight)
}

function setupInfiniteScroll() {
    window,addEventListener("scroll", windowScroll)
}

setupPagination()
setupInfiniteScroll()

loadMore()
// doQuery("characters?limit=6&offset="+pageNum, displayCharacters)
// doQuery("characters")
// doQuery("episodes")

console.log("Consulta API")