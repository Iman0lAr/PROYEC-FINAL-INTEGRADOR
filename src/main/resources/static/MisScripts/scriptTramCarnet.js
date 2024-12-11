const checkbox = document.getElementById('conf');
const divValidadorDisc = document.getElementById('divValidadorDisc');
const num_certi = document.getElementById('num_certi');
const divValidadorCertificado = document.getElementById('divValidadorCertificado');
const divValidContacto = document.getElementById('divValidContacto');
const tel_contacto = document.getElementById('tel_contacto');
const fechaEmiCert = document.getElementById('fechaEmiCert');
const imagen3 = document.getElementById('imagen3');
const imagen4 = document.getElementById('imagen4');
const imagen5 = document.getElementById('imagen5');
const correo_contacto = document.getElementById('correo_contacto');
const formulario = document.getElementById('formulario');

const contentInputValid = document.getElementsByClassName('contentInputValid');
const inputDisc = document.getElementsByClassName('inputDisc');

//Representante
const representante = document.getElementById('representante');
const dni_repre = document.getElementById('dni_repre');
const repre_nom = document.getElementById('repre_nom');
const repre_apll_pat = document.getElementById('repre_apll_pat');
const repre_apll_mat = document.getElementById('repre_apll_mat');
const sexoRpre = document.getElementById('sexoRpre');
const direcRepre = document.getElementById('direcRepre');
const deparRepre = document.getElementById('deparRepre');
const provRpre = document.getElementById('provRpre');
const distRepre = document.getElementById('distRepre');
const imagen2 = document.getElementById('imagen2');
const inforrepre = document.getElementsByClassName("infor-repre");
const representanteinfo = document.getElementsByClassName("representante-info");

const menCer = document.getElementById('menCer');
const menTramite = document.getElementById('menTramite');
const menFecha = document.getElementById('menFecha');

const divValidadorRepre = document.getElementById('divValidadorRepre');

//Discapacitado 
const dni_disc = document.getElementById('dni_disc');
const nom_disc = document.getElementById('nom_disc');
const sexoDisc = document.getElementById('sexoDisc');
const direcDisc = document.getElementById('direcDisc');
const imagen1 = document.getElementById('imagen1');
const dis_ape_paterno = document.getElementById('dis_ape_paterno');
const dis_ape_materno = document.getElementById('dis_ape_materno');
const departamentoDisc = document.getElementById('departamentoDisc');
const provinciaDisc = document.getElementById('provinciaDisc');
const distriDisc = document.getElementById('distriDisc');

const inputCertTramite = document.getElementsByClassName("inputCertTramite");
const contentInputCertTram = document.getElementsByClassName("contentInputCertTram");

const contentInputRepres = document.getElementsByClassName("contentInputRepres");
const contentFechaCert= document.getElementById('contentFechaCert');

document.addEventListener('DOMContentLoaded', (event) => {
    verificarCheckbox();
   

    const limitarLongitud = (input) => {
        input.value = input.value.slice(0, 8); // Limita a 8 caracteres
        input.value = input.value.replace(/\D/g, ''); // Permite solo números
    };
    
      const limitarLongitudCelular = (input) => {
        input.value = input.value.slice(0, 9); // Limita a 8 caracteres
        input.value = input.value.replace(/\D/g, ''); // Permite solo números
    };
    
    dni_repre.addEventListener('input', () => limitarLongitud(dni_repre));
    dni_disc.addEventListener('input', () => limitarLongitud(dni_disc));
    tel_contacto.addEventListener('input', () => limitarLongitudCelular(tel_contacto));
});


function verificarCheckbox() {
    const miModal = new bootstrap.Modal(document.getElementsByClassName("modal")[0]);
    //const modal=document.getElementById('staticBackdrop');
    if (checkbox.checked) {
        miModal.show();
    }
}
const botonCierre = document.getElementById("boton_cierre");
botonCierre.addEventListener("click", () => {
    if (checkbox.checked) {
        checkbox.checked = false;
    }
});



dni_disc.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        consumir1();
    }
});
dni_repre.addEventListener("keydown", function (event) {
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

function cambiar(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        content.style.display = 'flex';
    } else {
        console.error(`Elemento con ID "${contentId}" no encontrado.`);
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
    const contentImgRepre = document.getElementById("contentImgRepre");
    const imagenPrevia2 = document.getElementById("imagenPrevia2");

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
        contentImgRepre.style.display = 'none';
        
        for(let a=0;a<contentInputRepres.length;a++){
            contentInputRepres[a].style.border='1px solid black';
        }
    }
}


formulario.addEventListener('submit', function (event) {
    let formularioValido = true;
    let primerDivInvalido = null; // Para almacenar el primer div a mostrar
    let validRepre = false;
    let discValida = false;
    let certTramVal = false;

    // Validación de "disc"
    for (let i = 0; i < inputDisc.length; i++) {
        if (inputDisc[i].value.length === 0) {
            discValida = true;

            contentInputValid[i].style.border = '3px solid red';
        } else {
            contentInputValid[i].style.border = '1px solid black';
        }
    }

    if (discValida) {
        divValidadorDisc.style.display = 'block';
        if (!primerDivInvalido)
            primerDivInvalido = divValidadorDisc;
        formularioValido = false;
    } else {
        divValidadorDisc.style.display = 'none';
    }

    //Validacion repre
    if (representante.value === "SI") {

        for (let a = 0; a < inforrepre.length; a++) {

            if (inforrepre[a].value.length !== 0) {
                validRepre = true;
                break;
            }
        }

    }
    //calidacion repre
    if (validRepre) {
        console.log("antes del for")
        for (let a = 0; a < inforrepre.length; a++) {

            if (inforrepre[a].value.length === 0) {

                divValidadorRepre.style.display = 'block';
                if (!primerDivInvalido)
                    primerDivInvalido = divValidadorRepre;
                formularioValido = false;
                 contentInputRepres[a].style.border = '3px solid red';
            }else{
                 contentInputRepres[a].style.border = '1px solid black';
            }

        }
    } else {
        divValidadorRepre.style.display = 'none';
    }

    // Validación de contacto
    if (tel_contacto.value.length === 0 || correo_contacto.value.length === 0) {
        divValidContacto.style.display = 'block';
        if (!primerDivInvalido)
            primerDivInvalido = divValidContacto; // Registra el primer div
        formularioValido = false;
    } else {
        divValidContacto.style.display = 'none';
    }

    if (tel_contacto.value.length === 0) {
        document.getElementById("numCelContact").style.border = '3px solid red';
    } else {
        document.getElementById("numCelContact").style.border = '1px solid black';
    }

    if (correo_contacto.value.length === 0) {
        document.getElementById("correo").style.border = '3px solid red';
    } else {
        document.getElementById("correo").style.border = '1px solid black';
    }
    

    for (let u = 0; u < inputCertTramite.length; u++) {
        console.log("dentro del for");
        if (inputCertTramite[u].value.length === 0) {
            console.log("dentro del if");
            certTramVal = true;
            contentInputCertTram[u].style.border = '3px solid red';
        } else {
            contentInputCertTram[u].style.border = '1px solid black';
        }
    }

    // Validación de certificado
    if (certTramVal) {
        divValidadorCertificado.style.display = 'block';
        if (!primerDivInvalido)
            primerDivInvalido = divValidadorCertificado; // Registra el primer div
        formularioValido = false;
    } else {
        divValidadorCertificado.style.display = 'none';
    }


    if (imagen5.files.length === 0) {
        menTramite.style.display = 'inline';
    } else {
        menTramite.style.display = 'none';
    }

    if (num_certi.value.length === 0 || fechaEmiCert.value === "" ||
            imagen4.files.length === 0 || imagen3.files.length === 0) {
        menCer.style.display = 'inline';
    } else {
        menCer.style.display = 'none';
    }


    if (fechaEmiCert.value !== "") {
        const fechaIngresada = new Date(fechaEmiCert.value); // Convertimos la cadena a una fecha
        const hoy = new Date();

        // Ignoramos la hora estableciendo las fechas a solo año, mes y día
        fechaIngresada.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (fechaIngresada >= hoy) {
            divValidadorCertificado.style.display = 'block';
            if (!primerDivInvalido)
                primerDivInvalido = divValidadorCertificado;
            formularioValido = false;
            menFecha.style.display = 'inline';
            contentFechaCert.style.border = '3px solid red';
        } else {
            contentFechaCert.style.border = '1px solid red';
            menFecha.style.display = 'none';
        }
    }



    // Si el formulario no es válido, desplazarse al primer div
    if (!formularioValido) {
        event.preventDefault();
        if (primerDivInvalido) {
            const elementPosition = primerDivInvalido.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 80; 

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});


