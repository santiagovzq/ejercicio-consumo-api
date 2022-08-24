const apiUrl = "https://breakingbadapi.com/api/"

// const fakeQuotes = [
//     {
//         quote: "Ea anim aute ut commodo ut magna reprehenderit commodo aliquip ipsum.",
//         author: "Nombre de autor 1",
//         id: 1
//     },
//     {
//         quote: "Magna cupidatat duis labore reprehenderit.",
//         author: "Nombre de autor 2",
//         id: 2
//     },
//     {
//         quote: "Magna esse ullamco excepteur id id velit occaecat cillum occaecat anim incididunt ad ad veniam.",
//         author: "Nombre de autor 3",
//         id: 3
//     },
//     {
//         quote: "Nostrud sint dolore elit amet Lorem aliquip eiusmod velit do ea.",
//         author: "Nombre de autor 4",
//         id: 4
//     },
//     {
//         quote: "Do qui irure consectetur dolore sit nostrud Lorem qui est laborum do id eu.",
//         author: "Nombre de autor 5",
//         id: 5
//     }
// ]

function doQuery( url, displayFunction ) {
    // Mandamos una solicitud y obtenemos una promesa
    const request = fetch(apiUrl + url)

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

doQuery()

function formatQuote( quote ) {
    return {
        id: quote.quote_id,
        text: quote.quote,
        author: quote.author,
    }
}

function displayQuotes( data ) {
    console.log("display", data);

    const formattedQuotes = data.map( formatQuote )
    formattedQuotes.forEach(createAppendQuote)
}

function createAppendQuote( quote ) {
    const body = document.querySelector("body")
    const quoteBox = createQuoteHTML( quote )
    body.append( quoteBox)
}

function createQuoteHTML( quote ) {
    const quoteBox = document.createElement("blockquote")
    const textBox = document.createElement("p")
    const authorBox = document.createElement("p")

    textBox.classList.add("text")
    authorBox.classList.add("author")
    
    textBox.innerHTML = quote.text
    authorBox.innerHTML = quote.author

    quoteBox.setAttribute("data-id", quote.id)

    quoteBox.append( textBox )
    quoteBox.append( authorBox )

    quoteBox.classList.add("quote")

    return quoteBox
}

doQuery("quotes", displayQuotes)
doQuery("characters")
doQuery("episodes")

console.log("Consulta API")