import React from "react";

function HomePageFeatureItem(props) {
    return (
        <div className="feature-item">
            <img src={props.img} alt={`${props.kind} Icon`} className="feature-icon" />
            {props.kind === "Chat" && (
                <>
                    <h3 className="feature-item-title">{props.title}</h3>
                    <p>{props.text}</p>
                </>
            )}
            {props.kind === "Money" && (
                <>
                    <h3 className="feature-item-title">{props.title}</h3>
                    <p>{props.text}</p>
                </>
            )}
            {props.kind === "Security" && (
                <>
                    <h3 className="feature-item-title">{props.title}</h3>
                    <p>{props.text}</p>
                </>
            )}
        </div>
    );
}

export default HomePageFeatureItem;