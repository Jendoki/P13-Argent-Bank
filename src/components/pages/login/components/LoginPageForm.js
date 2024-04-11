import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../services/api/api.js";

function LoginPageForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function apiCalls() {
        setIsLoading(true);
        try {
            const result = await login(username, password);
            setIsLoading(false);
            dispatch({
                type: "LOGIN",
                payload: {
                    username: username,
                    password: password,
                    connexionToken: result,
                    isLogged: true
                }
            });
            sessionStorage.setItem("connexionToken", result);
            navigate("/user", { state: { token: result } });
        } catch (error) {
            console.log("error", error);
            setHasError(true);
            setIsLoading(false);
        }
    }

    function onFormSubmit(e) {
        e.preventDefault();
        apiCalls();
    }

    return (
        <>
            <form className="login-form" onSubmit={onFormSubmit}>
                <div className={hasError ? "input-wrapper-error" : "input-wrapper"}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={hasError ? "input-wrapper-error" : "input-wrapper"}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* non implémenté */}
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button">{isLoading ? "Loading..." : "Sign In"}</button>
            </form>
        </>
    );
}

export default LoginPageForm;
