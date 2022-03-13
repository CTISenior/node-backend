-- Table: public.devices

-- DROP TABLE IF EXISTS public."devices";

CREATE TABLE IF NOT EXISTS public."devices"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    sn character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    protocol character varying(30) COLLATE pg_catalog."default" NOT NULL,
    type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    keys text[] COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    access_token uuid,
    tenant_id integer NOT NULL DEFAULT 1,
    building_id integer NOT NULL DEFAULT 1,
    owner character varying(255) NOT NULL COLLATE pg_catalog."default" DEFAULT 'admin'::character varying,
    timestamptz timestamp with time zone DEFAULT NOW(),
    created_at time without time zone DEFAULT NOW(),
    updated_at time without time zone,
    status boolean DEFAULT true,
    CONSTRAINT "devices_pkey" PRIMARY KEY ("id"),
    CONSTRAINT sn UNIQUE (sn)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."devices"
    OWNER to iotwin;