import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function Counterparties() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const loadItems = async () => {
        try {
            const data =
                await apiRequest("/counterparties");

            setItems(data);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const createItem = async (event) => {
        event.preventDefault();

        try {
            await apiRequest(
                "/counterparties",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name
                    })
                }
            );

            setName("");

            loadItems();

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

            <h1>Контрагенты</h1>

            <p className="page-description">
                Контрагенты — организации или лица,
                с которыми проводятся денежные операции.
            </p>

            <div className="two-columns">

                <div className="form-card">

                    <h2>
                        Добавить контрагента
                    </h2>

                    <form onSubmit={createItem}>

                        <label>
                            Название
                        </label>

                        <input
                            value={name}
                            placeholder="ООО Ромашка"
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <button className="primary-button">
                            Добавить
                        </button>

                    </form>

                </div>

                <div className="table-card">

                    <h2>
                        Список контрагентов
                    </h2>

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                            </tr>
                        </thead>

                        <tbody>

                            {items.map((item) => (
                                <tr
                                    key={
                                        item.counterparty_id
                                    }
                                >
                                    <td>
                                        {item.counterparty_id}
                                    </td>

                                    <td>
                                        {item.name}
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

export default Counterparties;