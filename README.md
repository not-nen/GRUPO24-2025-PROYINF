# GRUPO24-2025-PROYINF
**Integrantes:**
- Miguel Salamanca 202373564-7
- Alejandro Caceres 202373520-5
- Benjamin Caro 202304575-6
- Cristobal Barahona 202373545-0

**Tutor:** Benjamin Daza


## Recursos

- [Wiki del proyecto](https://github.com/not-nen/GRUPO24-2025-PROYINF/wiki)

- [Video del cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)

- [Video primer prototipo](https://usmcl-my.sharepoint.com/:v:/g/personal/acaceres_usm_cl/EbDgcjI5j8RCq2pHBBNNa5cBkJAX_3yPQFF2VGrWmEJ3CQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=9XOcPi)


## Instrucciones

Para construir los contenedores:
```bash
docker-compose build
```

Para levantar los contenedores (una vez ya construidos):
```bash
docker-compose up
```

o si quieres construirlos y levantarlos:

```bash
docker-compose up --build
```

Para levantarlos en segundo plano, sin ver los logs de los contenedores:
```bash
docker-compose up -d
```

Para detener los contenendores:
```bash
docker-compose stop
```

Para detener y eliminar los contenedores, junto con su red creada:
```bash
docker-compose down
```

Para detener y eliminar los contenedores, junto con su red creada y volumenes asociados (hacer esto para que se genere la base de datos en caso de que no aparezca):
```bash
docker-compose down -v
```

> [!IMPORTANT]  
> En windows, **Docker Desktop** debe estar abierto para que todo funcione como corresponde.

### Requerimientos

Se necesita:
- [Docker](https://www.docker.com/)

## URLs

- **Frontend (React)**: http://localhost:3000

- **Backend (Node)**: http://localhost:5000

- **pgAdmin**: http://localhost:8081
    - Usuario: admin@admin.com
    - Contraseña: admin
    - DB contraseña: postgres





