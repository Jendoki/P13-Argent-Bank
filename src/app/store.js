import { configureStore } from "@reduxjs/toolkit";

let state = {
    isLogged: false,
    connexionToken: "",
    user: null
};

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...currentState, isLogged: true, connexionToken: action.payload.connexionToken }
        case 'SET_USER':
            return { ...currentState, user: { ...action.payload.user } }
        case 'LOGOUT':
            return { ...currentState, isLogged: false, connexionToken: "", user: null }
        default:
            return currentState
    }
}

export const store = configureStore(
    {
        preloadedState: state,
        reducer
    }
)