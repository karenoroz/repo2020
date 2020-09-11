//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var productInfo = {};


function showProductInfo(array) {


         let infoContent = "";
    
        for(let i = 0; i < array.length; i++){
            let product= array[i];
   
     
            infoContent += `
            <div class="row text-center text-lg-left pt-2" id="productImagesGallery">
                   <img src="` + product.images + `">
                </div>
            </div>
            `
    
            document.getElementById("product-info container").innerHTML = infoContent;
        }
    }


             



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_INFO_URL).then(function (resultObj) {
       
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;


            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("category");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
        showProductInfo(productInfo);
        }
    });
});

