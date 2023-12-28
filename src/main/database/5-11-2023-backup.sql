--- Clientes
INSERT INTO tblClientes(name, app, apm, tel) VALUES ( 'Augusto', 'Sanchez','Julian', '22-27-73-90-60');
INSERT INTO tblClientes(name, app, apm, tel) VALUES ( 'Javier', 'Tapia','Julian', '231-111-2365');
INSERT INTO tblClientes(name, app, apm, tel) VALUES ( 'Maria Aurea', 'Julian','Vazquez', '');
INSERT INTO tblClientes(name, app, apm, tel) VALUES ( 'Areli', 'Murrieta','Julian', '');
INSERT INTO tblClientes(name, app, apm, tel) VALUES ( 'Rafael', 'Carreón','', '123-456-9877');
--- Direcciones
INSERT INTO tblDirecciones(id_client, direccion) VALUES ( 1, 'Calle 6 sur');
INSERT INTO tblDirecciones(id_client, direccion) VALUES ( 2, 'direccion 1');
INSERT INTO tblDirecciones(id_client, direccion) VALUES ( 1, 'Calle 11 oriente');
INSERT INTO tblDirecciones(id_client, direccion) VALUES ( 2, 'Calle 6 sur');
INSERT INTO tblDirecciones(id_client, direccion) VALUES ( 3, 'Calle 10 sur');
--- Productos
INSERT INTO tblProductos(concepto, precio) VALUES ('Leche tamariz 1 litro', 250.4);
INSERT INTO tblProductos(concepto, precio) VALUES ('Bulto de azúcar de 50 kg', 520.45);
INSERT INTO tblProductos(concepto, precio) VALUES ('Laptop Acer Pavilion F15 Aspire', 20400);
INSERT INTO tblProductos(concepto, precio) VALUES ('pruebas de bakcup en sql', 25);
INSERT INTO tblProductos(concepto, precio) VALUES ('Lata de chiles San Marcos', 1200);
