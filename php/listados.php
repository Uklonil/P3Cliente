<?php

// Va a devolver una respuesta JSON que no se debe cachear
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "practica_clientes";
$usuario   = "root";
$password  = "";

$academia=date(json_decode($_REQUEST['academia']));
$idioma=date(json_decode($_REQUEST['idioma']));


// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select alumnos.nombre,matriculas.dni_alumno,
  profesor.nombre as NombreProfesor,
  matriculas.dni_profesor
  from matriculas,alumnos,profesor
  WHERE matriculas.dni_alumno=alumnos.dni
        AND matriculas.dni_profesor=profesor.dni";
if($idioma>0)
        $sql.=" AND profesor.id_idioma= '".$idioma."' ";
if($academia>0)
    $sql.=" AND profesor.id_academia= '".$academia."'";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$respuesta="<?xml version='1.0' encoding='UTF-8'?><alumnos>";
while($fila=mysql_fetch_assoc($resultados)){
    $respuesta.="<alumno>";
    $respuesta.="<nombreA>".$fila['nombre']."</nombreA>";
    $respuesta.="<DniA>".$fila['dni_alumno']."</DniA>";
    $respuesta.="<nombrePro>".$fila['NombreProfesor']."</nombrePro>";
    $respuesta.="<DniP>".$fila['dni_profesor']."</DniP>";;
    $respuesta.="</alumno>";
}
$respuesta.="</alumnos>";
echo $respuesta;

mysql_close($conexion);

?>