


$("#capaFrmAltaAlumnos").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#forAltAlu")[0].reset();
    },
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "scale",
        duration: 1000
    },
    show: "fold",
    width:"400px",
    buttons: [{
        text: "Aceptar",
        click: procesoAltaAlumno
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});


function procesoAltaAlumno(){

    var sNombre = document.forAltAlu.txtNombre.value;
    var sApellidos = document.forAltAlu.txtApellidos.value;
    var sDni = document.forAltAlu.txtDni.value;
    var sTelefono = document.forAltAlu.txtTelefono.value;
    var sCorreo = document.forAltAlu.txtCorreo.value;
    var bValido=true;
    if(sNombre=="")
    {
        $(document.forAltAlu.txtNombre).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAlu.txtNombre).parent().parent().removeClass('has-error');
    }
    if(sApellidos=="")
    {
        $(document.forAltAlu.txtApellidos).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAlu.txtApellidos).parent().parent().removeClass('has-error');
    }
    if(sDni=="")
    {
        $(document.forAltAlu.txtDni).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAlu.txtDni).parent().parent().removeClass('has-error');
    }
    if(sTelefono=="")
    {
        $(document.forAltAlu.txtTelefono).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAlu.txtTelefono).parent().parent().removeClass('has-error');
    }
    if(sCorreo=="")
    {
        $(document.forAltAlu.txtCorreo).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAlu.txtCorreo).parent().parent().removeClass('has-error');
    }
    if(bValido){
        var oAlum = new Alumno (sNombre,sApellidos,sDni,sTelefono,sCorreo);

        // Formateo de parametro POST
        var sParametroPOST = "datos=" + JSON.stringify(oAlum);

        // Codifico para envio
        sParametroPOST = encodeURI(sParametroPOST);

        // Script de envio
        var sURL = encodeURI("php/altaAlumno.php");

        llamadaAjaxAltaAlumno(sURL,sParametroPOST);
    }
    else
    {
        $("#capaMensajes").dialog("option","title","Error");
        $("#mensaje").text("Todos los campos son requeridos");
        $("#capaMensajes").dialog("open");
    }
}


/* LLAMADAS AJAX */
function llamadaAjaxAltaAlumno(sURL,sParametroPOST){

    oAjaxAltaAlumno = objetoXHR();

    oAjaxAltaAlumno.open("POST",sURL,true);

    // Para peticiones con metodo POST
    oAjaxAltaAlumno.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    oAjaxAltaAlumno.onreadystatechange = respuestaAltaAlu;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

    oAjaxAltaAlumno.send(sParametroPOST);
}

function respuestaAltaAlu(){

    if(oAjaxAltaAlumno.readyState == 4 && oAjaxAltaAlumno.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxAltaAlumno.responseText);

        $("#capaMensajes").dialog("open");

        if (oArrayRespuesta[0] == true){
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayRespuesta[1]);

        } else {
            $("#capaMensajes").dialog("option","title","OK");
            $("#mensaje").text(oArrayRespuesta[1]);
            $("#capaFrmAltaAlumnos").dialog("close");
        }
    }
}
