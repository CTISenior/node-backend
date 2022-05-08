import { v4 as uuid } from 'uuid';

type Alert = {
    id: string;
    telemetryKey: string;
    telemetryValue: number;
    severityType: string; 
    severity: string; 
    message: string; 
    status: boolean; 
 }
 
 type Telemetry = {
    id: string;
    value: string;
    timestamp: string;
 }


class Device {
    private id: string = uuid();
    private sn: string;
    private name: string;
    private model: string;
    private protocol: string;
    private sensorTypes: string[];
    private maxValues: number[];
    private minValues: number[];
    private description: string;
    private owner: string;
    private status: boolean;
    private readonly accessToken: string;
    private assetId: string = uuid();
    private tenantId: string = uuid(); 
    private telemetries: (Telemetry)[] = []
    private alerts: (Alert)[] = []


    constructor(id: string = uuid(), sn: string, name: string, model: string, protocol: string, sensorTypes: string[], maxValues: number[], minValues: number[], description: string, owner: string, status: boolean, assetId: string = uuid(), tenantId: string = uuid()) {
        this.id = id;
        this.sn = sn;
        this.name = name;
        this.model = model; 
        this.protocol = protocol;
        this.sensorTypes = sensorTypes;
        this.maxValues = maxValues;
        this.minValues = minValues;
        this.description = description; 
        this.owner = owner;
        this.status = status
        this.assetId = assetId; 
        this.tenantId = tenantId; 
    }

    getName() : string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    addTelemetry(value: Telemetry) {
        this.telemetries = [...this.telemetries, value]
    }

    addAlert(value: Alert) {
        this.alerts = [...this.alerts, value]
    }
}