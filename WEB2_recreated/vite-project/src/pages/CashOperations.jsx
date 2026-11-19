import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../api";

function CashOperations() {
    const navigate = useNavigate();

    const [operations, setOperations] = useState([]);

    const [operationDate, setOperationDate] = useState("");
    const [amount, setAmount] = useState("");
    const [purpose, setPurpose] = useState("");
    const [operationTypeId, setOperationTypeId] = useState("");
    const [cashboxId, setCashboxId] = useState("");
    const [counterpartyId, setCounterpartyId] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const [error, setError] = useState("");

    const loadOperations = async () => {
        try {
            const data =
                await apiRequest("/cash-operations");

            setOperations(data);

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadOperations();
    }, []);

    const createOperation = async (event) => {
        event.preventDefault();

        try {
            await apiRequest(
                "/cash-operations",
                {
                    method: "POST",

                    body: JSON.stringify({
                        operationDate,
                        amount: Number(amount),
                        purpose,
                        operationTypeId:
                            Number(operationTypeId),
                        cashboxId:
                            Number(cashboxId),
                        counterpartyId:
                            Number(counterpartyId),
                        createdBy:
                            Number(createdBy)
                    })
                }
            );

            setOperationDate("");
            setAmount("");
            setPurpose("");
            setOperationTypeId("");
            setCashboxId("");
            setCounterpartyId("");
            setCreatedBy("");

            loadOperations();

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

            <h1>Кассовые операции</h1>

            <p className="page-description">
                Здесь регистрируются приходы и расходы
                денежных средств по кассам.
            </p>

            <div className="form-card">

                <h2>
                    Добавить операцию
                </h2>

                <form
                    className="operation-form"
                    onSubmit={createOperation}
                >

                    <input
                        type="date"
                        value={operationDate}
                        onChange={(e) =>
                            setOperationDate(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Сумма"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                    />

                    <input
                        placeholder="Назначение платежа"
                        value={purpose}
                        onChange={(e) =>
                            setPurpose(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="ID типа операции"
                        value={operationTypeId}
                        onChange={(e) =>
                            setOperationTypeId(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="ID кассы"
                        value={cashboxId}
                        onChange={(e) =>
                            setCashboxId(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="ID контрагента"
                        value={counterpartyId}
                        onChange={(e) =>
                            setCounterpartyId(e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="ID пользователя"
                        value={createdBy}
                        onChange={(e) =>
                            setCreatedBy(e.target.value)
                        }
                    />

                    <button className="primary-button">
                        Создать операцию
                    </button>

                </form>

            </div>

            <div className="table-card operations-table">

                <h2>
                    История операций
                </h2>

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Назначение</th>
                            <th>Касса</th>
                            <th>Тип</th>
                        </tr>
                    </thead>

                    <tbody>

                        {operations.map((operation) => (
                            <tr key={operation.operation_id}>

                                <td>
                                    {operation.operation_id}
                                </td>

                                <td>
                                    {operation.operation_date}
                                </td>

                                <td>
                                    {operation.amount} ₽
                                </td>

                                <td>
                                    {operation.purpose}
                                </td>

                                <td>
                                    {operation.cashbox_id}
                                </td>

                                <td>
                                    {operation.operation_type_id}
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

export default CashOperations;