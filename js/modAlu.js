$("#capaFrmModAlu").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
	open:inicializarFormModAlu,
    close: function () {
        $("#forModAlu")[0].reset();
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
        click: procesoModAlu
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function inicializarFormModAlu()
{
	$.get('php/cargarDNI.php',null,tratarListadoDNIModAlumno,'json');
	document.forModAlu.slctDni.addEventListener("change",cargarDatosCamposModAlu);
}

function tratarListadoDNIModAlumno(oArrayCategorias,sStatus,oXHR)
{
	$(document.forModAlu.slctDni).children().remove();
	//console.log(JSON.parse(oArrayCategorias[1]));
	//console.log(oArrayCategorias);
	$('<option value="0">Seleccione un alumno</option>').appendTo($(document.forModAlu.slctDni));
	$.each(oArrayCategorias,function(i,elemento){
		$('<option value="'+elemento.dni +'">' + elemento.dni +' - '+ elemento.nombre + '</option>').appendTo($(document.forModAlu.slctDni));
	});
}

function cargarDatosCamposModAlu()
{
	$('.has-error').removeClass('has-error');
	$.get('php/cargarDatos.php?tipo=alumno&dni='+document.forModAlu.slctDni.value+'&nombre',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModAlu.txtNombre.value="":document.forModAlu.txtNombre.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=alumno&dni='+document.forModAlu.slctDni.value+'&apellidos',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModAlu.txtApellidos.value="":document.forModAlu.txtApellidos.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=alumno&dni='+document.forModAlu.slctDni.value+'&telefono',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModAlu.txtTelefono.value="":document.forModAlu.txtTelefono.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=alumno&dni='+document.forModAlu.slctDni.value+'&correo',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModAlu.txtCorreo.value="":document.forModAlu.txtCorreo.value=oArrayCategorias[1];
	},'json');
}

function procesoModAlu()
{
	var sNombre = document.forModAlu.txtNombre.value;
	var sApellidos = document.forModAlu.txtApellidos.value;
	var sDni = document.forModAlu.slctDni.value;
	var sTelefono = document.forModAlu.txtTelefono.value;
	var sCorreo = document.forModAlu.txtCorreo.value;
	var bValido=true;
	if(sNombre=="")
	{
		$(document.forModAlu.txtNombre).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModAlu.txtNombre).parent().parent().removeClass('has-error');
	}
	if(sApellidos=="")
	{
		$(document.forModAlu.txtApellidos).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModAlu.txtApellidos).parent().parent().removeClass('has-error');
	}
	if(sDni=="0")
	{
		$(document.forModAlu.slctDni).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModAlu.slctDni).parent().parent().removeClass('has-error');
	}
	if(sTelefono=="")
	{
		$(document.forModAlu.txtTelefono).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModAlu.txtTelefono).parent().parent().removeClass('has-error');
	}
	if(sCorreo=="")
	{
		$(document.forModAlu.txtCorreo).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModAlu.txtCorreo).parent().parent().removeClass('has-error');
	}
	if(bValido){
		var oAlum = new Alumno (sNombre, sApellidos, sDni, sTelefono, sCorreo);
		var sParametroPOST = encodeURI("datos=" + JSON.stringify(oAlum));
		$.post("php/modificarAlumno.php",sParametroPOST,tratarRespuestaModAlumno,'json');
	}
	else
	{
		$("#capaMensajes").dialog("option","title","Error");
		$("#mensaje").text("Todos los campos son requeridos");
		$("#capaMensajes").dialog("open");
	}
}

function tratarRespuestaModAlumno(data)
{
	//console.log(data);
	$("#capaMensajes").dialog("open");

        if (data[0]){
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(data[1]);

        } else {
            $("#capaMensajes").dialog("option","title","OK");
            $("#mensaje").text(data[1]);
			$('#capaFrmModAlu').dialog('close');
        }
}