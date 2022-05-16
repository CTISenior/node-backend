import { MemoryStore } from "express-session";
import KeycloakConnect = require("keycloak-connect");

export class KeycloakService {
  private keycloak: KeycloakConnect.Keycloak;
  private memoryStore: MemoryStore;

  constructor() {
    this.initKeycloak();
  }

  public initKeycloak(): KeycloakConnect.Keycloak {
    if (this.keycloak) {
      console.debug("Trying to init Keycloak again!");
      return this.keycloak;
    } else {
      console.debug("Initializing Keycloak...");
      this.memoryStore = new MemoryStore();
      this.keycloak = new KeycloakConnect({store: this.memoryStore}, "../config/keycloak.json");
      return this.keycloak;
    }
  }

  public getKeycloakInstance(): KeycloakConnect.Keycloak {
    return this.keycloak;
  }

  public getMemoryStore(): MemoryStore {
    return this.memoryStore;
  }

}