import React from 'react';

const Login = ()=> {
    const REACT_APP_CLIENT_ID='52e8d8d4caef421282f7f37369eaa7ea'
    const REACT_APP_AUTHORIZE_URL='https://accounts.spotify.com/authorize'
    const REACT_APP_REDIRECT_URL='http://localhost:3000/redirect'

    const handleLogin = () => {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=playlist-modify-public%20playlist-modify-private%20user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative&response_type=token&show_dialog=true`;
    };

    return (
        <button data-testid="but" onClick = {handleLogin}>Login to Spotify</button>
    )
}

export default Login;