//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var arrayProducts = [];

let boton = document.getElementById('botonMetodo');
var form = document.getElementById('formulario');

var botonPago = document.getElementById('botonDePago');
var botonModal = document.getElementById('submit'); //confirmar//
var botonSubmitModal = document.getElementById('continuar'); //continuar//

var botonComprar = document.getElementById("comprar");

var calle = document.getElementById("dire");
var num = document.getElementById("numeroEnvio");
var esquina = document.getElementById("esqEnvio");
var paisito = document.getElementById("pais");
var alerta = document.getElementById("popUp");

var formaDePago = document.getElementsByName("pago");


var inputBancoItauNumero = document.getElementById("bancoI");
var inputBancoItauNombre = document.getElementById("bancoITitular");

var inputNumeroMastercard = document.getElementById("numeroMastercard");
var inputFechaMastercard = document.getElementById("vencimientoMastercard");
var inputCodigoMastercard = document.getElementById("codigoMastercard");






function showDiv() {

    document.getElementById("formularioDireccion").style.display = "block";
}




//------------------------------------------funcion Total------------------------------------------------------
function Total() {
    let total = 0;

    let cantidadSubtotal = document.getElementsByClassName("subtotal")

    for (let i = 0; i < cantidadSubtotal.length; i++) {
        total += parseInt(cantidadSubtotal[i].innerHTML);
    }

    document.getElementById("totalPrecio").innerHTML = total;
    calcularEnvio();
}


//------------------------------------------funcion subTotal SIN envío------------------------------------------------------
function calculoSub(unitCost, i) {
    let cant = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = cant * unitCost;
    document.getElementById(`subTotalProd${i}`).innerHTML = subTot;

    Total();

}

//----------------------------------------funcion de cambio de moneda-----------------------------------------------------------
function currencyChange(currency, unitCost) {

    if (currency === "UYU") {
        return unitCost / 40;
    } else {
        return unitCost
    }
}
//---------------------------------------mostrar productos función--------------------------------------------------------------
function showProducts(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let articles = array[i];
        let costDolar = currencyChange(articles.currency, articles.unitCost);
        let subTotal = costDolar * articles.count;
        contenido +=
            `
        <tr>
        <td><img src='${articles.src}' width="170px"></td>
        <td>${articles.name}</td>
        <td><input style="width:60px;" onchange="calculoSub(${costDolar},${i})" type="number" id="cantidad${i}" value="${articles.count}" required min="1"></td>
        <td>USD</td>
        <td>${subTotal}</td>
        <td><span id="subTotalProd${i}" class="subtotal" style="font-weight:bold;"> ${subTotal}</span></td>
        <td><button class="btn btn-danger" onclick="eliminar(i)"> x </button></td>
        </tr>
        `
        document.getElementById("listado").innerHTML = contenido;
    }
    Total();

}

/*
function validacionCompraCantidad(){
    let costoenvio= parseInt.document.getElementById("costoEnvio").innerHTML;
    let totalPrecio=parseInt.document.getElementById("totalPrecio").innerHTML;
    validacionCompra=true;

    if(costoenvio==0 && (totalPrecio==0)){
        validacionCompra=false;
       botonComprar.classList.add('disabled');
    }
   else {
       validacionCompra=true;
       botonComprar.classList.remove('disabled');
       botonComprar.classList.add('enabled');
   }
   return validacionCompra;
}

*/




//-------------------------------------------------funcion calcular porcentaje de envio--------------------------------------------------

function calcularEnvio() {
    let totalEnvio = 0;
    let total = parseInt(document.getElementById("totalPrecio").innerHTML);
    let envio;
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }
    porcentajeEnvio = (total * envio) / 100;
    totalEnvio = total + porcentajeEnvio;
    let contenido = `
    

    <tr>
    <td> USD ${porcentajeEnvio}</td>
    </tr>
     
    `
    let contenidoEnvio = `
    <tr>
    <td>  USD ${totalEnvio}</td>
    </tr>
    `

    document.getElementById("costoEnvio").innerHTML = contenido;
    document.getElementById("totalPrecio").innerHTML = contenidoEnvio;
}


function validacionDePago() {


    let pagoChecked = true;


    for (var i = 0; i < formaDePago.length; i++) {

        if (formaDePago[i].checked && (formaDePago[i].value) == "1") {

            if (inputBancoItauNumero.value.trim() == "") {
                pagoChecked = false;
                inputBancoItauNumero.classList.add('is-invalid');
            }
            if (inputBancoItauNombre.value.trim() == "") {
                pagoChecked = false;
                inputBancoItauNombre.classList.add('is-invalid');
            }

        } else if (formaDePago[i].checked && (formaDePago[i].value) == "2") {

            if (inputNumeroMastercard.value.trim() == "") {
                pagoChecked = false;
                inputNumeroMastercard.classList.add('is-invalid');
            }
            if (inputFechaMastercard.value.trim() == "") {
                pagoChecked = false;
                inputFechaMastercard.classList.add('is-invalid');
            }
            if (inputCodigoMastercard.value.trim() == "") {
                pagoChecked = false;
                inputCodigoMastercard.classList.add('is-invalid');
            }
            botonSubmitModal.classList.remove('enabled')
            botonSubmitModal.classList.add('disabled');
            document.getElementById('alertaRoja').classList.remove('d-none');
            document.getElementById('alertaRoja').classList.add('d-block');
        }



    } if (pagoChecked) {
        botonSubmitModal.classList.remove('disabled')
        botonSubmitModal.classList.add('enabled');
        document.getElementById('alertaRoja').classList.remove('d-block');
        document.getElementById('alertaRoja').classList.add('d-none');
        document.getElementById('alertaVerde').classList.remove('d-none');
        document.getElementById('alertaVerde').classList.add('d-block');
        localStorage.setItem('CompraExitosa', 10);



    }
    document.getElementById('alertaRoja').classList.remove('d-none');
    document.getElementById('alertaRoja').classList.add('d-block');
};


function eliminar(i){
    if(arrayProducts.length > 1){
        arrayProducts.splice(i,1);
            showProducts(arrayProducts);
    } else{
        document.getElementById("listado").innerHTML=`
        <h2> No hay productos en el carrito</h2>
        <p> Agregue alguno desde el listado de <a href="products.html">productos</a></p>`;
    
    }
    }






document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) { //carrito con dos productos link
        if (resultObj.status === "ok") {
            arrayProducts = resultObj.data.articles;
            showProducts(arrayProducts);

            Total();


        }
    });

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {

            Total();



        });
    }



    boton.addEventListener("click", function (e) {

        let validacion = true;

        if (calle.value.trim() === "") {
            validacion = false
            calle.classList.add("is-invalid");
        }

        if (num.value.trim() === "") {
            validacion = false
            num.classList.add("is-invalid");
        }

        if (esquina.value.trim() === "") {
            validacion = false
            esquina.classList.add("is-invalid");
        }

        if (paisito.value.trim() === "") {
            validacion = false
            paisito.classList.add("is-invalid");
        }
        if (validacion) {
            botonPago.classList.remove('disabled');
            botonPago.classList.add('enabled');
            botonPago.classList.remove('btn-secondary')
            botonPago.classList.add('btn-success');
            alerta.classList.remove('alert');
            alerta.style.display = "none";
        }
    });
});


botonModal.addEventListener("click", function (e) {
    validacionDePago();
})


botonSubmitModal.addEventListener("click", function (e) {

    $("#modalPagar").trigger('click');
    $("#modalcompraExitosa").modal('show');

})

document.getElementById("pais").addEventListener("input", function valid(e) {


    paisito.classList.remove("is-invalid");
    paisito.classList.add("is-valid");
});

document.getElementById("dire").addEventListener("input", function valid(e) {


    calle.classList.remove("is-invalid");
    calle.classList.add("is-valid");
});

document.getElementById("numeroEnvio").addEventListener("input", function valid(e) {


    num.classList.remove("is-invalid");
    num.classList.add("is-valid");
});
document.getElementById("esqEnvio").addEventListener("input", function valid(e) {


    esquina.classList.remove("is-invalid");
    esquina.classList.add("is-valid");
});



document.getElementById("bancoI").addEventListener("input", function valid(e) {
    inputBancoItauNumero.classList.remove("is-invalid");
    inputBancoItauNumero.classList.add("is-valid");
});

document.getElementById("bancoITitular").addEventListener("input", function valid(e) {
    inputBancoItauNombre.classList.remove("is-invalid");
    inputBancoItauNombre.classList.add("is-valid");
});

document.getElementById("numeroMastercard").addEventListener("input", function valid(e) {
    inputNumeroMastercard.classList.remove("is-invalid");
    inputNumeroMastercard.classList.add("is-valid");
});



document.getElementById("vencimientoMastercard").addEventListener("input", function valid(e) {
    inputFechaMastercard.classList.remove("is-invalid");
    inputFechaMastercard.classList.add("is-valid");
});

document.getElementById("codigoMastercard").addEventListener("input", function valid(e) {
    inputCodigoMastercard.classList.remove("is-invalid");
    inputCodigoMastercard.classList.add("is-valid");
});

document.getElementById("cerrandomodalExito").addEventListener("click", function(e){
    window.location="cover.html";
})

document.getElementById("comprarMas").addEventListener("click", function(e){
    window.location="products.html";
})






