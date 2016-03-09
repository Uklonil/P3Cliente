<?php
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
//echo $profesor;
if(isset($_REQUEST['datos']))
{
    $datos=$_REQUEST['datos'];
    $profesor=json_decode($datos);
    $consulta=$conexion->query("update profesor set nombre='$profesor->Nombre', apellidos='$profesor->Apellidos', telefono='$profesor->Telefono', correo='$profesor->Correo', id_academia='$profesor->Academia', id_idioma='$profesor->Idiomas' where dni='$profesor->DNI'");
    if($conexion->affected_rows>0)
    {
        $mensaje="ACTUALIZADO CON EXITO";
        $error=false;
    }
    else
    {
        $mensaje="ERROR CON LA BASE DE DATOS";
        $error=true;
    }
}
else
{
    $mensaje="ERROR CON LOS PARAMETROS";
    $error=true;
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
 ?> 