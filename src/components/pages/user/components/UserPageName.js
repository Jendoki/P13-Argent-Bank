import { React, useState } from "react";
import { updateUserProfile } from "../../../../services/api/api.js"
import { store } from "../../../../app/store.js";

function UserPageName(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const [firstname, setFirstname] = useState(props.user.firstName)
    const [lastname, setLastname] = useState(props.user.lastName)

    const token = props.token

    function onFormSubmit(e) {
        e.preventDefault()
        apiCalls(token)
    }

    async function apiCalls(token) {
        setIsLoading(true)
        try {
            const result = await updateUserProfile(firstname, lastname, token)
            setFirstname(firstname)
            setLastname(lastname)
            setIsEditingName(false)
            store.dispatch({
                type: "SET_USER",
                payload: {
                    user: result
                }
            })
        } catch (error) {
            setHasError(true)
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="header">
                <h1>Welcome back</h1>
                {!isEditingName && (
                    <div>
                        <h1>{firstname} {lastname}!</h1>
                        <button className="edit-button" onClick={() => setIsEditingName(true)}>Edit Name</button>
                    </div>
                )}
                {isEditingName && (
                    <form className="edit-form" onSubmit={onFormSubmit}>
                        <div className="edit-form-inputs">
                            <div className="input-wrapper">
                                <input type="text" id="firstname" name="firstname" placeholder={firstname} value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div className="input-wrapper">
                                <input type="text" id="lastname" name="lastname" placeholder={lastname} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                        </div>
                        <div className="edit-form-buttons">
                            <button className="save-button">Save</button>
                            <button className="cancel-button" onClick={() => setIsEditingName(false)}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default UserPageName