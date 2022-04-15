SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS iotwin CASCADE;
CREATE DATABASE IF NOT EXISTS iotwin;

USE iotwin;

SET TIME ZONE "Europe/Istanbul";

----------- tenants
DROP TABLE IF EXISTS public."tenants";
CREATE TABLE IF NOT EXISTS public."tenants"
(
    id UUID DEFAULT gen_random_uuid(),
    name STRING NOT NULL,
    country STRING(50) NOT NULL,
    city STRING(50) NOT NULL,
    postcode STRING(50) NOT NULL,
    address STRING(50) NOT NULL,
    phone STRING(50) NOT NULL,
    email STRING(50) NOT NULL,
    coordinates STRING,
    description STRING,
    owner STRING(30) NOT NULL DEFAULT 'admin',
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);

INSERT INTO tenants (name, country, city, postcode, address, phone, email) VALUES
('BilkentUni', 'Turkey', 'Ankara', '06800', 'Bilkent University Campus Cankaya', '+90 312 290 4000', 'mail@bilkent.edu.tr');

----------- assets
DROP TABLE IF EXISTS public."assets";
CREATE TABLE IF NOT EXISTS public."assets"
(
    id UUID DEFAULT gen_random_uuid(),
    tenant_id INT8 NOT NULL DEFAULT 1,
    name STRING NOT NULL,
    city STRING(50) NOT NULL,
    location STRING(255) NOT NULL,
    coordinates STRING,
    description STRING,
    owner STRING(30) NOT NULL DEFAULT 'admin',
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);

----------- devices
--CREATE SEQUENCE IF NOT EXISTS device_seq;
DROP TABLE IF EXISTS public."devices";
CREATE TABLE IF NOT EXISTS public."devices"
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    sn STRING NOT NULL,
    name STRING NOT NULL,
    protocol STRING(30) NOT NULL DEFAULT 'MQTT',
    model STRING NOT NULL,
    type STRING[] NOT NULL,
    max_values INT[] NOT NULL DEFAULT '[]',
    description STRING NOT NULL,
    owner STRING(30) NOT NULL DEFAULT 'admin',
    access_token INT8,
    status BOOL DEFAULT true,

    tenant_id INT NOT NULL DEFAULT 1,
    asset_id INT NOT NULL DEFAULT 1,

    timestamptz timestamptz DEFAULT NOW(),
    created_at timestamp DEFAULT NOW(),
    updated_at TIME,
    
    CONSTRAINT "primary" PRIMARY KEY (id ASC),
    UNIQUE (sn)
);


----------- device_telemetries
DROP TABLE IF EXISTS public."device_telemetries2";
CREATE TABLE IF NOT EXISTS public."device_telemetries2"
(
    id INT DEFAULT unique_rowid(),
    device_id INT NOT NULL,
    sn STRING NOT NULL,
    value JSONB NOT NULL,

    timestamp INT NOT NULL,
    created_at timestamp DEFAULT NOW(),

    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);


DROP TABLE IF EXISTS public."device_telemetries";

DROP SEQUENCE IF EXISTS telemetry_seq;
CREATE SEQUENCE telemetry_seq START 1 MINVALUE 0 INCREMENT 1;

CREATE TABLE IF NOT EXISTS public."device_telemetries"
(
    id INT PRIMARY KEY DEFAULT nextval('telemetry_seq'),
    sn STRING NOT NULL,
    value JSONB NOT NULL,

    timestamp INT NOT NULL,
    created_at timestamp DEFAULT NOW()
);

----------- device_alerts



DROP TABLE IF EXISTS public."device_alerts";

DROP SEQUENCE IF EXISTS alert_seq;
CREATE SEQUENCE alert_seq START 1 MINVALUE 0 INCREMENT 1;

CREATE TABLE IF NOT EXISTS public."device_alerts"
(
    id INT PRIMARY KEY DEFAULT nextval('alert_seq'),
    sn STRING NOT NULL,

    telemetry_key STRING(50) NOT NULL,
    type STRING(30) NOT NULL,
    message TEXT NOT NULL,
    status BOOL NOT NULL DEFAULT FALSE,
    
    timestamp INT NOT NULL,
    created_at timestamp DEFAULT NOW()
);

---------------id INT DEFAULT unique_rowid(),
---------------CONSTRAINT "primary" PRIMARY KEY (id ASC)

------------------------------------------------------ LOGS ------------------------------------------------------------------------


DROP TABLE IF EXISTS public."system_logs";
CREATE TABLE IF NOT EXISTS public."system_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);


DROP TABLE IF EXISTS public."tenant_logs";
CREATE TABLE IF NOT EXISTS public."tenant_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);


DROP TABLE IF EXISTS public."asset_logs";
CREATE TABLE IF NOT EXISTS public."asset_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);

DROP TABLE IF EXISTS public."device_logs";
CREATE TABLE IF NOT EXISTS public."device_logs"
(
    id INT DEFAULT unique_rowid(),
    log TEXT NOT NULL,
    timestampz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT "primary" PRIMARY KEY (id ASC)
);