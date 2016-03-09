<?php
/**
 * Created by PhpStorm.
 * User: Fco Javier Regaña
 */
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$tipo=isset($_REQUEST['tipo'])?$_REQUEST['tipo']:"";
$tabla=$tipo=="alumno"?"alumnos":"profesor";
$mensaje="";
if(isset($_REQUEST['dni']))
{
    $dni=$_REQUEST['dni'];
    $error=false;
    if(isset($_REQUEST['nombre']))
    {
        $resultSet=$conexion->query("select nombre from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['nombre'];
    }
    else if(isset($_REQUEST['apellidos']))
    {
        $resultSet=$conexion->query("select apellidos from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['apellidos'];
    }
    else if(isset($_REQUEST['telefono']))
    {
        $resultSet=$conexion->query("select telefono from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['telefono'];
    }
    else if(isset($_REQUEST['correo']))
    {
        $resultSet=$conexion->query("select correo from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['correo'];
    }
    else if(isset($_REQUEST['academia']))
    {
        $resultSet=$conexion->query("select id_academia from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['id_academia'];
    }
    else if(isset($_REQUEST['idioma']))
    {
        $resultSet=$conexion->query("select id_idioma from $tabla where dni='$dni'");
        $mensaje=$resultSet->fetch_assoc()['id_idioma'];
    }
    else
    {
        $error=true;
        $mensaje="HA OCURRIDO UN ERROR";
    }
}
else
{
    $error=true;
    $mensaje="HA OCURRIDO UN ERROR";
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
 ?> 