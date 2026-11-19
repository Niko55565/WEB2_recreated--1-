import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await apiRequest(
                "/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        login,
                        password
                    })
                }
            );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/");

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="center-page">

            <div className="auth-card">

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Назад
                </button>

                <h1>Вход</h1>

                <p className="description">
                    Введите логин и пароль для входа в систему.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Логин</label>

                    <input
                        value={login}
                        placeholder="Введите логин"
                        onChange={(e) =>
                            setLogin(e.target.value)
                        }
                    />

                    <label>Пароль</label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Введите пароль"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Войти
                    </button>

                </form>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <p className="bottom-text">
                    Нет аккаунта?{" "}

                    <button
                        className="text-button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Зарегистрироваться
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Login;