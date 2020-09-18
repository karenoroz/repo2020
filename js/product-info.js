//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var product = {};
var commentsArray = [];
var productsArray= [];
var array=[];
var relacionadosProdArray=[];




function showImagesGallery(array) {

    let htmlContentToAppend = "";

    let i = 0; i < array.length; i++ 
        let images = array[i];

        htmlContentToAppend += `
        <div id="productImagesGallery">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img style="padding: 10px;"src="${array[0]}" class="d-block w-100" alt="Onix bordó en marcha">
    </div>
    <div class="carousel-item">
      <img style="padding: 10px;"src="${array[1]}" class="d-block w-100" alt="Onix bordó Vista Frontal ">
    </div>
    <div class="carousel-item">
      <img style="padding: 10px;"src="${array[2]}" class="d-block w-100" alt="Vista en detalle ruedas Onix gris ">
    </div>
    <div class="carousel-item">
      <img style="padding: 10px;"src="${array[3]}" class="d-block w-100" alt="Onix gris en marcha">
    </div>
    <div class="carousel-item">
      <img style="padding: 10px;"src="${array[4]}" class="d-block w-100" alt=" onix bordó vista lateral">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>   
</div>     `
        

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
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
     
     
    function showRelatedproducts(array, relacionadosProdArray){
        let contenido='<hr>';
        relacionadosProdArray.forEach(function(i){
            contenido+='<strong>'+'Nombre: ' + array[i].name + '</strong>'+'<br>';
            contenido+='Descripcion: ' + array[i].description + '<br>';
            contenido+='Precio: ' + array[i].currency + array[i].cost + '<br>';
            contenido+='<div id="imagenRelacionados"><img style="width:190px; height:140px;" src="'+ array[i].imgSrc+'"></div><br>';
            contenido+='<a href="product-info.html"><button class="btn btn-secondary" style="float: right;">Ver producto</button> </a><br>';
    
        });
    document.getElementById("relatedProducts").innerHTML=contenido;
    }
    
    

 


document.addEventListener("DOMContentLoaded", function (e) {

    let usuarioLogueado = localStorage.getItem('Usuario');
    if (usuarioLogueado) {
        document.getElementById("nuevoComentario").style = "display:inline-block;"
    }

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {//mostrar info objeto

        if (resultObj.status === "ok") {
            product = resultObj.data;
            productsArray=resultObj.data;
           
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
            showRelatedproducts(productsArray, product.relatedProducts)
        }
    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {//mostrar comentarios json

        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showProductComment(commentsArray);
        }

    });
   
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status==="ok"){
            productsArray=resultObj.data;

            showRelatedproducts(productsArray, product.relatedProducts);
        }
    })
 
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

