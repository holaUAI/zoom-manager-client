import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { getUserByEmail } from "../api/user";

export const useLogin = () => {
    const setAuth = useSetAtom(authAtom);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const response = await getUserByEmail(user.email);
        const username = response?.data?.username || null;

        setAuth({
            isAuthenticated: true,
            user: {
                uid: user.uid,
                email: user.email,
                username
            }
        });
        return user;
    };

    return { login };
};