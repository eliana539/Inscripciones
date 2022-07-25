CREATE DATABASE db_inscripcion;

USE db_inscripcion;

CREATE TABLE alumnos (
    legajo INT(11) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR (30) NOT NULL,
    
)
 
CREATE TABLE alumno_mail(
    legajo INT (11) NOT NULL,
    mail VARCHAR(35) NOT NULL,
)
 CREATE TABLE alumno_tel(
    legajo INT (10) NOT NULL,
    telefono INT (15) NOT NULL,
)
 ALTER TABLE alumnos 
    ADD PRIMARY KEY (legajo);

ALTER TABLE alumnos 
  DROP nombre;

DESCRIPTION alumnos;

 drop table alumnos 

alter table alumno_mail rename usuarios_mail

alter table usuarios 
add contrasenia VARCHAR (100); 

alter table usuarios change Nombre nombre VARCHAR (50);
alter table usuarios change Apellido apellido VARCHAR (50);
alter table usuarios change DNI dni int(12);
alter table usuarios_mail change mail email varchar(15);
 ALTER TABLE usuarios  auto_increment = 1; 
 alter table usuarios add COLUMN nombre_usuario VARCHAR(20);
 ALTER TABLE usuarios DROP COLUMN nombre_usuario;
 alter table usuarios add COLUMN domicilio VARCHAR(50);
 alter table usuarios add COLUMN fechaNacimiento VARCHAR(20);
 DELETE from usuarios;
 DELETE from usuarios;
  DELETE from usuarios_mail;