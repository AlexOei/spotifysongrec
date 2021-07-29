import CreatePlaylist from "../CreatePlaylist/createplaylist";
import AddToPlaylist from "../AddToPlaylist/addtoplaylist";

const Destination = ({recs, token, userID, setDone, setPlayID, playlists}) => {

    if(recs && token && playlists){
        console.log(playlists.items)
        return(
            <>
                <AddToPlaylist recs={recs} playlists={playlists} setDone={setDone} setPlayID={setPlayID}/>
                <CreatePlaylist recs={recs} setPlayID={setPlayID} setDone={setDone} userID={userID} token={token}/>
            </>
        )
    }

    return (<div data-testid="none" />)

}

export default Destination