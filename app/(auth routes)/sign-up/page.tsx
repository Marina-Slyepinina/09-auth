"use client"
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "../../../lib/api/clientApi";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./page.module.css";

const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const setUser = useAuthStore((state) => state.setUser);
    
    const handleSubmit = async (formData: FormData) => {
        try {
            const userFormData = Object.fromEntries(formData) as RegisterRequest;
            const user = await register(userFormData);
            
            if (user) {
                setUser(user);
                router.push("/profile");
            } else {
                setError("Invalid email or password");
            }
        } catch {
            setError("Ooops.. Something went wrong, try again");
        }
    }


return (
    <main className={css.mainContent}>
        <form action={handleSubmit} className={css.form}>
            <h1 className={css.formTitle}>Sign up</h1>
            <div className={css.formGroup}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" className={css.input} required />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" className={css.input} required />
            </div>

            <div className={css.actions}>
                <button type="submit" className={css.submitButton}>
                    Register
                </button>
            </div>

            {error && <p className={css.error}>{error}</p>}
        </form>
    </main>
)
}

export default SignUp;