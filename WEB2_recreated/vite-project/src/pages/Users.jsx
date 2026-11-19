import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadUsers = async () => {
            try {
                const data =
                    await apiRequest("/users");

                setUsers(data);

            } catch (error) {
                setError(error.message);
            }
        };

        loadUsers();

    }, []);

    return (
        <div className="page">

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Назад
            </button>

            <h1>Пользователи</h1>

            <p className="page-description">
                Пользователи, зарегистрированные
                в системе учета денежных средств.
            </p>

            <div className="table-card">

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>Логин</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (
                            <tr key={user.user_id}>

                                <td>
                                    {user.user_id}
                                </td>

                                <td>
                                    {user.full_name}
                                </td>

                                <td>
                                    {user.login}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

        </div>
    );
}

export default Users;