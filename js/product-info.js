//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var product = {};
var commentsArray = [];


function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
        <div class="gallery">
                <img style="padding: 10px;" src="` + images + `" alt="">
            </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showProductComment(commentsArray) {
    let comments = "<hr>";
    commentsArray.forEach(function(comment){ 
    
    let puntos="";
    
    
    comments+= ` <strong> ${comment.user} dice: </strong>
    <p>${comment.description}</p>
    <em style="color:black;"> Calificación: ${comment.score}</em><br>
    <sub>${comment.dateTime}</sub><br><br>`
    ;


    for (let i=1; i<= comment.score; i++){
        puntos+= `<span class="fa fa-star checked"></span>`;
    }

    for (let i=comment.score +1; i<=5; i++){
        puntos+=`<span class="fa fa-star"></span>`;
    }
    
    comments+= `<div style="text-align:right;"> ${puntos}</div><br><hr>`;

    }) ;

        document.getElementById("comentarios").innerHTML = comments;
    
    }



    function checkedStars(){
        let estrellitas=document.getElementsByName("rating");

        for (let i=0; i<= estrellitas.length;i++){
            if (estrellitas[i].checked){
                return estrellitas[i].value
            }
        }
    }
     
     
    

 


document.addEventListener("DOMContentLoaded", function (e) {

    let usuarioLogueado = localStorage.getItem('Usuario');
    if (usuarioLogueado) {
        document.getElementById("nuevoComentario").style = "display:inline-block;"
    }

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {//mostrar info objeto

        if (resultObj.status === "ok") {
            product = resultObj.data;
           
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = '<strong>'+product.name+'</strong>';
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.currency + ' ' + product.cost;
            //Muestro las imagenes
            showImagesGallery(product.images);
        }
    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {//mostrar comentarios json

        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showProductComment(commentsArray);
        }

    });
   
 
   document.getElementById("EnviarComment").addEventListener("click", function (e) {
    let now= new Date();       //aca declaro la variable de la fecha
    let dateTime =`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}  `;
    dateTime+=`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let nuevoComent = {
            score: parseInt(checkedStars()),//parseInt(document.getElementById('nuevaCalificacion').value),
            description: document.getElementById('newComment').value,
            user: JSON.parse(localStorage.getItem('Usuario')).email,
            dateTime:dateTime
           
     };

        commentsArray.push(nuevoComent);
        showProductComment(commentsArray); //mostrar comentarios con el nuevo comentario

    });
    });

