var product = {};
var commentsArray = [];


function showProductInfoAndComments(product, commentsArray) {

    let htmlContentToAppend = "";
    let imgs="";
    let comments="<hr>";



    htmlContentToAppend+= `
                           <h2> ${product.name}</h2>
                           <p>${product.description}</p><br>
                           <p>${product.soldCount}</p><br>
                           <p>${product.category}</p><br>
                           <p>${product.currency+product.cost}</p><br>
                           <p>${product.dateTime}</p><br>`;

                           imgs+=`
                           <img class="img" src="${product.images[0]}" width="100px" height="150px">
                           <img class="img" src="${product.images[1]}" width="100px" height="150px">
                           <img class="img" src="${product.images[2]}" width="100px" height="150px">
                           <img class="img" src="${product.images[3]}" width="100px" height="150px">
                           <img class="img" src="${product.images[4]}" width="100px" height="150px">
                           `;

        commentsArray.forEach(function(comment){
            let puntos="";
        
            comments+=`   
            <strong>${comment.user}</strong><br>
            <p>${comment.description}</p>
            <p>${comment.score}</p>
            <p>${comment.dateTime}</p>
            
            `;
            for (let i = 1; i <= comment.score; i++) {
                puntos += `<span class"fa fa-star checked"><span>`;
            }
            for (let i = comment.score + 1; i <= 5; i++) {
                puntos += `<span class"fa fa-star"><span>`;
            }
            comments += `<p>${comment.dateTime}</p>`;
            comments += `<div>${puntos}</div>`;
        
        
        });

        document.getElementById("productImagesGallery").innerHTML = imgs;
        document.getElementById("product-inf").innerHTML = htmlContentToAppend;
        document.getElementById("comentarios").innerHTML = comments;
    }





    document.addEventListener("DOMContentLoaded", function (e) {

        let usuarioLogueado = localStorage.getItem('Usuario');
        if (usuarioLogueado) {
            document.getElementById("nuevoComentario").style = "display:inline-block;"
        }
        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {//mostrar info objeto

            if (resultObj.status === "ok") {
                product = resultObj.data;
               
               
                showProductInfoAndComments(product);
            }
        });
    
    
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {//mostrar comentario
    
            if (resultObj.status === "ok") {
                commentsArray = resultObj.data;
                showProductInfoAndComments(commentsArray);
            }
    
        });
       
     
       document.getElementById("EnviarComment").addEventListener("click", function (e) {
        let now= new Date();       //aca declaro la variable de la fecha
        let dateTime =`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        dateTime+=`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    
            let nuevoComent = {
                score: parseInt(document.getElementById('nuevaCalificacion').value),
                description: document.getElementById('newComment').value,
                user: JSON.parse(localStorage.getItem('Usuario')).email,
                dateTime:dateTime
                //time: document.getElementById("time").innerHTML=h+`:`+m+`:`+s
         };
    
            commentsArray.push(nuevoComent);
            showProductInfoAndComments(product,commentsArray); //mostrar comentarios con el nuevo comentario
    
        });
    });
    
        