import React, {useState} from 'react';
import spotify from "../services/spotify";
import Form from "../Form/form"

const Search = ({title, setName, setTrack, token, setError}) => {
    const [srch, setSrch] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        setSrch(event.target.value)
    }

    const handleClick = async (event) => {
        event.preventDefault()
        try{
            let res = await spotify.request('GET',`search?q=${srch}&type=artist%2Ctrack&limit=5`, token )
            setName(res.data.artists)
            setTrack(res.data.tracks)
        }catch(error){
            console.log(error)
            setError(true)
        }
    }

    return (
        <Form handleClick={handleClick} handleChange={handleChange} title={title} />
    )
}

export default Search;