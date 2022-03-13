INSERT INTO public."devices"(
	sn, name, protocol, type, keys)
	VALUES ('abc123', 'Device111', 'mqtt', 'test', ARRAY ['temp','hum']);



INSERT INTO public."Devices"(
	sn, name, protocol, type, keys)
	VALUES ('xyz123', 'Device211', 'http', 'test', ARRAY ['temp']);