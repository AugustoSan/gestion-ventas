
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

-- FUNCIONES PARA CLIENTES

-- Obtener las direcciones de un cliente
CREATE TYPE type_address AS
(
  id INTEGER,
  direccion TEXT
);

-- Buscar una direccion desde si id
CREATE OR REPLACE FUNCTION fn_FindAddressById( _id INTEGER)
RETURNS SETOF type_address AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT id, direccion FROM tblDirecciones 
                WHERE 
                id = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_getAllAddressByClient( _id INTEGER )
RETURNS SETOF type_address AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT id, direccion FROM tblDirecciones WHERE id_client=_id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Obtener todos los clientes
CREATE TYPE datos_clientes AS
(
  id INTEGER,
  nombre            TEXT,
  apellidoPaterno   TEXT,
  apellidoMaterno   TEXT,
  telefono          TEXT
);

CREATE OR REPLACE FUNCTION fn_getAllClients()
RETURNS SETOF datos_clientes AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT *  FROM tblClientes
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Buscar los clientes que hagan match con el texto
CREATE OR REPLACE FUNCTION fn_findMatchClients( texto TEXT)
RETURNS SETOF datos_clientes AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblClientes 
                WHERE 
                name ILIKE '%' || texto ||  '%' OR 
                app ILIKE '%' || texto ||  '%' OR 
                apm ILIKE '%' || texto ||  '%' OR 
                tel ILIKE '%' || texto ||  '%'
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_FindClientById( _id INTEGER)
RETURNS SETOF datos_clientes AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblClientes 
                WHERE 
                id = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Insertar un cliente
CREATE OR REPLACE FUNCTION fn_insertClient( _name TEXT, _app TEXT, _apm TEXT, _tel TEXT, _dir TEXT[])
RETURNS INTEGER AS $BODY$
DECLARE _id INTEGER;
DECLARE _direction TEXT;
BEGIN
	INSERT INTO tblClientes(name, app, apm, tel) VALUES (_name, _app, _apm, _tel) RETURNING id INTO _id;
    -- Loop through the _dir array and insert each address
    FOREACH _direction IN ARRAY _dir
    LOOP
        INSERT INTO tblDirecciones(id_client, direccion) 
        VALUES (_id, _direction);
    END LOOP;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- UPDATE tblClientes SET name=$1, app=$2, apm=$3, tel=$4 WHERE id=$5
-- Actualizar los datos de un cliente
CREATE OR REPLACE FUNCTION fn_updateClient( _id INTEGER, _name TEXT, _app TEXT, _apm TEXT, _tel TEXT)
RETURNS INTEGER AS $BODY$
BEGIN
	UPDATE tblClientes SET name=_name, app=_app, apm=_apm, tel=_tel WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Eliminar a un cliente
CREATE OR REPLACE FUNCTION fn_deleteClient( _id INTEGER)
RETURNS INTEGER AS $BODY$
BEGIN
	DELETE FROM tblClientes WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- FUNCIONES PARA DIRECCIONES

CREATE TYPE datos_direcciones AS
(
  id          INTEGER,
  id_client   INTEGER,
  direccion   TEXT
);

CREATE OR REPLACE FUNCTION fn_getAllAddress()
RETURNS SETOF datos_direcciones AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT *  FROM tblDirecciones
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';


-- Insertar una direccion
CREATE OR REPLACE FUNCTION fn_insertAddress( _id_client INTEGER, _direction TEXT)
RETURNS INTEGER AS $BODY$
DECLARE _id INTEGER;
BEGIN
	INSERT INTO tblDirecciones(id_client, direccion) VALUES (_id_client, _direction) RETURNING id INTO _id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Actualizar los de una direccion
CREATE OR REPLACE FUNCTION fn_updateAddress( _id INTEGER, _direction TEXT)
RETURNS INTEGER AS $BODY$
BEGIN
	UPDATE tblDirecciones SET direccion=_direction WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Eliminar una direccion
CREATE OR REPLACE FUNCTION fn_deleteAddress( _id INTEGER)
RETURNS INTEGER AS $BODY$
BEGIN
	DELETE FROM tblDirecciones WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

---FUNCIONES PARA PRODUCTOS

CREATE TYPE datos_productos AS
(
  id        INTEGER,
  concepto  TEXT,
  precio    NUMERIC(15,2)
);

CREATE OR REPLACE FUNCTION fn_getAllProducts()
RETURNS SETOF datos_productos AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT *
                FROM tblProductos
                ORDER BY concepto ASC
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';


-- Buscar los productos que hagan match con el texto
CREATE OR REPLACE FUNCTION fn_findMatchProducts( texto TEXT)
RETURNS SETOF datos_productos AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblProductos 
                WHERE concepto ILIKE '%' || texto ||  '%'
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION fn_FindProductById( _id INTEGER)
RETURNS SETOF datos_productos AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblProductos 
                WHERE 
                id = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Insertar un producto
CREATE OR REPLACE FUNCTION fn_insertProduct( _concepto TEXT, _precio NUMERIC)
RETURNS INTEGER AS $BODY$
DECLARE _id INTEGER;
BEGIN
	INSERT INTO tblProductos(concepto, precio) VALUES (_concepto, _precio) RETURNING id INTO _id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Actualizar un producto
CREATE OR REPLACE FUNCTION fn_updateProduct( _id INTEGER, _concepto TEXT, _precio NUMERIC)
RETURNS INTEGER AS $BODY$
BEGIN
	UPDATE tblProductos SET concepto=_concepto, precio=_precio WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Eliminar un producto
CREATE OR REPLACE FUNCTION fn_deleteProduct( _id INTEGER)
RETURNS INTEGER AS $BODY$
BEGIN
	DELETE FROM tblProductos WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-------------VENTAS

CREATE TYPE datos_ventas AS
(
  id            INTEGER,
  id_client     INTEGER,
  id_direccion  INTEGER,
  fecha         TIMESTAMP,
  total         NUMERIC,
  por_pagar     NUMERIC,
  estatus       INTEGER
);

CREATE OR REPLACE FUNCTION fn_getAllVentas()
RETURNS SETOF datos_ventas AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblVentas ORDER BY fecha ASC
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Busca venta por id
CREATE OR REPLACE FUNCTION fn_FindVentaById( _id INTEGER)
RETURNS SETOF datos_ventas AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblVentas 
                WHERE 
                id = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- Obtener todos los productos de una venta
CREATE TYPE venta_productos AS
(
  id INTEGER,
  id_venta INTEGER,
  id_producto INTEGER,
  precio NUMERIC,
  cantidad INTEGER
);

CREATE OR REPLACE FUNCTION fn_getAllProductsByVenta( _id INTEGER )
RETURNS SETOF venta_productos AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT * FROM tblVentaProductos WHERE id_venta=_id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

--Obtener todas las ventas de un cliente
CREATE TYPE type_ventas AS
(
  id INTEGER,
  direccion TEXT,
  id_direccion INTEGER,
  fecha TIMESTAMP,
  total NUMERIC,
  por_pagar NUMERIC,
  estatus INTEGER
);

CREATE OR REPLACE FUNCTION fn_getAllVentasByClient( _id INTEGER )
RETURNS SETOF type_ventas AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT ventas.id AS id, dir.direccion AS direccion, ventas.id_direccion AS id_direccion,
                ventas.fecha AS fecha, ventas.total AS total, ventas.por_pagar AS por_pagar,
                ventas.estatus AS estatus
                FROM tblVentas AS ventas
                INNER JOIN tblDirecciones AS dir
                ON dir.id = ventas.id_direccion
                WHERE ventas.id_client = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

--Insertar
CREATE TYPE product_venta AS (
    id_producto INTEGER,
    precio NUMERIC,
    cantidad INTEGER
);

CREATE OR REPLACE FUNCTION fn_insertVenta(
    _id_client INTEGER,
    _id_direccion INTEGER,
    _total NUMERIC,
    _pagado NUMERIC,
    _fecha TIMESTAMP,
    _products product_venta[]
)
RETURNS INTEGER AS $BODY$
DECLARE
    _id INTEGER;
    _status INTEGER;
    _por_pagar NUMERIC;
    _product product_venta;
BEGIN
    _por_pagar = _total - _pagado;
    
    --status: 0: pagado, 1: falta por pagar, 2: pausado
    -- Determinar el estado de la venta
    IF _por_pagar = 0 THEN
        _status := 0; -- pagado
    ELSIF _por_pagar > 0 THEN
        _status := 1; -- falta por pagar
    ELSE
        _status := 2; -- pausado (caso no esperado pero manejado)
    END IF;

    -- Insertar la venta y obtener el id generado
    INSERT INTO tblVentas(id_client, id_direccion, fecha, total, por_pagar, estatus) 
    VALUES (_id_client, _id_direccion, _fecha, _total, _por_pagar, _status)
    RETURNING id INTO _id;

    -- Insertar el pago
    INSERT INTO tblPagos(id_venta, id_cliente, fecha, monto) 
    VALUES (_id, _id_client, _fecha, _pagado);

    -- Insertar cada producto en tblVentaProductos
    FOREACH _product IN ARRAY _products
    LOOP
        INSERT INTO tblVentaProductos(id_venta, id_producto, precio, cantidad) 
        VALUES (_id, _product.id_producto, _product.precio, _product.cantidad);
    END LOOP;

    RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';

-- Ejemplo de insertar la venta
-- SELECT fn_insertVenta(1, 1, 500.00, 300.00, NOW()::TIMESTAMP, ARRAY[(1, 300, 2)::product_venta]) AS id;

-- eliminar cliente                         si
-- buscar cliente                           si
-- obtener las direcciones de un cliente    si
-- obtener todos los clientes               si
-- agregar un nuevo cliente                 si
-- actualizar un cliente                    si
-- obtener todos los productos              si
-- Agregar una direccion                    si
-- actualizar una direccion                 si
-- eliminar una direccion                   si
-- Buscar producto                          si
       
-- Agregar producto                         
-- Actualizar producto                      
-- Eliminar producto                        
--

---------------Pagos
CREATE TYPE type_pago AS (
	id INTEGER,
	id_venta INTEGER,
	fecha TIMESTAMP,
	monto NUMERIC
);

-- Busca el pago por id
CREATE OR REPLACE FUNCTION fn_FindPagoById( _id INTEGER)
RETURNS SETOF type_pago AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT id, id_venta, fecha, monto FROM tblPagos 
                WHERE 
                id = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

-- busca todos los pagos desde un id venta
CREATE OR REPLACE FUNCTION fn_FindPagosByVenta( _id INTEGER)
RETURNS SETOF type_pago AS -- USAMOS NUESTRO TYPE
$BODY$
DECLARE
    reg RECORD;
BEGIN
	FOR reg IN SELECT id, id_venta, fecha, monto FROM tblPagos 
                WHERE 
                id_venta = _id
    LOOP
        RETURN NEXT reg;
    END LOOP;

    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';