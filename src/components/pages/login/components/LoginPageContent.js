import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPageForm from "./LoginPageForm";

function LoginPageContent() {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('connexionToken')) {
            navigate("/user");
        }
    }, [navigate]);

    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <LoginPageForm />
                </section>
            </main>
        </>
    );
}

export default LoginPageContent;
