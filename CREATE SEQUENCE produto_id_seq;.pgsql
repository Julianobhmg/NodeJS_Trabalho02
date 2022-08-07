CREATE SEQUENCE cliente_id_seq;
CREATE TABLE cliente (
    id int4 NOT NULL DEFAULT nextval('cliente_id_seq'),
    nome varchar(200) NOT NULL,
    cpf numeric NOT NULL DEFAULT 0,
    email varchar(100) NULL,
    CONSTRAINT cliente_pk PRIMARY KEY (id)
);
CREATE UNIQUE INDEX cliente_id_idx ON public.cliente USING btree (id);
