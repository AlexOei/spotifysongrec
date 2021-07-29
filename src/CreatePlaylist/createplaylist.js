import spotify from "../services/spotify";
import React, {useState} from 'react';
import Form from '../Form/form'



const CreatePlaylist = ({recs, userID, token, setPlayID, setDone, setError}) => {
    const [srch, setSrch] = useState('')

    const handleChangeCreate = (event) => {
        event.preventDefault()
        setSrch(event.target.value)
    }

    const handleClickCreate = async(event) => {
        event.preventDefault()
        try{
            let trackList = recs.tracks.map(track => track.uri)
            let query = trackList.join(',')
            let createPlay = await spotify.createPlaylist(srch, `users/${userID}/playlists`, token)
            let res = await spotify.request('POST', `playlists/${createPlay.data.id}/tracks?uris=${query}`, token)
            setPlayID(createPlay.data.id)
            setDone(true)
            console.log("create play" , res)
        }catch(error){
            console.log(error)
            setError(true)
        }
    }

    const handleClickApple = async(event) => {
        event.preventDefault()
        try{
            let tracklist = recs.tracks.map(track => track.external_ids.isrc)
            console.log(tracklist, 'tracklist')
        }catch(error){
            setError(true)
        }
    }

    return (
        <>
        <Form handleClick={handleClickCreate} handleChange={handleChangeCreate} title="Create a playlist or select an existing one" />
        <Form handleClick={handleClickCreate} handleChange={handleClickApple} title="Create a playlist or select an existing one" />
        </>
)

}

export default CreatePlaylist;