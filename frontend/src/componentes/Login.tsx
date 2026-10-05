import {  useState } from "react";
import { useLogin } from "../hooks/useLogin";
import '../styles/LoginStyles.css'

export function LoginUser() {

    const [loginDate, setLoginDate] = useState({
        username: "",
        password: "" 
    });

    const { login } = useLogin();



    return (
        <main className="login-page">

            <section className="login-card">

                <div className="login-header">
                    <h1>Puntored</h1>
                    <p>Ingresa a tu cuenta</p>
                </div>

                <form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(loginDate);
                    }}
                >

                    <div className="login-field">
                        <label htmlFor="username">
                            Usuario
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={loginDate.username}
                            onChange={(e) =>
                                setLoginDate({
                                    ...loginDate,
                                    username: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={loginDate.password}
                            onChange={(e) =>
                                setLoginDate({
                                    ...loginDate,
                                    password: e.target.value
                                })
                            }
                        />
                    </div>

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </section>

        </main>
    );
}