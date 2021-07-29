

const Recommendations = ({recs}) => {
    if (recs){
        return(
            <ul>
                <li>Track List</li>
                <ul>
                    {recs.tracks.map(track=>(
                        <li data-testid="title" key={track.id}>{track.name}<img src = {track.album.images[2].url} alt = "album art"/></li>
                    ))}
                </ul>
            </ul>
        )
    }
    return(<div data-testid="none" />)
}

export default Recommendations