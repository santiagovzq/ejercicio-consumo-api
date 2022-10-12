const apiUrl = "https://breakingbadapi.com/api/"


function doQuery( url, displayFunction ){
 
    // mandamos una solicitud y obtenemos una promesa
    const request = fetch( apiUrl + url )


    // esperar a que resuelva la promesa
    request.then( function(response) {

        // info sobre nuestra respuesta

        // extraer 'cuerpo' de respuesta
        response.json().then( function(data) {

            if( typeof displayFunction == "function" ) {                
                displayFunction( data )
            }

        })
        
    })


}
