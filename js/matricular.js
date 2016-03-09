$("#capaFrmMatricular").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    close: function () {
        $("#forMatricular")[0].reset();
    },
	open:inicializarMatricular,
    closeOnEscape: false, // No se cierra con ESCAPE
    hide: {
        effect: "scale",
        duration: 1000
    },
    show: "fold",
    width:"400px",
    buttons: [{
        text: "Aceptar",
        click: procesoMatricular
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
        }
    }]
});

$(function() {
    $( "#datepicker" ).datepicker();
});

function inicializarMatricular(){
//	  console.log("apertura matricular");
	$.get('php/cargarAcademias.php',null,cargarAcademiasListados,'json');
	$.get('php/cargarDNI.php',null,tratarCargarDNI,'json');
}


function procesoMatricular(){

    // Aqui habr�a que hacer la validacion del formulario
    // if (validarAltaPropietario()){

    //Creo un objeto propietario

    var oMatri = new Matricula(document.forMatricular.selectAcademia.value,
                               document.forMatricular.selectIdioma.value,
                               document.forMatricular.selectProfesor.value,
                               document.forMatricular.selectAlumno.value,
                               document.forMatricular.fecha.value
                                );

    // Formateo de parametro POST
    var sParametroPOST = "datos=" + JSON.stringify(oMatri);
    console.log(sParametroPOST);
    // Codifico para envio
    sParametroPOST = encodeURI(sParametroPOST);

    // Script de envio
    var sURL = encodeURI("php/matricular.php");

    llamadaAjaxAltaAcademia(sURL,sParametroPOST);
}


/* LLAMADAS AJAX */
function llamadaAjaxAltaAcademia(sURL,sParametroPOST){

    oAjaxMatricular = objetoXHR();

    oAjaxMatricular.open("POST",sURL,true);

    // Para peticiones con metodo POST
    oAjaxMatricular.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    oAjaxMatricular.onreadystatechange = respuestaMatricula;
//	oAjaxAltaProp.addEventListener("readystatechange",respuestaAltaProp,false);

    oAjaxMatricular.send(sParametroPOST);
}

function respuestaMatricula(){

    if(oAjaxMatricular.readyState == 4 && oAjaxMatricular.status ==200)	{
        var oArrayRespuesta = JSON.parse(oAjaxMatricular.responseText);

        $("#capaMensajes").dialog("open");

        if (oArrayRespuesta[0] == true){
            $("#capaMensajes").dialog("option","title","Error");
            $("#mensaje").text(oArrayRespuesta[1]);

        } else {
            $("#capaMensajes").dialog("option","title","OK");
            $("#mensaje").text(oArrayRespuesta[1]);
            $('#capaFrmMatricular').dialog("close");
        }
    }
}

function tratarCargarDNI(oArrayCategorias,sStatus,oXHR){
	$(document.forMatricular.selectAlumno).empty();
	jQuery.each(oArrayCategorias,function(i,elemento){
		$('<option value="'+elemento.dni +'">' + elemento.dni +' - '+ elemento.nombre + '</option>').appendTo($(document.forMatricular.selectAlumno));
	});
}

function cargarAcademiasListados(oArrayCategorias,sStatus,oXHR){
	$("#academiaProf").empty();
	$('<option value="0">Seleccione academia</option>').appendTo("#academiaProf");
	jQuery.each(oArrayCategorias,function(i,elemento){
		$('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo("#academiaProf");
	});
	$('#academiaProf')[0].addEventListener("change",llamadaAjaxIdioma,false);
	$('[name=selectAcademia]')[0].addEventListener("change",llamadaAjaxIdioma,false);
	$('[name=selectIdioma]')[0].addEventListener("change",llamadaAjaxProfesor,false);
	//selectAcademiaListados.addEventListener("change",llamadaAjaxIdioma,false);
}

function llamadaAjaxIdioma(){
	var sAcademia=document.getElementById("academiaProf").value;
	if(sAcademia!="0") {
		$.get('php/buscarIdiomaDeAcademia.php?academia='+sAcademia,null,cargarIdiomaAcademia,'json');
	}
}

function llamadaAjaxProfesor()
{
	var sAcademia=$('[name=selectAcademia]')[0].value;
	var sIdioma=$('#idiomaProf')[0].value;
	if(sAcademia!="0") {
		$.get('php/buscarProfesorIdioma.php?academia=' + sAcademia+'&idioma='+sIdioma, null, cargarIdiomaProfesorAcademia, 'json');
	}
}

function cargarIdiomaAcademia(oArrayIdiomas,sStatus,oXHR){
	$("#idiomaProf").empty();
	if(!oArrayIdiomas)
	{
		$('<option value="0">No hay idiomas </option>').appendTo("#idiomaProf");
	}
	else {
		$('<option value="0">Seleccione un idioma</option>').appendTo("#idiomaProf");
		jQuery.each(oArrayIdiomas, function (i, elemento) {
			$('<option value="' + elemento.id + '">' + elemento.nombre + '</option>').appendTo("#idiomaProf");
		});
	}
}

function cargarIdiomaProfesorAcademia(oArrayIdiomas,sStatus,oXHR){
	$("#dniProfesor").empty();
	if(!oArrayIdiomas)
	{
		$('<option value="0">No hay Profesores </option>').appendTo("#dniProfesor");
	}
	else {
		$('<option value="0">Seleccione un Profesor</option>').appendTo("#dniProfesor");
		jQuery.each(oArrayIdiomas, function (i, elemento) {
			$('<option value="' + elemento.id_idioma + '">' + elemento.nombre + '</option>').appendTo("#dniProfesor");
		});
	}
}