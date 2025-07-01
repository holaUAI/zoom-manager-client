import { auth } from "../../auth/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const isAuthenticated = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(!!user);
        });
    });
};
