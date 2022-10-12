const apiUrl = "https://breakingbadapi.com/api/"



function doQuery( url, displayFunction ){
 
    // mandamos una solicitud y obtenemos una promesa
    const request = fetch( apiUrl + url )


    // esperar a que resuelva la promesa
    request.then( function(response) {

        // info sobre nuestra respuesta
        console.log("response", response)

        // extraer 'cuerpo' de respuesta
        response.json().then( function(data) {
            console.log("data", data)

            if( typeof displayFunction == "function" ) {                
                displayFunction( data )
            }

        })
        
    })

    console.log( "request", request )

}


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

    formattedQuotes.forEach( createAppendQuote )

}

function createAppendQuote( quote ){
    
    const body = document.querySelector("body")
    
    const quoteBox = createQuoteHTML(quote)
    
    body.append(quoteBox)
    
}

function createQuoteHTML( quote ) {

    const quoteBox = document.createElement("blockquote")
    const textBox =  document.createElement("p")
    const authorBox =  document.createElement("p")

    textBox.classList.add("text")
    authorBox.classList.add("author")

    textBox.innerHTML = quote.text
    authorBox.innerHTML = quote.author

    quoteBox.setAttribute("data-id", quote.id )

    quoteBox.append( textBox )
    quoteBox.append( authorBox )

    quoteBox.classList.add("quote")

    return quoteBox

}




doQuery("quotes", displayQuotes )
doQuery("characters")
doQuery("episodes")




console.log("Consulta API")