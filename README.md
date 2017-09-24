# NodeFR
mini framework para [NodeJS](https://github.com/nodejs/node) que usa las caracteristicas de ES6

## Requerimientos
- NodeJS  >=  6.9.1.
- Git >= 2.7.4.


## Instalación

1. Instalar nodefr
```
$ npm install -g nodefr
```
2. Crear Proyecto
```
$ nodefr --new my-app

$ cd my-app
```
3. Instalar dependencias
```
$ npm install
```
4. Up
```
//visit -> http://localhost:4000/testroute
$ npm run demon
```

## CLI Interface
* para crear un projecto nuevo
```
$ nodefr --new [name]
```
* para generar rutas.
```
$ nodefr --generate route [name]
```
* para generar modelos.
```
$ nodefr --generate model [name]
```
