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
    realm_id STRING(255) NOT NULL,
    client_id STRING(255),
    
    name STRING NOT NULL,
    country STRING(50) NOT NULL,
    city STRING(50) NOT NULL,
    postcode STRING(50) NOT NULL,
    address STRING(50) NOT NULL,
    phone STRING(50) NOT NULL,
    email STRING(50) NOT NULL,
    coordinates STRING(255),
    description TEXT,
    owner STRING(30) NOT NULL DEFAULT 'admin',

    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id),
    UNIQUE(realm_id)
);

-----INSERT INTO tenants (name, country, city, postcode, address, phone, email) VALUES
-----('BilkentUni', 'Turkey', 'Ankara', '06800', 'Bilkent University Campus Cankaya', '+90 312 290 4000', 'mail@bilkent.edu.tr');

----------- assets
DROP TABLE IF EXISTS public."assets";
CREATE TABLE IF NOT EXISTS public."assets"
(
    id UUID DEFAULT gen_random_uuid(),
    
    name STRING NOT NULL,
    city STRING(50) NOT NULL,
    location STRING(255) NOT NULL,
    capacity SMALLINT,
    description TEXT,
    owner STRING(30) NOT NULL DEFAULT 'admin',

    tenant_id STRING(255) NOT NULL DEFAULT 'ctis',

    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);
-------FOREIGN KEY

----------- devices
DROP TABLE IF EXISTS public."devices";
CREATE TABLE IF NOT EXISTS public."devices"
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    sn STRING NOT NULL,
    
    name STRING NOT NULL,
    protocol STRING(30) NOT NULL DEFAULT 'mqtt',
    model STRING NOT NULL,
    types STRING[] NOT NULL,
    max_values INT[] NOT NULL,
    description TEXT NOT NULL,
    owner STRING(30) NOT NULL DEFAULT 'admin',
    access_token INT,
    status BOOL DEFAULT true,

    asset_id UUID,
    tenant_id STRING(255) NOT NULL DEFAULT 'ctis',
    
    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMP,
    created_at timestamp DEFAULT NOW(),
    
    PRIMARY KEY (id),
    UNIQUE (sn)
);
-------FOREIGN KEY


----------- device_telemetries
DROP TABLE IF EXISTS public."device_telemetries";
CREATE TABLE IF NOT EXISTS public."device_telemetries"
(
    id INT DEFAULT unique_rowid(),
    sn STRING NOT NULL,
    value JSONB NOT NULL,

    device_id UUID,
    asset_id UUID,
    tenant_id STRING,

    timestamp INT NOT NULL,
    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at timestamp DEFAULT NOW(),
    
    PRIMARY KEY (id)
);


----------- device_alerts
DROP TABLE IF EXISTS public."device_alerts";
CREATE TABLE IF NOT EXISTS public."device_alerts"
(
    id INT DEFAULT unique_rowid(),
    sn STRING NOT NULL,

    telemetry_key STRING(50) NOT NULL,
    type STRING(50) NOT NULL,
    severity STRING(50),
    message TEXT NOT NULL,
    status BOOL NOT NULL DEFAULT false,

    device_id UUID,
    asset_id UUID,
    tenant_id STRING,
    
    timestamp INT NOT NULL,
    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at timestamp DEFAULT NOW(),

    PRIMARY KEY (id)
);


------------------------------------------------------ LOGS ------------------------------------------------------------------------
DROP TABLE IF EXISTS public."system_logs";
CREATE TABLE IF NOT EXISTS public."system_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,

    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS public."tenant_logs";
CREATE TABLE IF NOT EXISTS public."tenant_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,

    tenant_id UUID NOT NULL,
    
    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS public."asset_logs";
CREATE TABLE IF NOT EXISTS public."asset_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,

    asset_id UUID NOT NULL,

    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS public."device_logs";
CREATE TABLE IF NOT EXISTS public."device_logs"
(
    id INT DEFAULT unique_rowid(),
    log_msg TEXT NOT NULL,

    device_id UUID NOT NULL,

    timestamptz TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);