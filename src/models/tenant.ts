import { v4 as uuid } from 'uuid';

class Tenant {
    private id: string = uuid();
    private name: string;
    private country: string;
    private city: string;
    private address: string;
    private postcode: string;
    private email: string;
    private phone: string;

    constructor(id: string = uuid(), name: string, country: string, city: string, address: string, postcode: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city; 
        this.address = address;
        this.postcode = postcode; 
        this.email = email;
        this.phone = phone; 
    }

    getName() : string {
        return this.name;
    }
    
    setName(name: string) {
        this.name = name;
    }
}