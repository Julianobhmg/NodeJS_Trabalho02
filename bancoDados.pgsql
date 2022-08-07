INSERT INTO cliente (nome, cpf, email)  VALUES('Juliano Caetano', 02536978952, 'juliano.bhmg@gmail.com');
INSERT INTO cliente (nome, cpf, email)  VALUES('Raquel Pinheiro', 12545548788, 'lojaraquelpinheiro@gmail.com');
INSERT INTO cliente (nome, cpf, email)  VALUES('Maria Lucia',     23232323232, 'jr.raquelpinheiro@gmail.com');
SELECT * FROM cliente;

commit;

alter table cliente add COLUMN id numeric;

alter table cliente drop column id;