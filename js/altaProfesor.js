var oAjaxIdiomas=null;
var oAjaxAcademia=null;

$("#capaFrmAltaProfesor").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    open:inicializarFormProf,
	close: function () {
        $("#forAltPro")[0].reset();
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
        click: procesoAltaProfesor
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});



function procesoAltaProfesor(){

    var sNombre = document.forAltPro.txtNombre.value;
    var sApellidos = document.forAltPro.txtApellidos.value;
    var sDni = document.forAltPro.slctDni.value;
    var sTelefono = document.forAltPro.txtTelefono.value;
    var sCorreo = document.forAltPro.txtCorreo.value;
    var bValido=true;
    if(sNombre=="")
    {
        $(document.forAltPro.txtNombre).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltPro.txtNombre).parent().parent().removeClass('has-error');
    }
    if(sApellidos=="")
    {
        $(document.forAltPro.txtApellidos).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltPro.txtApellidos).parent().parent().removeClass('has-error');
    }
    if(sDni=="0")
    {
        $(document.forAltPro.slctDni).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltPro.slctDni).parent().parent().removeClass('has-error');
    }
    if(sTelefono=="")
    {
        $(document.forAltPro.txtTelefono).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltPro.txtTelefono).parent().parent().removeClass('has-error');
    }
    if(sCorreo=="")
    {
        $(document.forAltPro.txtCorreo).parent().parent().addClass('has-error');
        bValido=false;
    }
    else
    {
        $(document.forAltPro.txtCorreo).parent().parent().removeClass('has-error');
    }
    if(bValido){
        var oProf = new Profesor (sNombre,sApellidos,sDni,sTelefono,sCorreo,document.forAltPro.selectIdioma.value,document.forAltPro.selectAcademia.value);

        // Formateo de parametro POST
        var sParametroPOST = "datos=" + JSON.stringify(oProf);

        // Codifico para envio
        sParametroPOST = encodeURI(sParametroPOST);

        // Script de envio
        var sURL = encodeURI("php/altaProfesor.php");
//console.log(sParametroPOST);
        llamadaAjaxAltaProfesor(sURL,sParametroPOST);
    }
    else
    {
        $("#capaMensajes").dialog("option","title","Error");
        $("#mensaje").text("Todos los campos son requeridos");
        $("#capaMensajes").dialog("open");
    }


}


/* LLAMADAS AJAX */
function llamadaAjaxAltaProfesor(sURL,sParametroPOST){

    oAjaxAltaProfesor = objetoXHR();

    oAjaxAltaProfesor.open("POST",sURL,true);

    // Para peticiones con metodo POST
    oAjaxAltaProfesor.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    oAjaxAltaProfesor.onreadystatechange = respuestaAltaProf;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

    oAjaxAltaProfesor.send(sParametroPOST);
}

function respuestaAltaProf(){

    if(oAjaxAltaProfesor.readyState == 4 && oAjaxAltaProfesor.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxAltaProfesor.responseText);

        $("#capaMensajes").dialog("open");

        if (oArrayRespuesta[0] == true){
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayRespuesta[1]);

        } else {
            $("#capaMensajes").dialog("option","title","OK");
            $("#mensaje").text(oArrayRespuesta[1]);
			$("#capaFrmAltaProfesor").dialog("close");
        }
    }
}

function inicializarFormProf()
{
	$.get('php/cargarAcademias.php',null,tratarCargarAcademias,'json');
	var oArrayIdiomas = null;
	// Existe en almacenamiento local
	if(localStorage["idiomas"] != null){
//		console.log("antes de cargar");
		oArrayIdiomas = JSON.parse(localStorage["idiomas"]);
//		console.log(oArrayIdiomas);
//		console.log("despues de cargar");
//		console.log("antes de cargar combo");
		rellenaCombo(oArrayIdiomas);
//		console.log("despues de cargar combo");
	} else {
		$.get('php/cargarIdiomas.php',null,tratarCargarIdiomas,'json');
    }
}

function rellenaCombo(oArrayIdiomas){
        $(document.forAltPro.selectIdioma).children().remove();

//    console.log(oArrayModelos[0].IDModelo);
        $(oArrayIdiomas).each(function(){
			//console.log($('<option>').val(this.id).text(this.nombre));
//			console.log("insertado <option> id="+this.id+" nombre="+this.nombre);
            $('<option>').val(this.id).text(this.nombre).appendTo($(document.forAltPro.selectIdioma));
        });

}


function tratarCargarIdiomas(oArrayIdiomas,sStatus,oXHR){
	rellenaCombo(oArrayIdiomas);
	// Guardar en localStorage
	localStorage["idiomas"] = JSON.stringify(oArrayIdiomas);
}

function tratarCargarAcademias(oArrayCategorias,sStatus,oXHR){

        $("#academiaProf").empty();

        jQuery.each(oArrayCategorias,function(i,elemento){

            $('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo("#academiaProf");

        });

    }