<?php
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$tipo=isset($_REQUEST['tipo'])?$_REQUEST['tipo']:"";
$mensaje="";
$aux=null;
$resultado=Array();
if($tipo=="alumno")
{
    $resultSet=$conexion->query("select * from alumnos");
    $error=false;
    while($linea=$resultSet->fetch_assoc())
    {
		$aux->dni=$linea['dni'];
		$aux->nombre=$linea['nombre'];
        $resultado[]=json_encode($aux);
    }
    $mensaje=json_encode($resultado);
}
else if($tipo=="profesor")
{
    $resultSet=$conexion->query("select * from profesor");
    $error=false;
    while($linea=$resultSet->fetch_assoc())
    {
        $aux->dni=$linea['dni'];
		$aux->nombre=$linea['nombre'];
        $resultado[]=json_encode($aux);
    }
    $mensaje=json_encode($resultado);
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