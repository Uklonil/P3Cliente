<?php

$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$datos=$_REQUEST['datos'];
$alumno=json_decode($datos);
$consulta=$conexion->query("select dni from alumnos where dni='$alumno->DNI'");

if($consulta->num_rows>0)
{
    $mensaje="EL ALUMNO YA EXISTE";
    $error=true;
}
else
{
    $conexion->query("insert into alumnos(dni,nombre,apellidos,telefono,correo) values('$alumno->DNI','$alumno->Nombre','$alumno->Apellidos',$alumno->Telefono,'$alumno->Correo')");
    $mensaje="INSERTADO CORRECTAMENTE";
    $error=false;
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
?>