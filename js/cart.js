//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var arrayProducts=[];


//------------------------------------------funcion Total------------------------------------------------------
function Total(){
    let total= 0;

    let cantidadSubtotal = document.getElementsByClassName("subtotal")

    for(let i=0; i<cantidadSubtotal.length;i++){
        total+= parseInt(cantidadSubtotal[i].innerHTML);
    }

    document.getElementById("totalPrecio").innerHTML = total;
    calcularEnvio();
}


//------------------------------------------funcion subTotal SIN envío------------------------------------------------------
function calculoSub(unitCost,i){
    let cant = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = cant * unitCost;
    document.getElementById(`subTotalProd${i}`).innerHTML = subTot;

    Total();
    
}

//----------------------------------------funcion de cambio de moneda-----------------------------------------------------------
function currencyChange(currency,unitCost){
   
    if(currency==="UYU"){
        return unitCost/40;
    } else{
        return unitCost
    }
}
//---------------------------------------mostrar productos función--------------------------------------------------------------
function showProducts(array){
    let contenido="";

    for(let i=0; i<array.length;i++){
        let articles = array[i];
        let costDolar= currencyChange(articles.currency, articles.unitCost);
        let subTotal = costDolar* articles.count;
        contenido+=
        `
        <tr>
        <td><img src='${articles.src}' width="170px"></td>
        <td>${articles.name}</td>
        <td><input style="width:60px;" onchange="calculoSub(${ subTotal},${i})" type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>
        <td>USD</td>
        <td>${ subTotal}</td>
        <td><span id="subTotalProd${i}" class="subtotal" style="font-weight:bold;"> ${subTotal}</span></td>
        </tr>
        `
        document.getElementById("listado").innerHTML= contenido;
    }
    Total();
    
}
//-------------------------------------------------funcion calcular porcentaje de envio--------------------------------------------------

function calcularEnvio(){
    let totalEnvio=0;
    let total= parseInt(document.getElementById("totalPrecio").innerHTML);
    let envio;
    let elements= document.getElementsByName("envio");
    for (var i=0; i< elements.length; i++){
        if(elements[i].checked){
            envio=parseInt(elements[i].value);
        }
    }
    porcentajeEnvio=(total*envio)/100;
    totalEnvio= total+porcentajeEnvio;
    let contenido =`
    

    <tr>
    <td> USD ${porcentajeEnvio}</td>
    </tr>
     
    `
let contenidoEnvio= `
    <tr>
    <td>  USD ${totalEnvio}</td>
    </tr>
    `

    document.getElementById("costoEnvio").innerHTML= contenido;
    document.getElementById("totalPrecio").innerHTML=contenidoEnvio;
}

document.addEventListener("DOMContentLoaded", function(e){
let newProduct= localStorage.getItem('new-product');


    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){ //carrito con dos productos link
        if(resultObj.status==="ok"){
            arrayProducts = resultObj.data.articles;

            if(newProduct){
                let newArticle={
                    src: JSON.parse(localStorage.getItem('new-product')).image,
                    name: JSON.parse(localStorage.getItem('new-product')).name,
                    unitCost: JSON.parse(localStorage.getItem('new-product')).cost,                    
                    
                }
                arrayProducts.push(newArticle);
            }
            showProducts(arrayProducts);
            
            Total();
         
        
        }
    });
   
    let elements= document.getElementsByName("envio");
    for (var i=0; i < elements.length; i++){
        elements[i].addEventListener("change", function(){
         
            Total();
          

   
     });
    }
        
    })
