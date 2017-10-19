# NodeFR
mini framework para [NodeJS](https://github.com/nodejs/node) que usa las caracteristicas de ES6

## Requerimientos
- NodeJS  >=  6.9.1.
- Git >= 2.7.4.


## Instalación

* Instalar nodefr
```
$ npm install -g nodefr
```
* Crear Proyecto
```
$ nodefr --new my-app

$ cd my-app
```
* Instalar dependencias
```
$ npm install
```
* Up
```
//visit -> http://localhost:4000/testroute
$ npm run demon
```

## CLI Interface
### para crear un projecto nuevo
```
$ nodefr --new [name]
```
### para generar rutas.
```
$ nodefr --generate route [name]
```
### para generar modelos.
```
$ nodefr --generate model [name]
```
### para generar resource.
los resource habilitan los verbos http como GET, POST, PUT, DELETE para la ruta especificada.
```
$ nodefr --generate resource example1
```
lo anterior generará un directorio llamado example1Resource, que incluirá dentro de ella un archivo enrutador "Example1ResourceRouter.js", un modelo "Example1ResourceModel.js" y un controlador "Example1ResourceController.js"

```
$ npm run demon 
//visit -> GET http://localhost:4000/example1resourceroute
//visit -> GET http://localhost:4000/example1resourceroute/1234
//visit -> POST http://localhost:4000/example1resourceroute
//visit -> PUT http://localhost:4000/example1resourceroute/1234
//visit -> DELETE http://localhost:4000/example1resourceroute/1234
```
y listo!, podras visitar cualquiera de las rutas anteriores con sus respectivos verbos HTTP
