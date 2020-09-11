const ORDER_ASC_BY_PRICE= "price>PRICE";
const ORDER_DESC_BY_PRICE= "PRICE>price";
const ORDER_DESC_BY_RELEVANCE= "productSoldCountMin>productSoldCountMax";
//agreguè constantes//

var productsArray = [];
var minCost = undefined;
var maxCost = undefined;
var buscar=undefined;


function sortProducts(criterio,array){
    let result=[];

    if (criterio=== ORDER_ASC_BY_PRICE){
        result= array.sort (function (a,b){
            if (a.cost<b.cost) {return -1;}
            if (a.cost>b.cost){return 1;}
            return 0;
        });
    } else if (criterio===ORDER_DESC_BY_PRICE){
        result= array.sort ( function (a,b){
                if(a.cost>b.cost) {return -1;}
                if (a.cost<b.cost) {return 1;}
                return 0;
            });
        } else if (criterio===ORDER_DESC_BY_RELEVANCE) {
            result=array.sort(function(a,b) {
                if (a.soldCount>b.soldCount) {return -1;}
                if(a.soldCount<b.soldCount) {return 1;}
                return 0;
            });
        }
        return result;

    }


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let resultSearch= product.name + product.description;
       
/*agreguè la lìnea 11 para entrega 2 punto 1*/
        if (((minCost == undefined) || (minCost!= undefined && parseInt(product.cost) >= minCost)) && ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {
if(buscar==undefined || resultSearch.toLowerCase().indexOf(buscar) != -1){ 
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail"> 
                </div>  
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + " : " + product.currency + " " + product.cost + " " + `</h4>
                        <p>` + product.description + `</p>
                        </div>
                       <small class="text-muted">` + product.soldCount + ` artículos</small>

                    </div>
                </div>
            </div>
        </div>
        `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}
}
-


 
  

    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;

                productsArray= sortProducts(ORDER_ASC_BY_PRICE, productsArray); //agreguè esto//

                showProductsList(productsArray);
            }
        });

//agregué los event listener para sort//
        document.getElementById("sortPriceAsc").addEventListener("click",function(){
            productsArray= sortProducts(ORDER_ASC_BY_PRICE,productsArray);

            showProductsList(productsArray); 
        });

        
        document.getElementById("sortPriceDesc").addEventListener("click",function(){
            productsArray= sortProducts(ORDER_DESC_BY_PRICE,productsArray);

            showProductsList(productsArray); 
        });

        
        document.getElementById("sortRelevanceDesc").addEventListener("click",function(){
            productsArray= sortProducts(ORDER_DESC_BY_RELEVANCE,productsArray);

            showProductsList(productsArray); 
        });


/* agregué desde lìnea 49 para filtrar y limpiar , entrega 2 punto1*/
document.getElementById("filtrar").addEventListener("click", function () {

    minCost = document.getElementById("min-range").value;
    maxCost = document.getElementById("max-range").value;

    if ((minCost != undefined) && (minCost != " ") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != " ") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList(productsArray);
});

document.getElementById("limpiar").addEventListener("click", function () {
    document.getElementById("min-range").value = " ";
    document.getElementById("max-range").value = " ";


    minCost=undefined;
    maxCost=undefined;

    showProductsList(productsArray);
 });
});

document.getElementById("buscador").addEventListener('input',function(){  
    buscar=document.getElementById("buscador").value.toLowerCase();
               showProductsList(productsArray);
})



document.getElementById("limpiarbuscador").addEventListener("click", function () {
    document.getElementById("buscador").value = " ";
    buscar=undefined;
    
    showProductsList(productsArray);

 });

 document.getElementById("buscador").style.backgroundColor = "lightblue";
 

 