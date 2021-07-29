import React, {useState} from "react";
import spotify from "../services/spotify";
import Form from "../Form/form";
import Counter from "./Counter/counter";
import ResultList from "./ResultList/resultlist";

const Results = ({name, track, setRecs, token, setDoneSearch, setError}) => {
    const [songQuery, setSongQuery] = useState('')
    const [artistQuery, setArtistQuery] = useState('')
    const [showCategory, setShowCategory] = useState(false)
    const [artistCount, setArtistCount] = useState(0)
    const [songCount, setSongCount] = useState(0)
    const [songs, setSongs] = useState(20)


    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.value < 100 && event.target.value > 0){
            console.log('value accepted')
            setSongs(event.target.value)
        }

    }

    const handleClick = async (event) => {
        event.preventDefault()
        if (songQuery || artistQuery) {
            try{
                let res = await spotify.request('GET', `recommendations?limit=${songs}&seed_artists=${artistQuery}&seed_tracks=${songQuery}`, token)
                console.log(res)
                setRecs(res.data)
                setDoneSearch(true)
            }catch(error){
                console.log(error)
                setError(true)
            }

        }
    }

    if(track && name){
        return(
            <div>
                <ul>

                    <Counter count={artistCount} title="Artists" category={showCategory} setCategory={setShowCategory}/>
                    <Counter count={songCount} title="Tracks" category={showCategory} setCategory={setShowCategory}/>
                    {!showCategory && (<ResultList data-testId="artist" query={artistQuery} setQuery={setArtistQuery} category={name} setCounter={setArtistCount} counters={artistCount} img = "category.images[2].url"/>)}
                    {showCategory && (<ResultList data-testId="track" query={songQuery} setQuery={setSongQuery} category={track} setCounter={setSongCount} counters={songCount} img = "category.album.images[2].url" />)}
                    <Form handleClick={handleClick} handleChange={handleChange} title="Choose number of Recs" />
                </ul>
            </div>
        )}

    return(<div data-testid="none"/>)
}

export default Results
