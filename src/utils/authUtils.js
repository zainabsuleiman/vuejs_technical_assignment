import { router } from "../router/index";
import { store } from "../store";
import { alert } from "./alertUtils";

class AuthUtils {
    static checkBeforeLogin(user) {
        if (user.defaultPassword) {
            router.push("/defaultPassword");
        } else if (user.emailVerified) {
            if (user.registrant !== null) {
                if (user.registrant.status === "PENDING" || user.registrant.status === "REJECTED")
                    router.push("/pendingPage")
                else
                    router.push("/dashboard");
            } else {
                if (user.authorities.find(role => role.authority === "ROLE_SUPERADMIN"))
                    router.push("/dashboard");
                else
                    router.push("/register");

            }
        } else {
            router.push("/email_verification")
        }
    }

    static isAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            return true
        }
        return false;
    }

    static isSuperAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_SUPERADMIN")) {
            return true
        }
        return false;
    }
    static isIndividual() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            if (store.state.auth.user.registrant.type === "INDIVIDUAL") {
                return true;
            }
            return false;
        }
        return false
    }
    static isRestaurantAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            if (store.state.auth.user.registrant.type === "RESTAURANT") {
                return true;
            }
            return false;
        }
        return false
    }
    static isIndividualAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            if (store.state.auth.user.registrant.type === "INDIVIDUAL") {
                return true;
            }
            return false;
        }
        return false
    }
    static isOrganizationAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            if (store.state.auth.user.registrant.type === "ORGANIZATION") {
                return true;
            }
            return false;
        }
        return false
    }
    static isGroupAdmin() {
        if (store.state.auth.user.authorities.find(role => role.authority === "ROLE_ADMIN")) {
            if (store.state.auth.user.registrant.type === "GROUP") {
                return true;
            }
            return false;
        }
        return false
    }
    static checkIfTokenExpired(err) {
        if (err.response) {
            if (err.response.status === 401 && err.response.data.error === "invalid_token") {
                store.dispatch("logout");
                return true;
            }
            return false;
        } else {
            alert.error(err);
            return true;
        }
    }
}

export default AuthUtils;