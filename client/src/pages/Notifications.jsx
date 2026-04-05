import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { RiFlag2Fill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

const Notifications = () => {
    const { notifications, axios, setUnreadCount } = useAppContext();

    useEffect(() => {
        const markAsRead = async () => {
            try {
                const { data } = await axios.post('/api/notifications/read');
                if (data.success) {
                    setUnreadCount(0);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        markAsRead();
    }, []);

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return Math.floor(seconds / 60) + " min ago";
        if (seconds < 86400) return Math.floor(seconds / 3600) + " hr ago";

        return Math.floor(seconds / 86400) + " day ago";
    };

    const getIcon = (type) => {
        switch (type) {
            case "split":
            return <RiFlag2Fill />;
            case "payment":
            return <MdPayment />;
            default:
            return <RiFlag2Fill />;
        }
    };

    const isToday = (date) => {
        const d = new Date(date);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    };

    const todayNotifications = notifications.filter(n => isToday(n.createdAt));
    const olderNotifications = notifications.filter(n => !isToday(n.createdAt));

    return (
        <div className='flex flex-col gap-3'>
            <h4 className='text-lg font-semibold'>Notifications</h4>

            <div className='flex flex-col gap-2'>
                
                {todayNotifications.length > 0 && (
                    <>
                    <span className='text-[var(--text-dull)]'>Today</span>
                    {todayNotifications.map((item) => (
                        <div
                            key={item._id}
                            className={`bg-[var(--bg-card)]/80 backdrop-blur-md rounded-2xl border border-[var(--border)] flex gap-4 p-5 items-center ${!item.isRead && "border-[var(--primary)]"
                                }`}
                        >
                            <div className='bg-[var(--primary)] rounded-lg flex justify-center items-center p-3'>
                                {getIcon(item.splitType)}
                            </div>

                            <div className='flex flex-col'>
                                <p className={`${!item.isRead && "font-semibold"}`}>
                                    {item.message}
                                </p>

                                <span className='text-xs text-[var(--text-dull)]'>
                                    {getTimeAgo(item.createdAt)}
                                </span>
                            </div>
                        </div>
                    ))}
                    </>
                )}

                {olderNotifications.length > 0 && (
                    <>
                    <span className='text-[var(--text-dull)]'>Earlier</span>
                    {olderNotifications.map((item) => (
                        <div
                            key={item._id}
                            className={`bg-[var(--bg-card)]/80 backdrop-blur-md rounded-2xl border border-[var(--border)] flex gap-4 p-5 items-center ${!item.isRead && "border-[var(--primary)]"
                                }`}
                        >
                            <div className='bg-[var(--primary)] rounded-lg flex justify-center items-center p-3'>
                                {getIcon(item.splitType)}
                            </div>

                            <div className='flex flex-col'>
                                <p className={`${!item.isRead && "font-semibold"}`}>
                                    {item.message}
                                </p>

                                <span className='text-xs text-[var(--text-dull)]'>
                                    {getTimeAgo(item.createdAt)}
                                </span>
                            </div>
                        </div>
                    ))}
                    </>
                )}

            </div>
        </div>
    )
}

export default Notifications