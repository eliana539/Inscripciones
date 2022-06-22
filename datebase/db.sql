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