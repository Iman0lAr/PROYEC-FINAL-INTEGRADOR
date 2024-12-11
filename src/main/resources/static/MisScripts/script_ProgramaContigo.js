const formProgramaContigo = document.getElementById("formProgramaContigo");
//Discapacitado

const inputValid = document.getElementsByClassName("inputValid");
const contentInput = document.getElementsByClassName("contentInput");

const dni_repre= document.getElementById("dni_repre");
const dni_disc= document.getElementById("dni_disc");

const inputsRepre= document.getElementsByClassName("inputsRepre");
const cotentinputsRepre= document.getElementsByClassName("cotentinputsRepre");


formProgramaContigo.addEventListener("submit", (event) => {

    let confirmacion = true;
    let primerContent = null;
    let validaRepre= false;

    for (let a = 0; a < inputValid.length; a++) {
        if (inputValid[a].value.length === 0) {
            contentInput[a].style.border = '3px solid red';
            confirmacion = false;
            if (!primerContent) {
                primerContent = contentInput[a];
            }
        } else {
            contentInput[a].style.border = '1px solid black';
        }
    }

    for(let a=0;a<inputsRepre.length;a++){
        if(inputsRepre[a].length!==0){
            validaRepre=true;
        }
    }

    if(validaRepre){
        for(let a=0;a<inputsRepre.length;a++){
            if(inputsRepre[a].value.length===0){
                cotentinputsRepre[a].style.border = '3px solid red';
                confirmacion = false;
            }else{
                 cotentinputsRepre[a].style.border = '1px solid black';
            }
        }
    }
    
    if (!confirmacion) {
        event.preventDefault();
        // Desplazar a la vista el primer content inválido
        if (primerContent) {
             const elementPosition = primerContent.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 200; // Ajuste de 200px hacia arriba

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


function eliminarDatos(){
  
    for(let a=0;a<inputsRepre.length;a++){
        inputsRepre[a].value='';
    }
    
}

