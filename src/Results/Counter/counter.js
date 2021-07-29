import React from "react";

const Counter = ({count, setCategory, category, title}) => {
    const handleSwitch = () => {
        setCategory(!category)
    }

    return (
        <>
            <p>{title} added: {count}</p>
            <button onClick = {()=>handleSwitch()}>Show {title} </button>
        </>
    )
}

export default Counter;