import React, {useEffect, useState} from 'react';
import spotify from './services/spotify'
import apiID from './config.json'
import Button from 'react-bootstrap/Button';
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'


require('dotenv').config()

const Login = ()=> {
    const REACT_APP_CLIENT_ID='52e8d8d4caef421282f7f37369eaa7ea'
    const REACT_APP_AUTHORIZE_URL='https://accounts.spotify.com/authorize'
    const REACT_APP_REDIRECT_URL='http://localhost:3000/redirect'

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative&response_type=token&show_dialog=true`;
    };

    return (

                    <div className="text-center">
                        <Button onClick = {handleLogin} id="Login" size="lg"> Login to Spotify </Button>
                    </div>

    )
}

const Form = ({handleClick, handleChange, title}) => {
    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit = {handleClick}>
                <input type = "text" onChange={handleChange}/>
                <input type = "submit" value = "submit" />
            </form>
        </div>
    )
}

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
      <div className="align-content-center">
      <Form handleClick={handleClick} handleChange={handleChange} title={title} />
      </div>
  )
}

const ResultList = ({query, setQuery, category, title, setCounter, counters}) => {

    const handleClick = (id) => {
        setQuery(query + id +',')
        setCounter(counters + 1)
    }

    if (category){
        console.log(category.items)
    return(<div>
        <li>{title}</li>
        <ul>
            {category.items.map(category => (
               <li key={category.id}>{category.name} <img src = {category.album.images[2].url} alt = "Song Artwork"/>  <button onClick = {()=>handleClick(category.id)}>Add</button></li>

            ))}
        </ul>

    </div>)
    }

    return(<div/>)

}

const ResultArtistList = ({query, setQuery, category, title, setCounter, counters}) => {

    const handleClick = (id) => {
        setQuery(query + id +',')
        setCounter(counters + 1)
    }

    if (category){
        console.log(category.items)
        return(<div>
            <li>{title}</li>
            <ul>
                {category.items.map(category => (
                    <li key={category.id}>{category.name} <img src ={category.images[2].url} alt = "Artist Artwork" />  <button onClick = {()=>handleClick(category.id)}>Add</button></li>

                ))}
            </ul>

        </div>)
    }

    return(<div/>)

}

const Counter = ({count, title}) => {


    return (
        <>
            <p>{title} added: {count}</p>
        </>
    )
}


const Results = ({name, track, setRecs, token, setDoneSearch, setError}) => {
    const [songQuery, setSongQuery] = useState('')
    const [artistQuery, setArtistQuery] = useState('')
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
                    <div className="align-content-center">
                    <Form handleClick={handleClick} handleChange={handleChange} title="Choose number of Recs" />
                    </div>
                    <div className="counter" >
                    <Counter count={artistCount} title="Artists"  />
                    <Counter count={songCount} title="Tracks"  />
                    </div>
                    <div className="counter">
                    {(<ResultArtistList query={artistQuery} setQuery={setArtistQuery} category={name} setCounter={setArtistCount} counters={artistCount} title="Artists" />)}
                    {(<ResultList query={songQuery} setQuery={setSongQuery} category={track} setCounter={setSongCount} counters={songCount} title="Songs"  />)}
                    </div>
                </ul>
            </div>
        )}

    return(<div/>)
}

const DropdownForm = ({selectedPlay, handleChange, handleClick, playlists, type, }) => {
    if(type==='apple'){
        return(
            <form>
                <select value ={selectedPlay} onChange={handleChange}>
                    <option value = "none">None Selected</option>
                    {playlists.map(track=>(
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
    return <div/>
}

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
            let trackList = recs.tracks.map(track => track.external_ids.isrc)
            let query = trackList.join(',')

            let songIds = await spotify.getAppleSongIds(query)
            console.log(songIds, 'songIds')
            let playlist = await spotify.createApplePlaylist(srch, songIds)
            setPlayID(playlist.data[0].id)
            console.log('id', playlist.data[0].id)
            setDone(true)
            console.log("playID", playlist)


        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="destination">
            <Form handleClick={handleClickCreate} handleChange={handleChangeCreate} title="Create a spotify playlist or select an existing one" />
            <Form handleClick={handleClickApple} handleChange={handleChangeCreate} title="Create an apple music playlist or select an existing one" />
        </div>
    )

}

const AddToPlaylist = ({recs, playlists, setPlayID, setDone, token, applePlay, appleToken}) => {
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
            let trackList = recs.tracks.map(track => track.external_ids.isrc)
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
            console.log(songIds)
            let res = await spotify.addAppleSongs(selectedPlay,appleToken, songIds)
            console.log(res)
            console.log(selectedPlay)
            setPlayID(selectedPlay)
            setDone(true)
        }catch(error){

        }
    }

    return (
        <div className="destination">
            <DropdownForm playlists={playlists} handleChange={handleChangeAdd} handleClick={handleClickAdd} selectedPlay={selectedPlay} type="spotify"/>
            <DropdownForm playlists={applePlay} handleChange={handleChangeAdd} handleClick={handleClickAppleAdd} selectedPlay={selectedPlay} type="apple"/>
        </div>
    )

}

const Destination = ({recs, token, userID, setDone, setPlayID, playlists, applePlay, appleToken }) => {

    if(recs && token && playlists){
        console.log(playlists.items)
        return(
            <div>
                <CreatePlaylist recs={recs} setPlayID={setPlayID} setDone={setDone} userID={userID} token={token} appleToken={appleToken}/>
                <AddToPlaylist recs={recs} playlists={playlists} setDone={setDone} setPlayID={setPlayID} applePlay={applePlay} appleToken={appleToken}/>
            </div>
        )
    }

    return (<div/>)

}

const Recommendations = ({recs}) => {
    if (recs){
        return(
            <ul>
                <li>Track List</li>
                <ul>
                    {recs.tracks.map(track=>(
                        <li key={track.id}>{track.name}<img src = {track.album.images[2].url} alt = "album art"/></li>
                    ))}
                </ul>
            </ul>
        )
    }
    return(<div/>)
}


const App = () => {
  const [token, setToken] = useState()
  const [recs, setRecs] = useState()
  const [name, setName] = useState(null)
  const [track, setTrack] = useState(null)
  const [userID, setuserID] = useState()
  const [doneSearch, setDoneSearch] = useState(false)
  const [playID, setPlayID] = useState('')
  const [done, setDone] = useState(false)
  const [playlists, setPlaylists] = useState()
  const [applePlay, setApplePlay] = useState()
  const [appleToken, setAppleToken] = useState()
  const [error, setError] = useState(false)

  useEffect(()=>{
      const getToken = async()=> {
          if(window.location.href.includes("access") )
          {
              const splitUrl = window.location.href.split("=")
              const finalSplit = splitUrl[1].split("&")
              setToken(finalSplit[0])
          }
          let res = await spotify.request('GET', 'me', token)
          let playList = await spotify.request('GET', `users/${res.data.id}/playlists`, token)
          setPlaylists(playList.data)
          setuserID(res.data.id)
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
          setAppleToken(appleToken)
          let applePlaylists = await spotify.fetchApplePlaylists(appleToken)
          setApplePlay(applePlaylists.data)
          console.log(applePlaylists.data)

      }
      getToken()
  }, [token])

  const handleRedirect = () => {
        window.location = `https://open.spotify.com/playlist/${playID}`
  }
  const handleApple = ()=>{
      window.location = `https://music.apple.com/library/playlist/${playID}`
  }

  return(
      <div className="text-center">
          <div >
              <div className="header">
                  <h1 >Spotify Recommendation Finder</h1>
              </div>
          </div>
          {error && <h3>Sorry, something went wrong, please refresh the page</h3>}
          {!doneSearch && (
          <>

              {!token && <Login setToken={setToken} />}

              {token && <Search title = "Search" setTrack={setTrack} setName={setName} token={token} setError={setError}/>}
              <Results name={name} track={track}  setRecs={setRecs} token={token} setDoneSearch={setDoneSearch} setError = {setError}/>


         </>
          )
      }
          <Destination recs={recs} token={token} userID={userID} setDone = {setDone} setPlayID = {setPlayID} playlists={playlists} applePlay = {applePlay} appleToken = {appleToken}/>
          {!playID && (<Recommendations recs={recs}/>)}
          {done && (<><button onClick={handleRedirect}>Listen on Spotify</button> <button>Make Another Playlist</button> <button onClick = {handleApple}>Listen on Apple Music</button></>)}
          <p>1. Login to Spotify</p>
          <p>2. Search for songs and artists to base recommendations off of</p>
          <p>3. Choose how many songs you want</p>
          <p>4. Add recommendations to an existing playlist or create a new one(Supports Apple Music and Spotify)</p>

      </div>
  )
}

export default App;
