# 🚀 Koriname API - Instructivo de Uso

Esta API permite gestionar los artículos dinámicos de **Koriname.com** desde software externo. Los artículos inyectan contenido SEO y explicativo debajo de los generadores de nombres.

---

## 🔐 Autenticación

Todas las peticiones de escritura (`POST`, `DELETE`) y el listado completo requieren un token de seguridad.

*   **Header**: `Authorization`
*   **Formato**: `Bearer TU_CONTRASEÑA_ADMIN`
*   **Contraseña**: Es el valor de `ADMIN_PASSWORD` configurado en Vercel.

---

## 📁 Endpoints

### 1. Crear o Actualizar Artículo (API Upsert)
Si el nombre y el tipo ya existen, el artículo se actualizará automáticamente.

*   **URL**: `https://koriname.com/api/articles`
*   **Método**: `POST`
*   **Body (JSON)**:
```json
{
  "name": "cesar",           // El nombre del usuario (en minúsculas/slug)
  "type": "my-name",         // Categoría: 'my-name', 'saju' o 'meaning'
  "content": "<h1>Tu HTML</h1><p>Contenido enriquecido aquí...</p>"
}
```

---

### 2. Listar todos los artículos
Útil para sincronizar o verificar lo que ya está guardado.

*   **URL**: `https://koriname.com/api/articles?list=true`
*   **Método**: `GET`
*   **Auth**: Requiere Bearer Token.

---

### 3. Consultar un artículo específico
Endpoint público (no requiere Token) usado por el frontend.

*   **URL**: `https://koriname.com/api/articles?type=my-name&name=cesar`
*   **Método**: `GET`

---

### 4. Borrar un artículo

*   **URL**: `https://koriname.com/api/articles?id=ID_DEL_ARTICULO`
*   **Método**: `DELETE`
*   **Auth**: Requiere Bearer Token.

---

## 💡 Notas Importantes para el Software Externo

1.  **Formato del Nombre**: Envía siempre el nombre en **minúsculas** y sin tildes (ej: use `eustaquia` en lugar de `Eustaquia`). El sistema lo busca de esa manera.
2.  **HTML Seguro**: Puedes enviar etiquetas `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`. El sistema inyectará automáticamente los **parlantes de audio** si detecta caracteres coreanos en el texto.
3.  **Límites**: No hay un límite estricto de longitud, pero se recomienda contenido de calidad para favorecer el SEO.
4.  **CORS**: La API acepta peticiones desde cualquier origen, permitiendo la integración con aplicaciones externas de escritorio o scripts.

---

## 🔗 Sistema de Interlinking: `[[nombre]]`

Para crear enlaces internos entre artículos, usa la sintaxis de corchetes dobles dentro del contenido HTML.

### Formatos disponibles

```
[[cesar]]              → Busca "cesar" en CUALQUIER categoría (primera que encuentre)
[[my-name:cesar]]      → Busca "cesar" SOLO en my-name
[[saju:eustaquia]]     → Busca "eustaquia" SOLO en saju
[[meaning:ahyung]]     → Busca "ahyung" SOLO en meaning
```

### Nombres con espacios

Simplemente escríbelos natural dentro de los corchetes:
```
[[ji eun]]             → Busca "ji eun" en cualquier categoría
[[meaning:ji eun]]     → Busca "ji eun" solo en meaning
[[maría josé]]         → Funciona con espacios y acentos
```

### ¿Cómo funciona?
1.  Al renderizar la página, el sistema detecta todas las etiquetas `[[...]]`.
2.  Consulta la base de datos verificando cuáles tienen artículo creado.
3.  **Si el artículo existe**: Se convierte en un enlace elegante que lleva al usuario a esa página.
4.  **Si NO existe**: Se muestra solo el nombre como texto normal (sin enlace ni corchetes).

### Ejemplo en el contenido:
```html
<p>Si te gusta este nombre, también te podría gustar [[sofia]], [[ji eun]] o [[meaning:minjun]].</p>
```

**Resultado visible para el lector** (asumiendo que "sofia" existe pero los otros no):
> Si te gusta este nombre, también te podría gustar **Sofia** (enlace) o Ji eun (texto) o Minjun (texto).

### Recomendación
*   Usa `[[nombre]]` (sin categoría) para automatización y comodidad.
*   Usa `[[tipo:nombre]]` solo cuando necesites forzar un enlace a una categoría específica.

---

*Desarrollado para Koriname.com*

