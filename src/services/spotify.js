import axios from 'axios'
import apiID from "../config.json";
const baseUrl = 'https://api.spotify.com/v1/'
const appleURL = 'https://api.music.apple.com/v1/'

const appleRequest = (method, string, token) => {
    return axios({
        method: method,
        url: appleURL+string,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

const getAppleSongIds = async (query)=>{

    let createPlay = await appleRequest('GET', `catalog/us/songs?filter[isrc]=${query}`, apiID.appleAuth)
    console.log(createPlay)
    let id = createPlay.data.data.map(track=>[track.id, track.attributes.name])
    let seen = {};
    let deleteRepeats = id.filter(item => {
        return seen.hasOwnProperty(item[1]) ? false : (seen[item[1]] = true);
    })
    let returnData = deleteRepeats.map(item => {
        return {
            "id": item[0],
            "type": "songs"
        }
    })
    return returnData
}

const request = (method, string, token) => {
    return axios({
        method: method,
        url: baseUrl+string,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
}

const createPlaylist = (name, string, token) => {
    return axios({
        method: 'POST',
        url: baseUrl+string,
        data: {
            name: `${name}`
        },
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

    })
}

const createApplePlaylist = async (musicUserToken, playName, songIds) => {
    console.log(playName, 'playName')
    console.log(songIds, 'songIds')
    console.log(musicUserToken, 'musicUser')

    let play =await fetch('https://api.music.apple.com/v1/me/library/playlists',{
        method: 'POST',
        headers:{
            'authorization': "Bearer "+ apiID.appleAuth,
            'music-user-token':musicUserToken
        },
        body:JSON.stringify({
            "attributes":{
                "name" : playName,
                "description": "Created by Playlist Converter"
            },
            "relationships":{
                "tracks":{
                    "data": songIds
                }
            }
        })
    })
    console.log(play)
    return play.json()


}

const addAppleSongs = async(playID, musicUserToken, songIds) => {
     console.log(songIds)
     let add = fetch('https://api.music.apple.com/v1/me/library/playlists/'+playID+'/tracks', {
        method: 'POST',
        headers: {
            'authorization': "Bearer " + apiID.appleAuth,
            'music-user-token': musicUserToken
        },
        body: JSON.stringify( {
            "data":songIds
        })
    })
    return add
}

const fetchApplePlaylists = async (musicUserToken) => {
    console.log(musicUserToken)
    let add = await fetch('https://api.music.apple.com/v1/me/library/playlists?limit=100', {
        method: 'GET',
        headers: {
            'authorization': "Bearer " + apiID.appleAuth,
            'music-user-token': musicUserToken
        }
    })
    return add.json()
}


export default {
    request: request,
    createPlaylist: createPlaylist,
    appleRequest: appleRequest,
    getAppleSongIds: getAppleSongIds,
    createApplePlaylist: createApplePlaylist,
    addAppleSongs: addAppleSongs,
    fetchApplePlaylists: fetchApplePlaylists

}