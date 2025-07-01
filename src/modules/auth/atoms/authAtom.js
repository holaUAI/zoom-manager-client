import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage("firebaseAuth", {
    isAuthenticated: false,
    user: null
});
