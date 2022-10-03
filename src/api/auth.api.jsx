import axios from 'axios'
import React, { useState, useEffect } from 'react' 

var present = document.cookie.indexOf('auth_token=');

const token = (present === -1)
? null
: document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    .split('=')[1];

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        const checkAuth = async() => {
            await axios({
                method: 'get',
                url: 'http://localhost:5000/api/auth',
                withCredentials: true,
                headers: {authorization: token}
            }).then((props) => {
                // console.log(props.data);
                setAuth(props.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        // console.log(auth);
        checkAuth();
    }, [auth]);

    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

const handleLogin = async (
    mail,
    password,
    setLoading,
    navigate,
    Notifications
) => {
    setLoading(true);
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/login',
        withCredentials: true,
        headers: {'Content-Type': 'application/json'},
        data: {email: mail, password: password}
    }).then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/');
    }).catch((err) => {
        console.log(err);
        setLoading(false);
        Notifications("There was an error", err.message);
    })
}

const handleRegister = async (
    name,
    mail,
    password,
    setLoading,
    navigate,
    Notifications
) => {
    setLoading(true);
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users',
        withCredentials: true,
        headers: {'Content-Type': 'application/json'},
        data: {name: name, email: mail, password: password}
    }).then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/');
    }).catch((err) => {
        console.log(err);
        setLoading(false);
        Notifications("There was an error", err.message);
    })
}

export { 
    AuthProvider, 
    token, 
    AuthContext, 
    handleLogin,
    handleRegister
};