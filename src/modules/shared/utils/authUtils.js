import { getAuth } from "firebase/auth";
import { auth } from "../../auth/config/firebase";

export const isAuthenticated = () => {
    const user = getAuth(auth).currentUser;
    return !!user;
};
