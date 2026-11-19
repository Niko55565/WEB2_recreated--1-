import { Link } from "react-router-dom";

function Home() {
    const token = localStorage.getItem("token");

    return (
        <div className="page home-page">

            <div className="home-header">
                <h1>Учет денежных средств</h1>

                <p>
                    Система для работы с кассами,
                    операциями, контрагентами и пользователями.
                </p>
            </div>

            {!token ? (
                <div className="welcome-card">

                    <h2>Добро пожаловать</h2>

                    <p>
                        Для работы с системой необходимо
                        войти в учетную запись.
                    </p>

                    <div className="button-row">

                        <Link
                            className="primary-link"
                            to="/login"
                        >
                            Войти
                        </Link>

                        <Link
                            className="secondary-link"
                            to="/register"
                        >
                            Регистрация
                        </Link>

                    </div>

                </div>
            ) : (
                <div className="dashboard">

                    <Link
                        className="dashboard-card"
                        to="/cashboxes"
                    >
                        <h3>Кассы</h3>
                        <p>
                            Просмотр касс и их текущего баланса.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/cash-operations"
                    >
                        <h3>Кассовые операции</h3>
                        <p>
                            Учет приходов и расходов денежных средств.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/counterparties"
                    >
                        <h3>Контрагенты</h3>
                        <p>
                            Организации и лица,
                            участвующие в операциях.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/operation-types"
                    >
                        <h3>Типы операций</h3>
                        <p>
                            Справочник видов финансовых операций.
                        </p>
                    </Link>

                    <Link
                        className="dashboard-card"
                        to="/users"
                    >
                        <h3>Пользователи</h3>
                        <p>
                            Пользователи, имеющие доступ к системе.
                        </p>
                    </Link>

                </div>
            )}

        </div>
    );
}

export default Home;