$(function() {

    // Crear dialogo
// Crear dialogo
    $("#dialog").dialog({

        autoOpen: false,
        beforeClose: antesDeCerrarse,
        close: alCierre,
        closeOnEscape: false, // No se cierra con ESCAPE
        hide: {
            effect: "explode",
            duration: 1000
        },
        show: "fold",
        buttons: [{
            text: "Aceptar",
            click: function () {
                alert("hola");
            },
            icons: {
                primary: "ui-icon-heart"
            }
        }, {
            text: "Cancelar",
            click: function () {
                $(this).dialog("close");
            },
            icons: {
                primary: "ui-icon-heart"
            }
        }]
    });
});
function alCierre(){
    $("#txtTexto").val("");
}

function antesDeCerrarse(){

    var bCancelarCierre = confirm("�De verdad cerramos el dialogo?");

    return bCancelarCierre;
}

$("#btnAbrir").click(function(){

    $("#dialog").dialog("open");

});

$("#btnCerrar").click(function(){

    $("#dialog").dialog("close");

});


$("#btnEstado").click(function(){

    alert("Dialogo abierto: " + $("#dialog").dialog("isOpen"));

});


// Version 1.8 de jquery ui
$("#btnHabilitar").click(function(){

    $("#dialog").dialog("enable");

});

// Version 1.8 de jquery ui
$("#btnDeshabilitar").click(function(){

    $("#dialog").dialog("disable");

});


$("#btnDestruir").click(function(){

    $("#dialog").dialog("destroy");

});

$("#btnModal").click(function(){

    var bModal = $("#dialog").dialog("option","modal");

    $("#dialog").dialog("option","modal", !bModal);


});
