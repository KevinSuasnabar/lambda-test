# lambda-test



## APLICACION LAMBDA PARA PRUEBA TECNICA
En esta aplicacion se implementan dos lambdas segun los requerimientos de la prueba tecnica. En este caso se utilizao el api de SWAPI apuntando al enpoint de starships https://swapi.dev/api/starships. 

Se utilizaron patrondes de desarrollo para el correcto entendimiento y legilibididad del codigo, ademas del rendimiento.


## LAMBDAS CREADOS

### starships-data-create
Lambda creado para el caso de uso de crear un starship en nuestra base de datos dynamo

### starships-data-info
Lambda creado para el caso de uso de consultar un starship por id

## DATABASE
Se usa una base de datos dynamo para poder mapear las entidades necesarias

## OTRAS ESPECIFICACIONES
Este proyecto se desarrollo en base a capas y casos de uso, cada capa es independiente de la otra y las funciones en ellas respetan los lineamientos de SOLID.

## LEVANTAR ENTORNO LOCAL
```
 1. npm install
 2. npm start
```

## ENDPOINTS LOCALES

### starships-data-create
```
http://localhost:3000/star-ships/create
```
#### Ejemplo request :
```
{
    "name": "test-name",
    "modelo": "test-modelo",
    "fabricante": "test-fabricante",
    "costoEnCreditos": "test-costoEnCreditos",
    "longitud": "test-longitud",
    "velocidadMaximaAtmosferica": "test-velocidadMaximaAtmosferica",
    "tripulacion": "test-tripulacion",
    "pasajeros": "test-pasajeros",
    "capacidadCarga": "test-capacidadCarga",
    "consumibles": "test-consumibles",
    "indiceDeHipervelocidad": "test-indiceDeHipervelocidad",
    "MGLT": "test-MGLT",
    "claseDeNave": "test-claseDeNave",
    "pilotos": [],
    "peliculas": [],
    "url": "test-name"
}

```



### starships-data-info
```
http://localhost:3000/star-ships/:starshipId
```
#### Ejemplo request :
```
http://localhost:3000/star-ships/3
```




## Puntos mínimos-obligatorios del MVP:

- Mínimo 2 endpoints, GET para recuperar la información y PST para crear un elemento ✅
- Integración con una base de datos (DynamoDB o MySQL) ✅
- Integración con SWAPI ✅
- Traducción de atributos de inglés a español ✅
- Uso de Serverless Framework ✅
- Uso de Node.js ✅
- Respeto de las buenas prácticas de desarrollo ✅

## Puntos Bonus:
- Pruebas unitarias
- Uso de TypeScript ✅
- Documentación de uso ✅
- Documentación en Open API/Swagger
- Desplegar sin errores en AWS con el comando deploy del framework serverless
- Mayor complejidad de Integración ✅
- Uso de un Framework ✅
- Trabajar en capas y por dominio ✅