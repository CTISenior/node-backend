import { v4 as uuid } from 'uuid';

class Asset {
    id: string = uuid();
    name: string;
    city: string;
    location: string;
    capacity: string;
    description: string;
    owner: string;
    tenantId: string = uuid(); 

    constructor(id: string = uuid(), name: string, city: string, location: string, capacity: string, description: string, owner: string, tenantId: string = uuid()) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.location = location; 
        this.capacity = capacity;
        this.description = description; 
        this.owner = owner;
        this.tenantId = tenantId; 
    }

    getName() : string {
        return this.name;
    }
    
    setName(name: string) {
        this.name = name;
    }
}