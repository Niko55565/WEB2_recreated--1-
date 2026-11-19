import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await apiRequest(
                "/auth/register",
                {
                    method: "POST",
                    body: JSON.stringify({
                        fullName,
                        login,
                        password
                    })
                }
            );

            navigate("/login");

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

                <h1>Регистрация</h1>

                <p className="description">
                    Создание нового пользователя системы.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>ФИО</label>

                    <input
                        value={fullName}
                        placeholder="Иванов Иван Иванович"
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                    />

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
                        Создать аккаунт
                    </button>

                </form>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Register;