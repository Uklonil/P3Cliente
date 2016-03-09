$("#capaFrmListados").dialog({
    autoOpen: true,  // Es el valor por defecto
    // beforeClose: antesDeCerrarse,
    open:inicializarFormListados,
    close: function () {
//        $("#forListar")[0].reset();
        $("#listado").remove();
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
        click: procesoListado
    }, {
        text: "Cancelar",
        click: function() {
            $(this).dialog("close");
//            $("#listado").remove();
        }
    }]
});

function inicializarFormListados(){
//	  console.log("apertura matricular");
    $.get('php/cargarAcademias.php',null,cargarSelectAcademiasListados,'json');
    cargarSelectIdiomaListado();
    $(document.forListar.selectAcademiaListados)[0].addEventListener("change",cargarSelectIdiomaListado,false);
}

function procesoListado(){
    var academia=document.forListar.selectAcademiaListados.value;
    var idioma=document.forListar.selectIdioma.value;

    $.get('php/listados.php?academia='+academia+'&idioma='+idioma,null,procesaXML);
}

function procesaXML(oXML,sStatus,oXHR){

    $("#listado").remove();
    var jqTabla = $('<table id="listado" class="table">');

    var oAlumno = oXML.getElementsByTagName("alumno");
    $('<tr><th>Nombre</th><th>DNI Alumno</th><th>Nombre Profesor</th><th>DNI Profesor</th></tr>').appendTo(jqTabla);
    for(var i=0;i<oAlumno.length;i++){
        console.log(i+" "+oAlumno[0].getElementsByTagName('nombreA')[0].textContent);
        $('<tr>' +
            '<td>'+oAlumno[i].getElementsByTagName('nombreA')[0].textContent+'</td>' +
            '<td>'+oAlumno[i].getElementsByTagName('DniA')[0].textContent+'</td>' +
            '<td>'+oAlumno[i].getElementsByTagName('nombrePro')[0].textContent+'</td>' +
            '<td>'+oAlumno[i].getElementsByTagName('DniP')[0].textContent+'</td>' +
            '</tr>').appendTo(jqTabla);
    }
//    jqTabla.wrap($("<div class='col-xs-10'>"));
    jqTabla.appendTo("body");

}

function cargarSelectAcademiasListados(oArrayCategorias,sStatus,oXHR){

//    console.log(document.forListar.selectAcademiaListados);
//    console.log($("#selectAcademiaList"));
    var jqSel=$("#selectAcademiaList");
    jqSel.children().remove();

    $('<option value="0">Todas</option>').appendTo(jqSel);

    jQuery.each(oArrayCategorias,function(i,elemento){
        $('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo(jqSel);
    });

    //selectAcademiaListados.addEventListener("change",llamadaAjaxIdioma,false);
}

function cargarSelectIdiomaListado()
{
    if(document.forListar.selectAcademiaListados.value==0)
    {
        var oArrayIdiomas;
        if(localStorage["idiomas"] != null){

            oArrayIdiomas = JSON.parse(localStorage["idiomas"]);

        } else {
            $.get('php/cargarIdiomas.php',null,function(){localStorage["idiomas"] = JSON.stringify(oArrayIdiomas);},'json');
            oArrayIdiomas = JSON.parse(localStorage["idiomas"]);
        }
        procesaSelectIdiomaListado(oArrayIdiomas,"",null);
    }
    else
    $.get('php/buscarIdiomaDeAcademia.php?academia='+$("#selectAcademiaList").val(),null,procesaSelectIdiomaListado,'json');
}

function procesaSelectIdiomaListado(oArrayCategorias,sStatus,oXHR)
{
    var jqSel=$("#selectIdiomaList");
    jqSel.empty();
    $('<option value="0">Todos</option>').appendTo(jqSel);
//    console.log(oArrayCategorias);
    if(oArrayCategorias)
    jQuery.each(oArrayCategorias,function(i,elemento){
//        console.log(elemento.id+" "+elemento.nombre);
        $('<option value="'+elemento.id +'">' + elemento.nombre + '</option>').appendTo(jqSel);
    });
}