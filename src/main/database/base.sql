
------- Clientes
CREATE TABLE tblClientes
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    name text NOT NULL DEFAULT '-',
    app text NOT NULL DEFAULT '-',
    apm text DEFAULT '-',
    tel text DEFAULT '-',
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblClientes
    OWNER to postgres;

------- Direcciones
CREATE TABLE tblDirecciones
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    id_client integer NOT NULL DEFAULT 0,
    direccion text NOT NULL DEFAULT '-',
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblDirecciones
    OWNER to postgres;

------- Productos
CREATE TABLE tblProductos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    concepto text NOT NULL DEFAULT '-',
    precio numeric(15,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblProductos
    OWNER to postgres;

------- Ventas
CREATE TABLE tblVentas
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    id_client integer NOT NULL DEFAULT 0,
    id_direccion integer NOT NULL DEFAULT 0,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total numeric(15,2) NOT NULL DEFAULT 0,
    por_pagar numeric(15,2) NOT NULL DEFAULT 0,
    estatus integer NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblVentas
    OWNER to postgres;


------- VentaProductos
CREATE TABLE tblVentaProductos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    id_venta integer NOT NULL DEFAULT 0,
    id_producto integer NOT NULL DEFAULT 0,
    precio numeric(15,2) NOT NULL DEFAULT 0,
    cantidad integer NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblVentaProductos
    OWNER to postgres;


------- Pagos
CREATE TABLE tblPagos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    id_venta integer DEFAULT 0,
    id_cliente integer NOT NULL DEFAULT 0,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto numeric(15,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblPagos
    OWNER to postgres;


------- TiempoPago
CREATE TABLE tblTiempoPago
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
    porcentaje integer DEFAULT 0,
    dias integer DEFAULT 0,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS tblTiempoPago
    OWNER to postgres;


---------------- Funciones

-- CREAMOS UN TIPO DE DATO ESPECIAL PARA NUESTRA CONSULTA
CREATE TYPE typeAddress AS
(
  id INTEGER,
  direccion VARCHAR(50)
);

CREATE TYPE datos_clientes AS
(
  id INTEGER,
  nombre            VARCHAR(50),
  apellidoPaterno   VARCHAR(50),
  apellidoMaterno   VARCHAR(20),
  telefono          VARCHAR(20),
  direcciones   typeAddress[]
);

CREATE FUNCTION listar_clientes_TYPE()
RETURNS SETOF datos_clientes AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
    direcciones typeAddress[];
    count integer;
BEGIN
  -- Obtenemos la informacion del cliente
    FOR REG IN SELECT id, name, app, apm, tel FROM tblClientes LOOP
      id := reg.id;
      name := reg.nombre;
      app := reg.apellidoPaterno;
      apm := reg.apellidoMaterno;
      tel := reg.telefono;

       RETURN NEXT;
    END LOOP;
  -- Obtenemos las direcciones registradas
--   FOR REG IN SELECT id, direccion FROM tblDirecciones WHERE  LOOP
--       id := .id;
--       name := reg.nombre;
--       app := reg.apellidoPaterno;
--       apm := reg.apellidoMaterno;
--       tel := reg.telefono;
--        RETURN NEXT;
--     END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql'
