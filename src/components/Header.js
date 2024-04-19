import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import argentBankLogo from "../img/argentBankLogo.png"

function Header() {
    const user = useSelector(state => state.user);
    const connexionToken = useSelector(state => state.connexionToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem('connexionToken');
        navigate("/");
    }

    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div className="main-nav-right-container">
                {user && (
                    <a className="main-nav-item" href="./profile">
                        <i className="fa fa-user-circle"></i>
                        {user.firstName}
                    </a>
                )}
                {connexionToken ? (
                    <div className="main-nav-item" onClick={logout}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </div>
                ) : (
                    <div className="main-nav-item">
                        <Link to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;
