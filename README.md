# Kiosco de Acceso

Proyecto fullstack para validar el ingreso de miembros mediante un código de acceso.

## Tecnologías

- Node.js + Express
- PostgreSQL
- Angular
- RxJS

---

# Base de Datos

El script SQL también se encuentra en:

```txt
backend/schema.sql
```

Crear base de datos:

```sql
CREATE DATABASE kiosk_access;
```

Crear tablas e insertar datos:

```sql
-- Tabla de miembros
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    access_code VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- Tabla de registros
CREATE TABLE access_logs (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    result VARCHAR(20) NOT NULL
);

-- Insertar registros
INSERT INTO members (name, access_code, status)
VALUES
    ('Edgardo Nil', 'ABC123', 'activo'),
    ('Yaderim Guzman', 'XYZ789', 'inactivo'),
    ('Roberto Garcia', 'TEST456', 'activo');
```

---

# Backend

Instalar dependencias:

```bash
cd backend
npm install
```

Crear archivo `.env`:

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kiosk_access
DB_USER=postgres
DB_PASSWORD=tu_password
```

Levantar servidor:

```bash
npm run dev
```

Servidor disponible en:

```txt
http://localhost:3000
```

---

# Frontend

Instalar dependencias:

```bash
cd frontend
npm install
```

Levantar aplicación:

```bash
ng serve
```

Abrir en navegador:

```txt
http://localhost:4200
```

---


# Pregunta Teórica

Diseñaría el agente de IA como un proceso separado del sistema principal para evitar afectar el rendimiento de las peticiones de los usuarios.

El sistema principal únicamente almacenaría los registros en la base de datos. Luego, un proceso en segundo plano ejecutado localmente en el servidor leería periódicamente esos registros y los analizaría usando modelos locales mediante herramientas como Ollama o modelos eficientes de la familia Qwen.

El agente tendría la tarea de analizar los registros y detectar comportamientos fuera de lo normal, por ejemplo múltiples intentos fallidos desde una misma IP o accesos repetitivos en un corto periodo de tiempo. Si encuentra alguna anomalía, generaría alertas o reportes para que el administrador pueda revisarlos.

Al ejecutarse de manera asíncrona y separada del flujo principal, el análisis de IA no afectaría el rendimiento del sistema.