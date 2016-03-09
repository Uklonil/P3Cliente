<?php
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
//echo $alumno;
if(isset($_REQUEST['datos']))
{
    $datos=$_REQUEST['datos'];
    $alumno=json_decode($datos);
    $consulta=$conexion->query("update alumnos set nombre='$alumno->Nombre', apellidos='$alumno->Apellidos', telefono='$alumno->Telefono', correo='$alumno->Correo' where dni='$alumno->DNI'");
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