
function bool(valor,tiempo){
    return function(valor,tiempo){
        return new Promise((resolve, reject) =>{if(!valor){reject(new Error("error"));return;}
                                                 setTimeout(resolve,tiempo,"exito");
                });
    }(valor,tiempo);

}
console.log("antes")
bool(false,2000).then(console.log,console.error);
console.log("despues")