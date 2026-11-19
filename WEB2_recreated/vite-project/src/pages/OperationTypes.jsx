import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function OperationTypes() {
    const navigate = useNavigate();

    const [types, setTypes] = useState([]);
    const [typeName, setTypeName] = useState("");
    const [error, setError] = useState("");

    const loadTypes = async () => {
        try {
            const data =
                await apiRequest("/operation-types");

            setTypes(data);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadTypes();
    }, []);

    const createType = async (event) => {
        event.preventDefault();

        try {
            await apiRequest(
                "/operation-types",
                {
                    method: "POST",

                    body: JSON.stringify({
                        typeName
                    })
                }
            );

            setTypeName("");

            loadTypes();

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

            <h1>Типы операций</h1>

            <p className="page-description">
                Справочник видов денежных операций,
                например приход или расход.
            </p>

            <div className="two-columns">

                <div className="form-card">

                    <h2>
                        Новый тип операции
                    </h2>

                    <form onSubmit={createType}>

                        <label>
                            Название
                        </label>

                        <input
                            value={typeName}
                            placeholder="Приход"
                            onChange={(e) =>
                                setTypeName(e.target.value)
                            }
                        />

                        <button className="primary-button">
                            Добавить
                        </button>

                    </form>

                </div>

                <div className="table-card">

                    <h2>
                        Типы операций
                    </h2>

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                            </tr>
                        </thead>

                        <tbody>

                            {types.map((type) => (
                                <tr
                                    key={
                                        type.operation_type_id
                                    }
                                >
                                    <td>
                                        {type.operation_type_id}
                                    </td>

                                    <td>
                                        {type.type_name}
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

export default OperationTypes;