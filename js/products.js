var productsArray = []; 

function showProductsList(array) {  

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i]; 

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
       

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}
-

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL ).then(function (resultObj) {  
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;  
           
            showProductsList(productsArray); 
        }
    });
});
