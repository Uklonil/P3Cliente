<?php

$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$consulta=$conexion->query("select id,nombre from academia");

while($fila=mysqli_fetch_assoc($consulta))
    $datos[]=$fila;


echo json_encode($datos);
$conexion->close();
?>