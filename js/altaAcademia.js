

$("#capaFrmAltaAcademia").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#forAltaAca")[0].reset();
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
        click: procesoAltaAcademia
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});


function procesoAltaAcademia(){

    var sNombre = document.forAltAca.txtNombre.value;
    var sDireccion = document.forAltAca.txtDireccion.value;
    var sCP = document.forAltAca.txtCp.value;
    var sTelefono = document.forAltAca.txtTelefono.value;
    var bValido=true;
    if(sNombre=="")
    {
        $(document.forAltAca.txtNombre).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAca.txtNombre).parent().parent().removeClass('has-error');
    }
    if(sDireccion=="")
    {
        $(document.forAltAca.txtDireccion).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAca.txtDireccion).parent().parent().removeClass('has-error');
    }
    if(sCP=="")
    {
        $(document.forAltAca.txtCp).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAca.txtCp).parent().parent().removeClass('has-error');
    }
    if(sTelefono=="")
    {
        $(document.forAltAca.txtTelefono).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltAca.txtTelefono).parent().parent().removeClass('has-error');
    }
    if(bValido){
        var oAca = new Academia (sNombre,sDireccion,sCP,sTelefono);

        // Formateo de parametro POST
        var sParametroPOST = "datos=" + JSON.stringify(oAca);
//    console.log(sParametroPOST);
        // Codifico para envio
        sParametroPOST = encodeURI(sParametroPOST);

        // Script de envio
        var sURL = encodeURI("php/altaAcademia.php");

        llamadaAjaxAltaAcademia(sURL,sParametroPOST);
    }
    else
    {
        $("#capaMensajes").dialog("option","title","Error");
        $("#mensaje").text("Todos los campos son requeridos");
        $("#capaMensajes").dialog("open");
    }
}


/* LLAMADAS AJAX */
function llamadaAjaxAltaAcademia(sURL,sParametroPOST){

    oAjaxAltaAcademia = objetoXHR();

    oAjaxAltaAcademia.open("POST",sURL,true);

    // Para peticiones con metodo POST
    oAjaxAltaAcademia.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    oAjaxAltaAcademia.onreadystatechange = respuestaAltaAca;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

    oAjaxAltaAcademia.send(sParametroPOST);
}

function respuestaAltaAca(){

    if(oAjaxAltaAcademia.readyState == 4 && oAjaxAltaAcademia.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxAltaAcademia.responseText);

        $("#capaMensajes").dialog("open");

        if (oArrayRespuesta[0] == true){
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayRespuesta[1]);

        } else {
            $("#capaMensajes").dialog("option","title","OK");
            $("#mensaje").text(oArrayRespuesta[1]);
            $("#capaFrmAltaAcademia").dialog("close");
        }
    }
}
