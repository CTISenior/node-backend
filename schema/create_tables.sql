-- Table: public.Devices

-- DROP TABLE IF EXISTS public."Devices";

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
    building character varying(255) NOT NULL COLLATE pg_catalog."default" DEFAULT 'MainBulding'::character varying,
    owner character varying(255) NOT NULL COLLATE pg_catalog."default" DEFAULT 'admin'::character varying,
    creator character varying(255) COLLATE pg_catalog."default" DEFAULT 'admin'::character varying,
    building_id integer NOT NULL DEFAULT 1,
    timestamptz timestamp with time zone NOT NULL DEFAULT NOW(),
    created_at time without time zone DEFAULT NOW(),
    updated_at time without time zone DEFAULT NOW(),
    status boolean DEFAULT true,
    CONSTRAINT "Devices_pkey" PRIMARY KEY ("ID"),
    CONSTRAINT sn UNIQUE (sn)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Devices"
    OWNER to iotwin;