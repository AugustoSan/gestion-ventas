--- Clientes 
INSERT INTO clientes(id, name, app, apm, tel) VALUES ( 1, 'Augusto', 'Sanchez','Julian', '22-27-73-90-60'); 
INSERT INTO clientes(id, name, app, apm, tel) VALUES ( 2, 'Javier', 'Tapia','Julian', '231-111-2365'); 
INSERT INTO clientes(id, name, app, apm, tel) VALUES ( 3, 'Maria Aurea', 'Julian','Vazquez', ''); 
INSERT INTO clientes(id, name, app, apm, tel) VALUES ( 4, 'Areli', 'Murrieta','Julian', ''); 
INSERT INTO clientes(id, name, app, apm, tel) VALUES ( 5, 'Rafael', 'Carreón','', '123-456-9877'); 
--- Direcciones 
INSERT INTO direcciones(id, id_client, direccion) VALUES ( 1, 1, 'Calle 6 sur'); 
INSERT INTO direcciones(id, id_client, direccion) VALUES ( 2, [object Object], 'direccion 1'); 
INSERT INTO direcciones(id, id_client, direccion) VALUES ( 3, 1, 'Calle 11 oriente'); 
INSERT INTO direcciones(id, id_client, direccion) VALUES ( 4, 2, 'Calle 6 sur'); 
INSERT INTO direcciones(id, id_client, direccion) VALUES ( 5, 3, 'Calle 10 sur'); 
--- Productos 
INSERT INTO productos(id, concepto, precio) VALUES ( 1, Leche tamariz 1 litro, '250.4'); 
INSERT INTO productos(id, concepto, precio) VALUES ( 2, Bulto de azúcar de 50 kg, '520.45'); 
INSERT INTO productos(id, concepto, precio) VALUES ( 3, Laptop Acer Pavilion F15 Aspire, '20400'); 
INSERT INTO productos(id, concepto, precio) VALUES ( 4, pruebas de bakcup en sql, '25'); 
INSERT INTO productos(id, concepto, precio) VALUES ( 5, Lata de chiles San Marcos, '1200'); 
