import { KeycloakService } from "../services/keycloak";

const keycloak = new KeycloakService();


export default keycloak.getKeycloakInstance();
