let imagenValue= document.getElementById("inputImg");
let boton= document.getElementById("confirmar");

//-----------------------Mostrar los datos que estén guardados al cerrar y abrir de nuevo el navegador----------------------------------------

document.addEventListener("DOMContentLoaded", function (e){

    let nuevoPerfil= localStorage.getItem("perfil")

    if(nuevoPerfil){
        nuevoPerfil=JSON.parse(nuevoPerfil);

        document.getElementById("nombre").value= nuevoPerfil.name;
        document.getElementById("apellido").value= nuevoPerfil.ape;
        document.getElementById("email").value= nuevoPerfil.email;
        document.getElementById("inputImg").value= nuevoPerfil.avatar;
        document.getElementById("telefono").value= nuevoPerfil.tel;
        document.getElementById("edad").value= nuevoPerfil.edad;

        if(nuevoPerfil.avatar!=""){

            document.getElementById("imagenDePerfil").src= nuevoPerfil.avatar;
        }
    }

    //-------------------------------validación de los input completo para guardar nuevo perfil------------------------------------------
    boton.addEventListener("click", function(e){


    let nombre= document.getElementById("nombre");
    let apellido= document.getElementById("apellido");
    let email= document.getElementById("email");
    let telefono= document.getElementById("telefono");
    let edad= document.getElementById("edad");


    let validacion= true;

    if(nombre.value.trim()===""){
        validacion=false
        nombre.classList.add("is-invalid");
    }

    if(apellido.value.trim()===""){
        validacion=false
        apellido.classList.add("is-invalid");
    }

    if(email.value.trim()===""){
        validacion=false
        email.classList.add("is-invalid");
    }

    if(telefono.value.trim()===""){
        validacion=false
        telefono.classList.add("is-invalid");
    }

    if(edad.value.trim()===""){
        validacion=false
        edad.classList.add("is-invalid");
    }

    if(validacion){
        localStorage.setItem(
            "perfil", JSON.stringify({

                name: nombre.value,
                ape: apellido.value,
                email:email.value,
                avatar: imagenValue.value,
                tel: telefono.value,
                edad:edad.value
            })
        );
        window.location="my-profile.html";
}
})
})

//------------------------------------validación de los campos de los inputs-----------------------------------------------------------------

document.getElementById("nombre").addEventListener("input", function valid(e) {


    nombre.classList.remove("is-invalid");
    nombre.classList.add("is-valid");
});

document.getElementById("apellido").addEventListener("input", function valid(e) {


    apellido.classList.remove("is-invalid");
    apellido.classList.add("is-valid");
});
document.getElementById("email").addEventListener("input", function valid(e) {


    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
});

document.getElementById("edad").addEventListener("input", function valid(e) {


    edad.classList.remove("is-invalid");
    edad.classList.add("is-valid");
});
document.getElementById("telefono").addEventListener("input", function valid(e) {


    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
});

