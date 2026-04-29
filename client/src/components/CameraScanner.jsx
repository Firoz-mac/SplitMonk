import React, { useRef, useEffect } from 'react'

const CameraScanner = ({ onClose }) => {

    const videoRef = useRef(null);

    useEffect(() => {
        startCamera();

        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error(err);
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md rounded-lg"
            />

            <button
                onClick={() => {
                    stopCamera();
                    onClose();
                }}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
                Close
            </button>
        </div>
    );
}

export default CameraScanner