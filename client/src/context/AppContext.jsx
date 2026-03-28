import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    
    const navigate = useNavigate();
    const [theme, setTheme] = useState('dark');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        console.log(user)
    }, [user])

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
    }, [theme]);

    const isUserAuth = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth')
            if(data.success){
                setUser(data.user)
            }
        } catch (error) {
            setUser(null);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async ()=>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if(data.success){
                setUser(null);
                toast.success(data.message);
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        isUserAuth()
    },[])
    

    const value ={navigate, theme, setTheme, axios, user, setUser, handleLogout, loading};
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}