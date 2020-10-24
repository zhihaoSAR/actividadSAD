
/*
 function iniTienda()
 {
    return new Promise(function(resolve, reject) {

        http = require('http')
        let consulta = {
            host: 'localhost',
            port: 9999,
            path: '/',
            method: 'GET'
        };
        
        let req = http.request(consulta, function(res) {
            alert("estoyaqui")
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                productos = JSON.parse(chunk)
                resultado = ""
                for(producto of productos)
                {
                    resultado+= "<li>"+producto.nombre+"<button onclick=javascript:comprar("+producto.id+")> comprar </button></li>"
                }
                resolve(resultado)
            });
        });
        req.end();
        });
 }



 iniTienda().then((res) => {
    alert(res)
    d=document.getElementById("tienda");
    d.innerHTML = res;
})
  */

 let xhr = new XMLHttpRequest();
 xhr.open('GET', "https://localhost:9999", true);
 xhr.send("/");



 xhr.onreadystatechange = processRequest;
 function processRequest(e) {
    alert(xhr.status)
    if (xhr.readyState == 4 && xhr.status == 200) {
        
    let response = JSON.parse(xhr.responseText)
    productos = JSON.parse(chunk)
    resultado = ""

    for(producto of productos)
    {
        resultado+= "<li>"+producto.nombre+"<button onclick=javascript:comprar("+producto.id+")> comprar </button></li>\n";
    }
    d=document.getElementById("tienda");
    d.innerHTML = res;
    }
     
}


