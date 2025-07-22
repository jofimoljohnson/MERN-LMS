import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null,
    });
    const [loading, setLoading] = useState(true);

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = await registerService(signUpFormData);
        console.log(data);
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await loginService(signInFormData);
        sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
        if (data.success) {
            setAuth({
                authenticate: true,
                user: data.data.user,
            });
        } else {
            setAuth({
                authenticate: false,
                user: null,
            });
        }
    };

    // check auth user
    const checkAuthUser = async () => {
        try {
            const data = await checkAuthService();

            if (data.success) {
                setAuth({
                    authenticate: true,
                    user: data.data.user,
                });
                setLoading(false);
            } else {
                setAuth({
                    authenticate: false,
                    user: null,
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (!error?.response?.data?.success) {
                setAuth({
                    authenticate: false,
                    user: null,
                });
                setLoading(false);
            }
        }
    };
    console.log(auth);

    const resetCredentials = () => {
        setAuth({
            authenticate: false,
            user: null,
        });
    };

    useEffect(() => {
        checkAuthUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signInFormData,
                setSignInFormData,
                signUpFormData,
                setSignUpFormData,
                handleRegister,
                handleLogin,
                auth,
                resetCredentials,
            }}
        >
            {loading ? <Skeleton /> : children}
        </AuthContext.Provider>
    );
}
