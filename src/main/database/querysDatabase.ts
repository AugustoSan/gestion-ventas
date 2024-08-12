import { IQueryDB } from "../interfaces";

export const tblClientes:IQueryDB =
{
  name: 'tblClientes',
  type: 'table',
  query: `CREATE TABLE tblClientes
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
        name text NOT NULL DEFAULT '-',
        app text NOT NULL DEFAULT '-',
        apm text DEFAULT '-',
        tel text DEFAULT '-',
        PRIMARY KEY (id)
    );`
}

export const tblDirecciones :IQueryDB =
{
  query: `CREATE TABLE tblDirecciones
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
      id_client integer NOT NULL DEFAULT 0,
      direccion text NOT NULL DEFAULT '-',
      PRIMARY KEY (id)
  );`,
  name: 'tblDirecciones',
  type: 'table'
}

export const tblProductos:IQueryDB =
{
  query : `CREATE TABLE tblProductos
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
      concepto text NOT NULL DEFAULT '-',
      precio numeric(15,2) NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
  );`,
  name: 'tblProductos',
  type: 'table'
};

export const tblVentas:IQueryDB =
{
  query: `CREATE TABLE tblVentas
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
        id_client integer NOT NULL DEFAULT 0,
        id_direccion integer NOT NULL DEFAULT 0,
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        total numeric(15,2) NOT NULL DEFAULT 0,
        por_pagar numeric(15,2) NOT NULL DEFAULT 0,
        estatus integer NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
    );`,
    name: 'tblVentas',
    type: 'table'
};

export const tblVentaProductos:IQueryDB =
{
  query: `CREATE TABLE tblVentaProductos
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
      id_venta integer NOT NULL DEFAULT 0,
      id_producto integer NOT NULL DEFAULT 0,
      precio numeric(15,2) NOT NULL DEFAULT 0,
      cantidad integer NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
  );`,
  name: 'tblVentaProductos',
  type: 'table'
};

export const tblPagos:IQueryDB =
{
  query: `CREATE TABLE tblPagos
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
      id_venta integer DEFAULT 0,
      id_cliente integer NOT NULL DEFAULT 0,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      monto numeric(15,2) NOT NULL DEFAULT 0,
      PRIMARY KEY (id)
  );`,
  name: 'tblPagos',
  type: 'table'
};

export const tblTiempoPago:IQueryDB =
{
  query: `CREATE TABLE tblTiempoPago
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( START 1 ),
        porcentaje integer DEFAULT 0,
        dias integer DEFAULT 0,
        PRIMARY KEY (id)
    );`,
  name: 'tblTiempoPago',
  type: 'table'
}

export const type_address:IQueryDB =
{
  query: `CREATE TYPE type_address AS
    (
      id INTEGER,
      direccion TEXT
    );`,
  name: 'type_address',
  type: 'type'
}

export const fn_FindAddressById:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindAddressById( _id INTEGER)
    RETURNS SETOF type_address AS
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
    $BODY$ LANGUAGE 'plpgsql';`,
  name: 'fn_FindAddressById',
  type: 'function'
}

export const fn_getAllAddressByClient:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllAddressByClient( _id INTEGER )
    RETURNS SETOF type_address AS
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
    $BODY$ LANGUAGE 'plpgsql';`,
  name: 'fn_getAllAddressByClient',
  type: 'function'
}

export const type_datos_clientes:IQueryDB =
{
  query: `CREATE TYPE type_datos_clientes AS
    (
      id INTEGER,
      nombre            TEXT,
      apellidoPaterno   TEXT,
      apellidoMaterno   TEXT,
      telefono          TEXT
    );`,
  name: 'type_datos_clientes',
  type: 'type'
}

export const fn_getAllClients:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllClients()
RETURNS SETOF type_datos_clientes AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllClients',
type: 'function'
}

export const fn_findMatchClients:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_findMatchClients( texto TEXT)
RETURNS SETOF type_datos_clientes AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_findMatchClients',
type: 'function'
}

export const fn_FindClientById:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindClientById( _id INTEGER)
RETURNS SETOF type_datos_clientes AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_FindClientById',
type: 'function'
}

export const fn_insertClient:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_insertClient( _name TEXT, _app TEXT, _apm TEXT, _tel TEXT, _dir TEXT[])
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_insertClient',
type: 'function'
}

export const fn_updateClient:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_updateClient( _id INTEGER, _name TEXT, _app TEXT, _apm TEXT, _tel TEXT)
    RETURNS INTEGER AS $BODY$
    BEGIN
      UPDATE tblClientes SET name=_name, app=_app, apm=_apm, tel=_tel WHERE id=_id;
      RETURN _id;
    END
    $BODY$ LANGUAGE 'plpgsql';`,
  name: 'fn_updateClient',
  type: 'function'
}


export const fn_deleteClient:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_deleteClient( _id INTEGER)
    RETURNS INTEGER AS $BODY$
    BEGIN
      DELETE FROM tblClientes WHERE id=_id;
      RETURN _id;
    END
    $BODY$ LANGUAGE 'plpgsql';`,
  name: 'fn_deleteClient',
  type: 'function'
}

// -- FUNCIONES PARA DIRECCIONES

export const type_datos_direcciones:IQueryDB =
{
  query: `CREATE TYPE type_datos_direcciones AS
  (
    id          INTEGER,
    id_client   INTEGER,
    direccion   TEXT
  );`,
  name: 'type_datos_direcciones',
  type: 'type'
  }

export const fn_getAllAddress:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllAddress()
RETURNS SETOF type_datos_direcciones AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllAddress',
type: 'function'
}

export const fn_insertAddress:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_insertAddress( _id_client INTEGER, _direction TEXT)
RETURNS INTEGER AS $BODY$
DECLARE _id INTEGER;
BEGIN
	INSERT INTO tblDirecciones(id_client, direccion) VALUES (_id_client, _direction) RETURNING id INTO _id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_insertAddress',
type: 'function'
}

export const fn_updateAddress:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_updateAddress( _id INTEGER, _direction TEXT)
RETURNS INTEGER AS $BODY$
BEGIN
	UPDATE tblDirecciones SET direccion=_direction WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_updateAddress',
type: 'function'
}

export const fn_deleteAddress:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_deleteAddress( _id INTEGER)
RETURNS INTEGER AS $BODY$
BEGIN
	DELETE FROM tblDirecciones WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_deleteAddress',
type: 'function'
}

export const type_datos_productos:IQueryDB =
{
  query: `CREATE TYPE type_datos_productos AS
  (
    id        INTEGER,
    concepto  TEXT,
    precio    NUMERIC(15,2)
  );`,
name: 'type_datos_productos',
type: 'type'
}

export const fn_getAllProducts:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllProducts()
RETURNS SETOF type_datos_productos AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllProducts',
type: 'function'
}


export const fn_findMatchProducts:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_findMatchProducts( texto TEXT)
RETURNS SETOF type_datos_productos AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_findMatchProducts',
type: 'function'
}

export const fn_FindProductById:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindProductById( _id INTEGER)
RETURNS SETOF type_datos_productos AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_FindProductById',
type: 'function'
}

export const fn_insertProduct:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_insertProduct( _concepto TEXT, _precio NUMERIC)
RETURNS INTEGER AS $BODY$
DECLARE _id INTEGER;
BEGIN
	INSERT INTO tblProductos(concepto, precio) VALUES (_concepto, _precio) RETURNING id INTO _id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_insertProduct',
type: 'function'
}

export const fn_updateProduct:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_updateProduct( _id INTEGER, _concepto TEXT, _precio NUMERIC)
RETURNS INTEGER AS $BODY$
BEGIN
	UPDATE tblProductos SET concepto=_concepto, precio=_precio WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_updateProduct',
type: 'function'
}

export const fn_deleteProduct:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_deleteProduct( _id INTEGER)
RETURNS INTEGER AS $BODY$
BEGIN
	DELETE FROM tblProductos WHERE id=_id;
	RETURN _id;
END
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_deleteProduct',
type: 'function'
}

export const type_datos_ventas:IQueryDB =
{
  query: `CREATE TYPE type_datos_ventas AS
(
  id            INTEGER,
  id_client     INTEGER,
  id_direccion  INTEGER,
  fecha         TIMESTAMP,
  total         NUMERIC,
  por_pagar     NUMERIC,
  estatus       INTEGER
);`,
name: 'type_datos_ventas',
type: 'type'
}

export const fn_getAllVentas:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllVentas()
RETURNS SETOF type_datos_ventas AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllVentas',
type: 'function'
}

export const fn_FindVentaById:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindVentaById( _id INTEGER)
RETURNS SETOF type_datos_ventas AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_FindVentaById',
type: 'function'
}

export const type_venta_productos:IQueryDB =
{
  query: `CREATE TYPE type_venta_productos AS
(
  id INTEGER,
  id_venta INTEGER,
  id_producto INTEGER,
  precio NUMERIC,
  cantidad INTEGER
);`,
name: 'type_venta_productos',
type: 'type'
}

export const fn_getAllProductsByVenta:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllProductsByVenta( _id INTEGER )
RETURNS SETOF type_venta_productos AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllProductsByVenta',
type: 'function'
}

export const type_ventas:IQueryDB =
{
  query: `CREATE TYPE type_ventas AS
(
  id INTEGER,
  direccion TEXT,
  id_direccion INTEGER,
  fecha TIMESTAMP,
  total NUMERIC,
  por_pagar NUMERIC,
  estatus INTEGER
);`,
name: 'type_ventas',
type: 'type'
}

export const fn_getAllVentasByClient:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_getAllVentasByClient( _id INTEGER )
RETURNS SETOF type_ventas AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_getAllVentasByClient',
type: 'function'
}

export const type_product_venta:IQueryDB =
{
  query: `CREATE TYPE type_product_venta AS (
    id_producto INTEGER,
    precio NUMERIC,
    cantidad INTEGER
);`,
name: 'type_product_venta',
type: 'type'
};

export const fn_insertVenta:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_insertVenta(
    _id_client INTEGER,
    _id_direccion INTEGER,
    _total NUMERIC,
    _pagado NUMERIC,
    _fecha TIMESTAMP,
    _products type_product_venta[]
)
RETURNS INTEGER AS $BODY$
DECLARE
    _id INTEGER;
    _status INTEGER;
    _por_pagar NUMERIC;
    _product type_product_venta;
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_insertVenta',
type: 'function'
}

export const type_pago:IQueryDB =
{
  query: `CREATE TYPE type_pago AS (
	id INTEGER,
	id_venta INTEGER,
	fecha TIMESTAMP,
	monto NUMERIC
);`,
name: 'type_pago',
type: 'type'
}

export const fn_FindPagoById:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindPagoById( _id INTEGER)
RETURNS SETOF type_pago AS
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
$BODY$ LANGUAGE 'plpgsql';`,
name: 'fn_FindPagoById',
type: 'function'
}

export const fn_FindPagosByVenta:IQueryDB =
{
  query: `CREATE OR REPLACE FUNCTION fn_FindPagosByVenta( _id INTEGER)
    RETURNS SETOF type_pago AS
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
    $BODY$ LANGUAGE 'plpgsql';`,
  name: 'fn_FindPagosByVenta',
  type: 'function'
};
