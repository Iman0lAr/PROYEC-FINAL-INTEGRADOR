const formProgramaContigo = document.getElementById("formProgramaContigo");
const checkbox = document.getElementById('conf');

//Discapacitado

const inputValid = document.getElementsByClassName("inputValid");
const contentInput = document.getElementsByClassName("contentInput");

const dni_repre = document.getElementById("dni_repre");
const dni_disc = document.getElementById("dni_disc");

const inputsRepre = document.getElementsByClassName("inputsRepre");
const cotentinputsRepre = document.getElementsByClassName("cotentinputsRepre");

const divValidadorDisc = document.getElementById("divValidadorDisc");
const divValidadorDrecc = document.getElementById("divValidadorDrecc");
const divValidadorRepre = document.getElementById("divValidadorRepre");
const divValidadoTramite = document.getElementById("divValidadoTramite");

const contentInputDirec = document.getElementsByClassName("contentInputDirec");
const inputValidDirec = document.getElementsByClassName("inputValidDirec");

const hoja1 = document.getElementById("hoja1");
const hoja2 = document.getElementById("hoja2");

const contentHoja1 = document.getElementById("contentHoja1");
const contentHoja2 = document.getElementById("contentHoja2");

const fechaNac = document.getElementById("fechaNac");
const contentFechaCert = document.getElementById("contentFechaCert");

const divValidaMenorDeEdad = document.getElementById("divValidaMenorDeEdad");

const contentVoluntad= document.getElementById("contentVoluntad");
const contentDifBanco= document.getElementById("contentDifBanco");

const contentFechaEmi= document.getElementById("contentFechaEmi");
const fechaEmision= document.getElementById("fechaEmision");





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
   // tel_contacto.addEventListener('input', () => limitarLongitudCelular(tel_contacto));
});




function verificarCheckbox() {
    const miModal = new bootstrap.Modal(document.getElementsByClassName("modal")[0]);
    //const modal=document.getElementById('staticBackdrop');
    if (checkbox.checked) {
        miModal.show();
    }
}







function probar() {
    for (let a = 0; a < inputValidDirec; a++) {
        console.log(inputValidDirec[a]);
    }
}

formProgramaContigo.addEventListener("submit", (event) => {

    let confirmacion = true;
    let primerContent = null;
    let validaRepre = false;
    let validacionDisc = false;
    let validDirecDisc = false;
    let validaHojas = false;
    let mostrarDivRpere = false;
    let validaMenor = false;

    let maniVoluntad = document.querySelectorAll('input[name="discapacitado.mani_voluntad"]:checked');
    let difiIrBanco = document.querySelectorAll('input[name="discapacitado.difi_ir_banco"]:checked');

    let mostrarDivValidaMenor = false;

    for (let a = 0; a < inputValid.length; a++) {
        if (inputValid[a].value.length === 0) {
            contentInput[a].style.border = '3px solid red';
            confirmacion = false;
            validacionDisc = true;

        } else {
            contentInput[a].style.border = '1px solid black';
        }
    }

    if (validacionDisc) {
        divValidadorDisc.style.display = 'block';
        if (!primerContent)
            primerContent = divValidadorDisc;
    } else {
        divValidadorDisc.style.display = 'none';
    }




    if (fechaNac.value !== "") {
        const fechaIngresada = new Date(fechaNac.value); // Convertimos la cadena a una fecha
        const hoy = new Date();

        // Ignoramos la hora estableciendo las fechas a solo año, mes y día
        fechaIngresada.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (fechaIngresada >= hoy) {

            if (!primerContent)
                primerContent = contentFechaCert;
            confirmacion = false;
            contentFechaCert.style.border = '3px solid red';
        } else {
            contentFechaCert.style.border = '1px solid red';
        }
    }



    for (let a = 0; a < inputValidDirec.length; a++) {

        if (inputValidDirec[a].value.length === 0) {
            validDirecDisc = true;
            break;
        }
    }

    if (validDirecDisc) {
        for (let a = 0; a < inputValidDirec.length; a++) {

            if (inputValidDirec[a].value.length === 0) {
                contentInputDirec[a].style.border = '3px solid red';
                if (!primerContent)
                    primerContent = divValidadorDrecc;
                confirmacion = false;
            } else {
                contentInputDirec[a].style.border = '1px solid black';

            }
        }
    } else {
        for (let a = 0; a < contentInputDirec.length; a++) {
            contentInputDirec[a].style.border = '1px solid black';
        }
    }

    if (maniVoluntad.length === 0) {
        validDirecDisc = true;
        if (!primerContent)
            primerContent = divValidadorDrecc;
        contentVoluntad.style.border='3px solid red';
    }else{
        contentVoluntad.style.border='1px solid black';
    }

    if (difiIrBanco.length === 0) {
        validDirecDisc = true;
        if (!primerContent)
            primerContent = divValidadorDrecc;
        contentDifBanco.style.border='3px solid red';
    }else{
         contentDifBanco.style.border='1px solid black';
    }



    if (validDirecDisc) {
        divValidadorDrecc.style.display = 'block';
    } else {
        divValidadorDrecc.style.display = 'none';
    }

    for (let a = 0; a < inputsRepre.length; a++) {
        if (inputsRepre[a].value.length !== 0) {
            validaRepre = true;
            break;
        }
    }

    if (fechaNac.value !== "" && calcularEdad(fechaNac.value) < 18) {
        validaMenor = true;
    }
    console.log(validaRepre);
    console.log(validaMenor);
    if (validaRepre && !validaMenor) {
        for (let i = 0; i < inputsRepre.length; i++) {
            if (inputsRepre[i].value.length === 0) {
                console.log("dentro del iff");
                cotentinputsRepre[i].style.border = '3px solid red';
                confirmacion = false;
                mostrarDivRpere = true;
                if (!primerContent)
                    primerContent = divValidadorRepre;
            } else {
                cotentinputsRepre[i].style.border = '1px solid black';
            }
        }
    } else {
        for (let i = 0; i < inputsRepre.length; i++) {
            cotentinputsRepre[i].style.border = '1px solid black';
        }
    }

    if (validaMenor) {
        for (let i = 0; i < inputsRepre.length; i++) {
            if (inputsRepre[i].value.length === 0) {
                cotentinputsRepre[i].style.border = '3px solid red';
                confirmacion = false;
                mostrarDivValidaMenor = true;
                if (!primerContent)
                    primerContent = divValidaMenorDeEdad;
            } else {
                cotentinputsRepre[i].style.border = '1px solid black';
            }
        }
    } else {
        if(!validaRepre){
            for (let i = 0; i < inputsRepre.length; i++) {
                cotentinputsRepre[i].style.border = '1px solid black';
            }
        }
    }

    
    
    if (mostrarDivValidaMenor) {
        divValidaMenorDeEdad.style.display = 'block';
    } else {
        divValidaMenorDeEdad.style.display = 'none';
    }

    if (!mostrarDivValidaMenor) {
        if (mostrarDivRpere) {
            divValidadorRepre.style.display = 'block';
        } else {
            divValidadorRepre.style.display = 'none';
        }

    }else{
        divValidadorRepre.style.display = 'none';
    }
    
    
    if(fechaEmision.value !==""){
   
        var fechaIngresada = new Date(fechaEmision.value); // Convertimos la cadena a una fecha
        var hoy = new Date();

        // Ignoramos la hora estableciendo las fechas a solo año, mes y día
        fechaIngresada.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (fechaIngresada >= hoy) {

            if (!primerContent)
                primerContent = contentFechaEmi;
            confirmacion = false;
            contentFechaEmi.style.border = '3px solid red';
        } else {
            contentFechaEmi.style.border = '1px solid red';
        }
    }
    
    
    if (hoja1.value.length === 0) {
        console.log("dentro del if de hoja 1");
        contentHoja1.style.border = '3px solid red';
        validaHojas = true;
        confirmacion = false;
    } else {
        contentHoja1.style.border = '1px solid black';
    }

    if (hoja2.value.length === 0) {
        contentHoja2.style.border = '3px solid red';
        validaHojas = true;
        confirmacion = false;
    } else {
        contentHoja2.style.border = '1px solid black';
    }

    if (validaHojas) {
        divValidadoTramite.style.display = 'block';
    } else {
        divValidadoTramite.style.display = 'none';
    }

    if (validaHojas && !primerContent) {
        primerContent = divValidadoTramite;
    }




    if (!confirmacion) {
        event.preventDefault();
        // Desplazar a la vista el primer content inválido
        if (primerContent) {
            const elementPosition = primerContent.getBoundingClientRect().top + window.scrollY;
            let offsetPosition = elementPosition - 200; // Ajuste de 200px hacia arriba
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});


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


function eliminarDatos() {

    for (let a = 0; a < inputsRepre.length; a++) {
        inputsRepre[a].value = '';
    }
    document.getElementById("container5").style.display='none';
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date()
    const fechaNac = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();


    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad;
}

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