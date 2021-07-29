import react from 'react'

const Form = ({handleClick, handleChange, title}) => {
    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit = {handleClick}>
                <input type = "text" onChange={handleChange}/>
                <button type = "submit" >{title}</button>
            </form>
        </div>
    )
}

export default Form;