package com.example.demo.Controladores;

import ClasesFormulario.OuputCarnet;
import com.example.demo.Entidades.CertificadoDeDiscapacidad;
import com.example.demo.Entidades.Direccion;
import com.example.demo.Entidades.Discapacitado;
import com.example.demo.Entidades.Discapacitado_Representane;
import com.example.demo.Entidades.Infor_Discapacitado;
import com.example.demo.Entidades.Persona;
import com.example.demo.Entidades.Representante;
import com.example.demo.Entidades.Tramite;
import com.example.demo.Entidades.Usuario;
import com.example.demo.Servicios.ServicioCertificadoDeDiscapacidad;
import com.example.demo.Servicios.ServicioDireccion;
import com.example.demo.Servicios.ServicioDis_Representante;
import com.example.demo.Servicios.ServicioDiscapacitado;
import com.example.demo.Servicios.ServicioInfoDiscapacitado;
import com.example.demo.Servicios.ServicioPersona;
import com.example.demo.Servicios.ServicioRepresentante;
import com.example.demo.Servicios.ServicioTramite;
import com.example.demo.Servicios.ServicioUsuario;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ControllerHome {

    @Autowired
    private ServicioUsuario servicioUsuario;

    @Autowired
    private ServicioTramite servicioTramite;
    @Autowired
    private ServicioCertificadoDeDiscapacidad servicioCertificadoDeDiscapacidad;

    @Autowired
    private ServicioRepresentante servicioRepresentante;

    @Autowired
    private ServicioInfoDiscapacitado servicioInfoDiscapacitado;

    @Autowired
    private ServicioDiscapacitado servDis;

    @Autowired
    private ServicioPersona serviP;

    @Autowired
    private ServicioDireccion servicioDireccion;

    @Autowired
    private ServicioDis_Representante servicioDis_Representante;

    @PostMapping("/InicioDeSesion")
    String validarUsuario(@RequestParam("usuario") String usuario, @RequestParam("contraseña") String contraseña, HttpSession sesion, Model model) {

        Usuario uss = servicioUsuario.login(usuario, contraseña);

        if (uss != null) {
            sesion.setAttribute("uss", uss);
            return "redirect:/home";
        }
        model.addAttribute("error", true);
        return "index";
    }

    @GetMapping("/home")
    String mostrarInicio(HttpSession sesion, Model model) {

        List<OuputCarnet> listaPersonaRepresentante = new ArrayList<>();
        if (sesion.getAttribute("uss") == null) {
            return "redirect:/index";
        }

        try {
            ArrayList<Tramite> tramites = new ArrayList<>(servicioTramite.obtenerTramites());

            for (Tramite tramite : tramites) {

                Infor_Discapacitado infor = tramite.getInfor_Discapacitado();

                Discapacitado disc = infor.getDiscapacitado();
           
                Representante repre = null;
                if (infor.getRepresentante() != null) {
                    repre = infor.getRepresentante();

                }

                listaPersonaRepresentante.add(new OuputCarnet(
                        tramite,
                        disc,
                        infor.getDireccion(),
                        infor.getCertificadoDeDiscapacidad(),
                        repre,
                        infor.getDireccion_repre(),
                        disc.getCopiacopia_dni() == null ? null : convertirImagenAStringBase64(disc.getCopiacopia_dni()),
                        (repre == null || repre.getCopia_dni()==null ) ? null : convertirImagenAStringBase64(repre.getCopia_dni()),
                        infor.getCertificadoDeDiscapacidad() == null || infor.getCertificadoDeDiscapacidad().getCopia_cert1()==null ? null : convertirImagenAStringBase64(infor.getCertificadoDeDiscapacidad().getCopia_cert1()),
                        infor.getCertificadoDeDiscapacidad() == null || infor.getCertificadoDeDiscapacidad().getCopia_cert2()== null? null : convertirImagenAStringBase64(infor.getCertificadoDeDiscapacidad().getCopia_cert2()),
                        tramite.getImg_solicitud() == null ? null : convertirImagenAStringBase64(tramite.getImg_solicitud())));

                // Discapacitado_Representane disscDiscapacitado_Representane= servicioDis_Representante.buscarPorDiscRepre(Integer.MIN_VALUE, Integer.SIZE);
            }
   
            model.addAttribute("lista", listaPersonaRepresentante);
        } catch (Exception e) {
            System.out.println(e);
        }

        return "Home";
    }

    private String convertirImagenAStringBase64(byte[] foto) throws IOException {
        return Base64.getEncoder().encodeToString(foto);
    }
}
