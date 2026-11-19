import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Cashboxes from "./pages/Cashboxes";
import Counterparties from "./pages/Counterparties";
import OperationTypes from "./pages/OperationTypes";
import CashOperations from "./pages/CashOperations";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cashboxes"
                    element={
                        <ProtectedRoute>
                            <Cashboxes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/counterparties"
                    element={
                        <ProtectedRoute>
                            <Counterparties />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/operation-types"
                    element={
                        <ProtectedRoute>
                            <OperationTypes />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cash-operations"
                    element={
                        <ProtectedRoute>
                            <CashOperations />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;