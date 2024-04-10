import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import UserPageName from "./UserPageName";
import UserPageAccount from "./UserPageAccount";
import { getUserProfile } from "../../../../services/api/api";
import { useDispatch } from "react-redux";

function UserPageContent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const connexionToken = sessionStorage.getItem('connexionToken');

    async function apiCalls() {
        if (connexionToken) {
            setIsLoading(true);
            try {
                const result = await getUserProfile(connexionToken);
                setCurrentUser(result);
                setIsLoading(false);
                dispatch({
                    type: "LOGIN",
                    payload: {
                        connexionToken: connexionToken,
                        isLogged: true
                    }
                });
                dispatch({
                    type: "SET_USER",
                    payload: {
                        user: result
                    }
                });
            } catch (error) {
                console.log("error", error);
                setHasError(true);
                setIsLoading(false);
            }
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        apiCalls();
    }, []);

    if (hasError) {
        return (
            <div>
                <p>Veuillez vous connecter afin d'afficher cette page.</p>
                <Link to="/login"><p>Se connecter</p></Link>
            </div>
        );
    }

    if (isLoading) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <>
            <main className="main bg-dark">
                <UserPageName user={currentUser} token={props.token} />
                <h2 className="sr-only">Accounts</h2>
                <UserPageAccount title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
                <UserPageAccount title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
                <UserPageAccount title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
            </main>
        </>
    );
}

export default UserPageContent;
