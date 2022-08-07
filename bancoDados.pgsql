CREATE TABLE cliente (
    cpf numeric NOT NULL,
    nome varchar(200) NOT NULL,
    email numeric,
    CONSTRAINT cliente_pk PRIMARY KEY (cpf)
);
CREATE UNIQUE INDEX cliente_cpf_idx ON public.cliente USING btree (cpf);

INSERT INTO cliente (cpf, nome, email)  VALUES(02536978952, 'Juliano Caetano', 'juliano.bhmg@gmail.com');
INSERT INTO cliente (cpf, nome, email)  VALUES(12545548788, 'Raquel Pinheiro', 'lojaraquelpinheiro@gmail.com');
INSERT INTO cliente (cpf, nome, email)  VALUES(23232323232, 'Maria Lucia',     'jr.raquelpinheiro@gmail.com');
SELECT * FROM cliente;

commit;
