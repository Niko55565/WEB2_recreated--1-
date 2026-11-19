import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <header className="navbar">

            <Link className="logo" to="/">
                WEB2
            </Link>

            {token && (
                <nav className="nav-links">
                    <Link to="/">Главная</Link>
                    <Link to="/cashboxes">Кассы</Link>
                    <Link to="/cash-operations">Операции</Link>
                    <Link to="/counterparties">Контрагенты</Link>
                    <Link to="/operation-types">Типы операций</Link>
                    <Link to="/users">Пользователи</Link>
                </nav>
            )}

            <div className="nav-right">
                {token ? (
                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        Выйти
                    </button>
                ) : (
                    <>
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}
            </div>

        </header>
    );
}

export default Navbar;