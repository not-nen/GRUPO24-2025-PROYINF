# GRUPO24-2025-PROYINF
**Integrantes:**
- Miguel Salamanca 202373564-7
- Alejandro Caceres 202373520-5
- Benjamin Caro 202304575-6
- Cristobal Barahona 202373545-0

**Tutor:** Benjamin Daza


## Recursos

- [Wiki del proyecto](https://github.com/not-nen/GRUPO24-2025-PROYINF/wiki)

- [Diagrama de contexto](https://usmcl-my.sharepoint.com/:i:/g/personal/acaceres_usm_cl/Eeua-Yi1n1JPpVbaLhWIPxUBE_t_KnMy9OXU9bn9Mv4X6g?e=j5qsBT)

- [Modelo de dominio](https://www.plantuml.com/plantuml/dpng/VLHDQnmn3BtxLvWz5XAQwvmIDYdjeJGafTUYsDgDYcqDjhoaM_hVkp6UZ9ZCzh8h2tr8J-_DTH78KcCmp-JHHfHdziKOumAKOhU1C0dQFyRQ2vkhjF_4yIbZCp42XMO91jnnOlDtIdxaG8wa-fw-G_SCpNAG83GhSXBkWU2v-SO0H_wA1Kjx2XHum1rcJ8vw6XO1hrhTigiHa_0NZqd8Wr-EdFcdduAMIy288P3dCXVyjdte5GHVXEzU90Fr-IZ27bDtWPcJVa0W3uuulTiuOwdXRKEF0Y6WwdTtW51rQd7SfqjqmF10MFRS8HCww5dlCnQ1o2spGteEo9jKpq681UCJXy9w-4L5Lp49d4A5zAMtbGLwMigyI3fWSXG9fpSbmTndSZ2Id9de7lRdPz4aWYgSwTZWczDl3bHuoqyPqh4DfojDEAfIYhWKQvYEiTR_5Ql_i5NHQ8Uv8zFnOu6x8XJ1Tobm4VxE0c7bHWvmhSUXyUmp556jFb6Ey1uk5FQiuMrT2EF8ZnY2FY8doI0Jv48ZJwwvw3RZ6ypJns5pjR4N5tRpyVBomqQfVh0P8T0HpEoROgzQx8fi1ml-LqroDachREXGhCLkjAO6Y-tHPVIkxw97a_yfvrNYU0l2nPX9PNhTawLaCrW_FK25wy9TAOEbv4BzZQQz5mWstW-suCc0BITTIyKj23xOn48xSh1-6CLgTPdPkHYqCtUmO-QH4sg8DG0pRGQxnuGPpEHP13Q2jhsQPTglljVRceFbJ7jAOCmr9bzZ-0S0)

- [Video del cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)


## Instrucciones

Para construir los contenedores:
```bash
docker-compose build
```

o si quieres consturirlos e iniciarlos:

```bash
docker-compose up --build
```

Para iniciar los contenedores (una vez ya construidos):
```bash
docker-compose up
```

Si no quieres ver la terminal de los contenedores:
```bash
docker-compose up -d
```

Para parar los contenedores:
```bash
docker-compose down
```

Para eliminar los contenedores:
```bash
docker-compose down -v
```

> [!IMPORTANT]  
> En windows, **Docker Desktop** debe estar abierto para que todo funcione como corresponde.


## URLs

- **Frontend (React)**: http://localhost:3000

- **Backend (Node)**: http://localhost:5000

- **pgAdmin**: http://localhost:8081
    - Usuario: admin@admin.com
    - Contraseña: admin


### Requerimientos

Se necesita:
- [Docker](https://www.docker.com/)