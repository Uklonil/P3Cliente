<?php

$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$datos=$_REQUEST['datos'];
$cargarDatosAcademia=json_decode($datos);
$consulta=$conexion->query("select id,nombre from academia");
$mensaje="<academias>";

if($consulta->num_rows==0)
{
    $mensaje="No hay academias";
    $error=true;
}
else{
    while($linea=$consulta->fetch_assoc())
    {
        $mensaje.="<academia><id>".$linea['id']."</id><nombre>".$linea['nombre']."</nombre></academia>";
    }
    $mensaje.="</academias>";
}

$respuesta=array($error,$mensaje);
echo $respuesta;
$conexion->close();
?>

