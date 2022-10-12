let currentOffset = 0
let elementsPerPage = 3

let scrollDebounce


// const apiUrl = "https://breakingbadapi.com/api/"




function formatCharacter( character ) {
    return {
        id: character.char_id,
        name: character.name,
        nickname: character.nickname,
        image: character.img
    }
}

function displayCharacters( data ) {

    const formattedCharacters = data.map( formatCharacter ) 

    formattedCharacters.forEach( createAppendCharacter )

}


function openElement( event ) {
    const el = event.target
    const id = el.getAttribute("data-id")

    const url = new URL(window.location.href)
    const newUrl = `${url.protocol}//${url.hostname}:${url.port}/character.html?id=${id}`
    window.location.href = newUrl

}


function setupInteraction( element ) {
    element.addEventListener("click", openElement )
}


function createAppendCharacter( character ){
    
    const container = document.querySelector("#characters")
    
    const characterBox = createCharacterHTML(character)
    
    setupInteraction( characterBox ) 

    container.append(characterBox)
    
}

function createCharacterHTML( character ) {

    const model = document.querySelector(".character.model")
    const characterBox = model.cloneNode( true )
    characterBox.classList.remove("model")
    
    const nameBox =  characterBox.querySelector(".name")
    const nicknameBox =  characterBox.querySelector(".nickname")


    const img =  characterBox.querySelector(".image img")

    

    nameBox.innerHTML = character.name
    nicknameBox.innerHTML = character.nickname

    img.setAttribute("src", character.image )
    
    characterBox.setAttribute("data-id", character.id )

    // characterBox.append( textBox )
    // characterBox.append( nicknameBox )

    characterBox.classList.add("character")

    return characterBox

}


function loadMore() {

    doQuery("characters?limit="+elementsPerPage+"&offset="+currentOffset, displayCharacters )

    currentOffset += elementsPerPage

}


function setupPagination() {
    const btn = document.querySelector("#load-more")
    btn.addEventListener("click", loadMore )
}

function windowScroll() {

    if( ! scrollDebounce ) {

        scrollDebounce = setTimeout( function(){
            
            const container = document.querySelector("#characters")


            if( window.scrollY > container.clientHeight - window.innerHeight ) {
                loadMore()
            }

            scrollDebounce = null

        }, 300 )

    }

}


function setupInfiniteScroll() {
    window.addEventListener("scroll", windowScroll)
}


setupPagination()
setupInfiniteScroll()


// doQuery("characters?limit=6&offset="+currentOffset, displayCharacters )
loadMore()





console.log("Consulta API")