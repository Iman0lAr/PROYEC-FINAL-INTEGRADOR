
const formularioUpdate = document.getElementById('formularioUpdate');


function prueba(){
    console.log("largo de inforrrpe "+inforrepre.length);
      console.log("largo de content inofr "+contentInputRepres.length);
}
formularioUpdate.addEventListener('submit', function (event) {
    let formularioValido = true;
    let primerDivInvalido = null; // Para almacenar el primer div a mostrar
    let validRepre = false;
    let certTramVal = false;
    let discValida=false;
  
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
    //validacion repre
    if (validRepre) {
 
        for (let a = 0; a < inforrepre.length; a++) {
         
            if (inforrepre[a].value.length === 0) {

                divValidadorRepre.style.display = 'block';
                if (!primerDivInvalido)
                    primerDivInvalido = divValidadorRepre;
                formularioValido = false;
                contentInputRepres[a].style.border = '3px solid red';
            } else {
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


    if (num_certi.value.length === 0 || fechaEmiCert.value === "" 
           ) {
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
            contentFechaCert.style.border = '1px solid black';
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

function cambiar2(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        if (content.classList.contains('d-none')) {
            content.classList.remove('d-none'); // Elimina la clase d-none
        }else{
            content.style.display='flex';
        }
    } else {
        console.error(`Elemento con ID "${contentId}" no encontrado.`);
    }
}
