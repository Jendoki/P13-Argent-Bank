import React, { useEffect, useState } from "react";
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import UserPageContent from "./components/UserPageContent"
import { useStore } from "react-redux";

function UserPage() {
    const store = useStore();
    useEffect(() =>
        store.subscribe(() => store.getState().connexionToken)
    )

    return (
        <>
            <Header />
            <UserPageContent token={store.getState().connexionToken} />
            <Footer />
        </>
    )
}

export default UserPage