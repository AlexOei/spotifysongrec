import spotify from "../services/spotify";
import React, {useState} from "react";
import DropdownForm from "./DropdownForm/dropdownform";
import apiID from "../config.json";

const AddToPlaylist = ({recs, playlists, setPlayID, setDone, token}) => {
    const [selectedPlay, setSelectedPlay] = useState('None')

    const handleChangeAdd = (event)=>{
        event.preventDefault()
        setSelectedPlay(event.target.value)
    }

    const handleClickAdd = async(event)=>{
        event.preventDefault()
        try{
            let trackList = recs.tracks.map(track => track.uri)
            let query = trackList.join(',')
            let res = await spotify.request('POST', `playlists/${selectedPlay}/tracks?uris=${query}`, token)
            setPlayID(selectedPlay)
            setDone(true)
            console.log("add to play", res)
        }catch(error){
            console.log(error)
        }
    }

    const handleClickAppleAdd = async (event) => {
        event.preventDefault()
        try{
            let trackList = recs.tracks.map(track => track.uri)
            let query = trackList.join(',')
            let music = window.MusicKit.configure({
                developerToken:apiID.appleAuth,
                app: {
                    name: 'My Cool Web App'
                },
                declarativeMarkup: true
            });
            let auth = window.MusicKit.getInstance()
            let appleToken = await auth.authorize()
            console.log(appleToken, auth.isAuthorized)
            let songIds = await spotify.getAppleSongIds(query)
            let res = await spotify.addAppleSongs(selectedPlay,appleToken, query)
            console.log(selectedPlay)
        }catch(error){

        }
    }

    return (
        <div>
        <DropdownForm playlists={playlists} handleChange={handleChangeAdd} handleClick={handleClickAdd} selectedPlay={selectedPlay} type="spotify"/>
        <DropdownForm playlists={playlists} handleChange={handleChangeAdd} handleClick={handleClickAdd} selectedPlay={selectedPlay} type="apple"/>
        </div>
    )

}

export default AddToPlaylist;