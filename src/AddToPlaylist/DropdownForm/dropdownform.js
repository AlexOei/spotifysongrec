import React from "react";

const DropdownForm = ({selectedPlay, handleChange, handleClick, playlists, type}) => {
    if(type==='apple'){
        return(
            <form>
                <select value ={selectedPlay} onChange={handleChange}>
                    <option value = "none">None Selected</option>
                    {playlists.data.map(track=>(
                        <option data-testid ="option" value={track.id}>{track.attributes.name}</option>
                    ))}
                </select>
                <button onClick={handleClick}>Add to chosen playlist</button>
            </form>
        )
    }

    if (type === 'spotify'){
        return (
            <form>
                <select value ={selectedPlay} onChange={handleChange}>
                    <option value = "none">None Selected</option>
                    {playlists.items.map(track=>(
                        <option data-testid ="option" value={track.id}>{track.name}</option>
                    ))}
                </select>
                <button onClick={handleClick}>Add to chosen playlist</button>
            </form>
        )
    }
    return <div></div>
}

export default DropdownForm;