<?php
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$datos=$_REQUEST['datos'];
$matricula=json_decode($datos);
if($matricula->DniAlumno=="0"||$matricula->DniProfesor==""||$matricula->Idioma==""||$matricula->Academia=="")
{
    $error=true;
    $mensaje="CAMPOS SIN RELLENAR";

}
else
{

    $conexion->query("insert into matriculas (dni_alumno,dni_profesor,id_idioma,id_academia,fecha) values('$matricula->DniAlumno','$matricula->DniProfesor','$matricula->Idioma','$matricula->Academia','$matricula->Fecha')");
    $mensaje="ACADEMIA INSERTADA CORRECTAMENTE";
    $error=false;
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
?>