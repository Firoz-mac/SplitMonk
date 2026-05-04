import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import socket from "../socket";
import { UtensilsCrossed, CarTaxiFront, Handbag, ReceiptText, Clapperboard, Dices, Trash2 } from 'lucide-react';


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("splitzyToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;



export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    
    const navigate = useNavigate();
    const [theme, setTheme] = useState('dark');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [openCamera, setOpenCamera] = useState(false)
    
    const [newSplitData, setNewSplitData] = useState({
        title: '',
        amount: '',
        category:'',
        creatorAmount:'',
        splitType: 'equal',
        participants: []
    });

    const [splits, setSplits] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [monthlyLimit, setMonthlyLimit] = useState([]);
    const categoryIcons = {
        Food: UtensilsCrossed,
        Travel: CarTaxiFront,
        Shopping: Handbag,
        Bills: ReceiptText,
        Entertainment: Clapperboard,
        Other: Dices
    };

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
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                navigate('/home')
            }
        } catch (error) {
            setUser(null);
        }
    }

    const getExpenses = async ()=>{
        try {
            const {data} = await axios.get('/api/expense/get');
            if(data.success){
                setExpenses(data.expenses);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getSplits = async ()=>{
        try {
            const {data} = await axios.get('/api/split/get');
            if(data.success){
                setSplits(data.splits);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getNotifications = async ()=>{
        try {
            const {data} = await axios.get('/api/notifications/get');
            if(data.success){
                setNotifications(data.notifications);
                const unread = data.notifications.filter(n=> !n.isRead).length;
                setUnreadCount(unread);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getMonthlyLimit = async ()=>{
        try {
            const {data} = await axios.get('/api/limit/get');
            if(data.success){
                setMonthlyLimit(data.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogout = async ()=>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if(data.success){
                localStorage.removeItem("splitzyToken");
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
        isUserAuth();
    },[]);

    useEffect(()=>{
        if(user){
            getNotifications();
            getExpenses();
            getSplits();
            getMonthlyLimit();
        }

        if(user?._id){
            socket.emit("join", user._id);
        }
    },[user]);

    useEffect(()=>{
        socket.on("new-notification", (notification)=>{
            console.log("New Notification : ", notification);

            setNotifications(prev=>[notification, ...prev]);

            getSplits();

            setUnreadCount(prev => prev + 1);

            toast.info(notification.message);
            
        });

        return ()=> socket.off("new-notification");
    },[]);

    const value ={navigate, theme, setTheme, axios, user, setUser, 
        handleLogout, isUserAuth, loading, setLoading, openCamera, setOpenCamera, expenses, 
        setExpenses, newSplitData, setNewSplitData, splits,
        setSplits, getSplits, getExpenses, notifications, 
        unreadCount, setUnreadCount, monthlyLimit, getMonthlyLimit, categoryIcons};
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}