///* VARIABLES PARA AJAX */
var oAjaxAltaAlumno = null;
var oAjaxAltaProfesor = null;
var oAjaxAltaAcademia = null;
var oAjaxMatricular = null;

// Manejo al inicio
window.addEventListener('load',iniciar,false);

function iniciar() {

    $("#capaMensajes").dialog({
        autoOpen: false,
        modal: true
    });


    $('#btnAbrir').click(function () {    //aqui el id del formulario

        // Verifico si ya he cargado el formulario antes
        if ($('#forAltAlu').size() == 0) {

            $('<div title="Alta Alumnos" id="capaFrmAltaAlumnos"></div>').appendTo('#formularios').load("html/frmAltaAlumno.html", function () {
                $.getScript("js/altaAlumno.js")
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmAltaAlumnos').dialog("open");
        }

    });


    $('#btnAbrirProf').click(function () {    //aqui el id del formulario

        // Verifico si ya he cargado el formulario antes
        if ($('#forAltPro').size() == 0) {

            $('<div title="Alta Profesor" id="capaFrmAltaProfesor"></div>').appendTo('#formularios').load("html/frmAltaProfesor.html", function () {
                $.getScript("js/altaProfesor.js")
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmAltaProfesor').dialog("open");
        }

    });



    $('#altaAcademia').click(function () {    //aqui el id del formulario

        // Verifico si ya he cargado el formulario antes
        if ($('#forAltaAca').size() == 0) {

            $('<div title="Alta Academia" id="capaFrmAltaAcademia"></div>').appendTo('#formularios').load("html/frmAltaAcademia.html", function () {
                $.getScript("js/altaAcademia.js")
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmAltaAcademia').dialog("open");
        }

    });

    $('#listados').click(function () {    //aqui el id del formulario

        // Verifico si ya he cargado el formulario antes
        if ($('#forListar').size() == 0) {

            $('<div title="Listados" id="capaFrmListados"></div>').appendTo('#formularios').load("html/frmListados.html", function () {
                $.getScript("js/listados.js")
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmListados').dialog("open");
        }
    });


    $('#matricular').click(function () {    //aqui el id del formulario

        // Verifico si ya he cargado el formulario antes
        if ($('#forMatricular').size() == 0) {

            $('<div title="Matricular" id="capaFrmMatricular"></div>').appendTo('#formularios').load("html/frmMatricular.html", function () {
                $.getScript("js/matricular.js");
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmMatricular').dialog("open");

        }
    });
	
	$('#btnAbrirModAlu').click(function(){
		if ($('#forModAlu').size() == 0) {

            $('<div title="Modificar alumno" id="capaFrmModAlu"></div>').appendTo('#formularios').load("html/frmModAlumno.html", function () {
                $.getScript("js/modAlu.js");
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmModAlu').dialog("open");

        }
	});

    $('#btnAbrirModProf').click(function(){
        if ($('#forModProf').size() == 0) {

            $('<div title="Modificar profesor" id="capaFrmModProf"></div>').appendTo('#formularios').load("html/frmModProf.html", function () {
                $.getScript("js/modProf.js");
            });


        } else {
            // Lo abro si está cerrado
            $('#capaFrmModProf').dialog("open");

        }
    });

    
    //
    //function tratarCargarDNIProfesor(oArrayCategorias,sStatus,oXHR){
    //
    //    $("#dniProfesor").empty();
    //
    //    jQuery.each(oArrayCategorias,function(i,elemento){
    //
    //        $('<option value="'+elemento.dni +'">' + elemento.dni + '</option>').appendTo("#dniProfesor");
    //
    //    });
    //
    //}

}