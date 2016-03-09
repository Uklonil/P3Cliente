$("#capaFrmModProf").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
	open:inicializarFormModProf,
    close: function () {
        $("#forModProf")[0].reset();
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
        click: procesoModProf
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

function inicializarFormModProf()
{
	$.get('php/cargarDNIProf.php',null,tratarListadoDNIModProf,'json');
	document.forModProf.slctDni.addEventListener("change",cargarDatosCamposModProf);
    $.ajax({ url:'php/cargarAcademias.php',
        dataType:'json',
        method:"GET",
        cache:false,
        success:function(oArray,sStatus,oXHR){
            var jqSel=$("#slctAcademiaModProf");
            jqSel.children().remove();

            jQuery.each(oArray,function(i,elemento){
                $('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo(jqSel);
            });
        }});
    var oArrayIdiomas;
    if(localStorage["idiomas"] != null){

        oArrayIdiomas = JSON.parse(localStorage["idiomas"]);

    } else {
        $.get('php/cargarIdiomas.php',null,function(){localStorage["idiomas"] = JSON.stringify(oArrayIdiomas);},'json');
        oArrayIdiomas = JSON.parse(localStorage["idiomas"]);
    }
        jQuery.each(oArrayIdiomas,function(i,elemento){
//        console.log(elemento.id+" "+elemento.nombre);
        $('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo("#slctIdiomaModProf");
    });
}

function tratarListadoDNIModProf(oArrayCategorias,sStatus,oXHR)
{
	$(document.forModProf.slctDni).children().remove();
	//console.log(JSON.parse(oArrayCategorias[1]));
	//console.log(oArrayCategorias);
	$('<option value="0">Seleccione un profesor</option>').appendTo($(document.forModProf.slctDni));
	$.each(oArrayCategorias,function(i,elemento){
		$('<option value="'+elemento.dni +'">' + elemento.dni +' - '+ elemento.nombre + '</option>').appendTo($(document.forModProf.slctDni));
	});
}

function cargarDatosCamposModProf()
{
	$('.has-error').removeClass('has-error');
	$.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&nombre',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModProf.txtNombre.value="":document.forModProf.txtNombre.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&apellidos',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModProf.txtApellidos.value="":document.forModProf.txtApellidos.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&telefono',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModProf.txtTelefono.value="":document.forModProf.txtTelefono.value=oArrayCategorias[1];
	},'json');
	$.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&correo',null,function(oArrayCategorias,sStatus,oXHR){
		//console.log(oArrayCategorias);
		oArrayCategorias[0]?document.forModProf.txtCorreo.value="":document.forModProf.txtCorreo.value=oArrayCategorias[1];
	},'json');
    $.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&academia',null,function(oArrayCategorias,sStatus,oXHR){
        //console.log(oArrayCategorias);
        oArrayCategorias[0]?document.forModProf.slctAcademia.value=0:document.forModProf.slctAcademia.value=oArrayCategorias[1];
    },'json');
    $.get('php/cargarDatos.php?tipo=profesor&dni='+document.forModProf.slctDni.value+'&idioma',null,function(oArrayCategorias,sStatus,oXHR){
        //console.log(oArrayCategorias);
        oArrayCategorias[0]?document.forModProf.slctIdioma.value=0:document.forModProf.slctIdioma.value=oArrayCategorias[1];
    },'json');
}

function procesoModProf()
{
	var sNombre = document.forModProf.txtNombre.value;
	var sApellidos = document.forModProf.txtApellidos.value;
	var sDni = document.forModProf.slctDni.value;
	var sTelefono = document.forModProf.txtTelefono.value;
	var sCorreo = document.forModProf.txtCorreo.value;
    var sAcademia = document.forModProf.slctAcademia.value;
    var sIdioma = document.forModProf.slctIdioma.value;
	var bValido=true;
	if(sNombre=="")
	{
		$(document.forModProf.txtNombre).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModProf.txtNombre).parent().parent().removeClass('has-error');
	}
	if(sApellidos=="")
	{
		$(document.forModProf.txtApellidos).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModProf.txtApellidos).parent().parent().removeClass('has-error');
	}
	if(sDni=="0")
	{
		$(document.forModProf.slctDni).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModProf.slctDni).parent().parent().removeClass('has-error');
	}
	if(sTelefono=="")
	{
		$(document.forModProf.txtTelefono).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModProf.txtTelefono).parent().parent().removeClass('has-error');
	}
	if(sCorreo=="")
	{
		$(document.forModProf.txtCorreo).parent().parent().addClass('has-error');
		bValido=false;
	}
	else
	{
		$(document.forModProf.txtCorreo).parent().parent().removeClass('has-error');
	}
	if(bValido){
		var oProf = new Profesor (sNombre, sApellidos, sDni, sTelefono, sCorreo, sAcademia, sIdioma);
		var sParametroPOST = encodeURI("datos=" + JSON.stringify(oProf));
		$.post("php/modificarProfesor.php",sParametroPOST,tratarRespuestaModprofesor,'json');
	}
	else
	{
		$("#capaMensajes").dialog("option","title","Error");
		$("#mensaje").text("Todos los campos son requeridos");
		$("#capaMensajes").dialog("open");
	}
}

function tratarRespuestaModprofesor(data)
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