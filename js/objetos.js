
function Alumno (sNombre,sApellidos,sDni,sTel,sCorreo){
    this.Nombre = sNombre;
    this.Apellidos = sApellidos;
    this.DNI = sDni;
    this.Telefono = sTel;
    this.Correo = sCorreo;
}

function Profesor (sNombre,sApellidos,sDni,sTel,sCorreo,sIdioma,sAcademia){
    this.Nombre = sNombre;
    this.Apellidos = sApellidos;
    this.DNI = sDni;
    this.Telefono = sTel;
    this.Correo = sCorreo;
    this.Idiomas=sIdioma;
    this.Academia=sAcademia;
}


function Academia (sNombre,sDireccion,sCp,sTel){
    this.Nombre = sNombre;
    this.Direccion = sDireccion;
    this.CP = sCp;
    this.Telefono = sTel;
}


function Matricula (sDniA,sDniP,sIdio,sAcademia,sFecha){
    this.DniAlumno = sDniA;
    this.DniProfesor = sDniP;
    this.Idioma = sIdio;
    this.Academia = sAcademia;
    this.Fecha = sFecha;
}