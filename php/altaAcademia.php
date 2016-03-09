
<?php
$conexion=new mysqli("localhost","root","","practica_clientes") or die("Error");
$conexion->query('SET NAMES "utf8"');
$datos=$_REQUEST['datos'];
$academia=json_decode($datos);
if($academia->Nombre==""||$academia->Direccion==""||$academia->CP==""||$academia->Telefono=="")
{
    $error=true;
    $mensaje="ACADEMIA NO VALIDA";

}
else
{
    $academia->CP=(int)$academia->CP;
    $academia->Telefono=(int)$academia->Telefono;
    $conexion->query("insert into academia(nombre,direccion,codigo_postal,telefono) values('$academia->Nombre','$academia->Direccion',$academia->CP,$academia->Telefono)");
    $mensaje="ACADEMIA INSERTADA CORRECTAMENTE";
    $error=false;
}
$respuesta=array($error,$mensaje);
echo json_encode($respuesta);
$conexion->close();
?>