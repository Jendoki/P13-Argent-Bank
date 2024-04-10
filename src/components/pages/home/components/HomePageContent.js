import React, { useEffect, useState } from "react";
import IconChat from "../../../../img/icon-chat.png"
import IconMoney from "../../../../img/icon-money.png"
import IconSecurity from "../../../../img/icon-security.png"
import HomePageBanner from "./HomePageBanner";
import HomePageFeatureItem from "./HomePageFeatureItem"
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../../services/api/api";


function HomePageContent() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const connexionToken = sessionStorage.getItem('connexionToken');
    async function apiCalls() {
        if (connexionToken) {
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
        }
    }

    useEffect(() => {
        apiCalls();
    }, []);

    return (
        <>
            <main>
                <HomePageBanner />
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    <HomePageFeatureItem kind="Chat" img={IconChat} title="You are our #1 priority" text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." />
                    <HomePageFeatureItem kind="Money" img={IconMoney} title="More savings means higher rates" text="The more you save with us, the higher your interest rate will be!" />
                    <HomePageFeatureItem kind="Security" img={IconSecurity} title="Security you can trust" text="We use top of the line encryption to make sure your data and money is always safe." />
                </section>
            </main>
        </>
    )
}

export default HomePageContent