const checkbox = document.getElementById('conf');
const dni_disc= document.getElementById('dni_disc');
const dni_repre= document.getElementById('dni_repre');
const divValidadorDisc= document.getElementById('divValidadorDisc');
const num_certi= document.getElementById('num_certi');
const divValidadorCertificado = document.getElementById('divValidadorCertificado');
const divValidContacto = document.getElementById('divValidContacto');
const tel_contacto=document.getElementById('tel_contacto');
const nom_disc=document.getElementById('nom_disc');
const sexoDisc=document.getElementById('sexoDisc');
const direcDisc=document.getElementById('direcDisc');
const imagen1=document.getElementById('imagen1');
const fechaEmiCert=document.getElementById('fechaEmiCert');
const imagen3=document.getElementById('imagen3');
const imagen4=document.getElementById('imagen4');
const imagen5=document.getElementById('imagen5');
const correo_contacto=document.getElementById('correo_contacto');
const formulario=document.getElementById('formulario');

document.addEventListener('DOMContentLoaded', (event) => {
    verificarCheckbox();
});

function verificarCheckbox() {
    const miModal = new bootstrap.Modal(document.getElementsByClassName("modal")[0]);
    //const modal=document.getElementById('staticBackdrop');
    if (checkbox.checked) {
        miModal.show();
    }
}
const botonCierre=document.getElementById("boton_cierre");
botonCierre.addEventListener("click",()=>{
    if(checkbox.checked){
        checkbox.checked=false;
    }
});



dni_disc.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
       consumir1();
    }
});
dni_repre.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
       consumir2();
    }
});

function mostrarImagen(event, imgId, containerId) {
    const file = event.target.files[0]; 
    const reader = new FileReader(); 

    reader.onload = function (e) {
        const img = document.getElementById(imgId);
        img.src = e.target.result; 
        img.style.display = 'block'; 

        const container = document.getElementById(containerId);
        container.style.display = 'block'; 
    };

    if (file) {
        reader.readAsDataURL(file); 
    }
}




function consumir1() {
    const dni = document.getElementById("dni_disc").value;
    fetch(`/api/dni?numero=${dni}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.getElementById("dis_ape_paterno").value = data.apellidoPaterno;
                document.getElementById("nom_disc").value = data.nombres;
                document.getElementById("dis_ape_materno").value = data.apellidoMaterno;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });

}

function consumir2() {
    const dni = document.getElementById("dni_repre").value;
    fetch(`/api/dni?numero=${dni}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.getElementById("repre_apll_pat").value = data.apellidoPaterno;
                document.getElementById("repre_nom").value = data.nombres;
                document.getElementById("repre_apll_mat").value = data.apellidoMaterno;
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });

}



function toggleRepresentante() {
    const representante = document.getElementById('representante').value;
    const representanteInfo = document.querySelectorAll('.representante-info');
    const inputs = document.querySelectorAll('.form-repre .agrupador-cuadros input');
    
    if (representante === 'SI') {
        representanteInfo.forEach(div => {
        div.style.display = 'block'; 
        });
    } else {
        representanteInfo.forEach(div => {
        div.style.display = 'none';
        });
    
        // Limpiar los valores de los inputs
        inputs.forEach(input => {
        input.value = "";
        });
    }
}
function validarFormulario() {
    let verificacion = false; // Supone inicialmente que todo es válido.

    // Validación de los campos relacionados con "disc"
    if (dni_disc.value.length === 0 || nom_disc.value.length === 0 || 
        sexoDisc.value.length === 0 || direcDisc.value.length === 0 || 
        imagen1.files.length === 0) {
        divValidadorDisc.style.display = 'block';

    } else {
        divValidadorDisc.style.display = 'none';
    }

    // Validación de los campos relacionados con "certificado"
    if (num_certi.value.length === 0 || fechaEmiCert.value === "" || 
        imagen4.files.length === 0 || imagen3.files.length === 0 || 
        imagen5.files.length === 0) {
        divValidadorCertificado.style.display = 'block';
 
    } else {
        divValidadorCertificado.style.display = 'none';
    }

    // Validación de los campos de contacto
    if (tel_contacto.value.length === 0 || correo_contacto.value.length === 0) {
        divValidContacto.style.display = 'block';
 
    } else {
        divValidContacto.style.display = 'none';
    }

    // Si verificación es false, el formulario no se enviará.
    return verificacion;
}



  formulario.addEventListener('submit', function(event) {
    let formularioValido = true;
    let primerDivInvalido = null; // Para almacenar el primer div a mostrar

    // Validación de "disc"
    if (dni_disc.value.length === 0 || nom_disc.value.length === 0 || 
        sexoDisc.value.length === 0 || direcDisc.value.length === 0 || 
        imagen1.files.length === 0) {
        divValidadorDisc.style.display = 'block';
        if (!primerDivInvalido) primerDivInvalido = divValidadorDisc; // Registra el primer div
        formularioValido = false;
    } else {
        divValidadorDisc.style.display = 'none';
    }

    // Validación de contacto
    if (tel_contacto.value.length === 0 || correo_contacto.value.length === 0) {
        divValidContacto.style.display = 'block';
        if (!primerDivInvalido) primerDivInvalido = divValidContacto; // Registra el primer div
        formularioValido = false;
    } else {
        divValidContacto.style.display = 'none';
    }

    // Validación de certificado
    if (num_certi.value.length === 0 || fechaEmiCert.value === "" || 
        imagen4.files.length === 0 || imagen3.files.length === 0 || 
        imagen5.files.length === 0) {
        divValidadorCertificado.style.display = 'block';
        if (!primerDivInvalido) primerDivInvalido = divValidadorCertificado; // Registra el primer div
        formularioValido = false;
    } else {
        divValidadorCertificado.style.display = 'none';
    }
    

    if (fechaEmiCert.value !== "") {
        const fechaIngresada = new Date(fechaEmiCert.value); // Convertimos la cadena a una fecha
        const hoy = new Date();

        // Ignoramos la hora estableciendo las fechas a solo año, mes y día
        fechaIngresada.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (fechaIngresada >= hoy) {
            // Si la fecha no es anterior a hoy, pintamos el borde rojo
            fechaEmiCert.style.border = "2px solid red";
        } else {
            // Quitamos el borde rojo si la fecha es válida
            fechaEmiCert.style.border = "";
        }
    }

    // Si el formulario no es válido, desplazarse al primer div
    if (!formularioValido) {
        event.preventDefault();
        if (primerDivInvalido) {
            const elementPosition = primerDivInvalido.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 200; // Ajuste de 200px hacia arriba

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});




