<?php

$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$datos=$_REQUEST['datos'];
$profesor=json_decode($datos);
$consulta=$conexion->query("select dni from profesor where dni='$profesor->DNI'");

if($consulta->num_rows>0)
{
    $mensaje="EL PROFESOR YA EXISTE";
    $error=true;
}
else
{
    $conexion->query("insert into profesor (dni,id_academia,id_idioma,nombre,apellidos,telefono,correo) values('$profesor->DNI',$profesor->Academia,$profesor->Idiomas,'$profesor->Nombre','$profesor->Apellidos',$profesor->Telefono,'$profesor->Correo')");
    $mensaje="INSERTADO CORRECTAMENTE";
    $error=false;
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
?>