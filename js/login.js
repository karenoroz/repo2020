//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("submitButton").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add('invalid');
            camposCompletos = false;
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add('invalid');
            camposCompletos = false;
        }

        if (camposCompletos) {
            localStorage.setItem('Usuario', JSON.stringify({ email: inputEmail.value }));
          
        } else {
            alert('Debes ingresar los datos!')
        }
    });
});

