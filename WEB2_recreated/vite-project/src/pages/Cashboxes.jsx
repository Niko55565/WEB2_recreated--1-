import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function Cashboxes() {
    const navigate = useNavigate();

    const [cashboxes, setCashboxes] = useState([]);

    const [cashboxName, setCashboxName] = useState("");
    const [currentBalance, setCurrentBalance] = useState("");
    const [responsibleUserId, setResponsibleUserId] = useState("");

    const [error, setError] = useState("");

    const loadCashboxes = async () => {
        try {
            const data =
                await apiRequest("/cashboxes");

            setCashboxes(data);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadCashboxes();
    }, []);

    const createCashbox = async (event) => {
        event.preventDefault();

        try {
            await apiRequest(
                "/cashboxes",
                {
                    method: "POST",

                    body: JSON.stringify({
                        cashboxName,
                        currentBalance:
                            Number(currentBalance),
                        responsibleUserId:
                            Number(responsibleUserId)
                    })
                }
            );

            setCashboxName("");
            setCurrentBalance("");
            setResponsibleUserId("");

            loadCashboxes();

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Назад
            </button>

            <h1>Кассы</h1>

            <p className="page-description">
                Здесь хранятся кассы организации,
                их баланс и ответственные пользователи.
            </p>

            <div className="two-columns">

                <div className="form-card">

                    <h2>Добавить кассу</h2>

                    <form onSubmit={createCashbox}>

                        <label>
                            Название кассы
                        </label>

                        <input
                            value={cashboxName}
                            placeholder="Основная касса"
                            onChange={(e) =>
                                setCashboxName(e.target.value)
                            }
                        />

                        <label>
                            Начальный баланс
                        </label>

                        <input
                            type="number"
                            value={currentBalance}
                            placeholder="0"
                            onChange={(e) =>
                                setCurrentBalance(e.target.value)
                            }
                        />

                        <label>
                            Ответственный пользователь
                        </label>

                        <input
                            type="number"
                            value={responsibleUserId}
                            placeholder="ID пользователя"
                            onChange={(e) =>
                                setResponsibleUserId(e.target.value)
                            }
                        />

                        <button
                            className="primary-button"
                        >
                            Добавить
                        </button>

                    </form>

                </div>

                <div className="table-card">

                    <h2>Список касс</h2>

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Баланс</th>
                                <th>Ответственный</th>
                            </tr>
                        </thead>

                        <tbody>

                            {cashboxes.map((cashbox) => (
                                <tr key={cashbox.cashbox_id}>

                                    <td>
                                        {cashbox.cashbox_id}
                                    </td>

                                    <td>
                                        {cashbox.cashbox_name}
                                    </td>

                                    <td>
                                        {cashbox.current_balance} ₽
                                    </td>

                                    <td>
                                        {cashbox.responsible_user_id}
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

        </div>
    );
}

export default Cashboxes;