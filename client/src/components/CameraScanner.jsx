import React, { useRef, useEffect, useState } from 'react'
import { GrFormCheckmark } from "react-icons/gr";
import { IoMdRefresh } from "react-icons/io";

const CameraScanner = ({ onClose, onCapture }) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraError, setCameraError] = useState("");

    useEffect(() => {
        startCamera();

        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            setCameraError("");

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

        } catch (err) {
            console.error(err);
            setCameraError("Unable to access camera");
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);

        stopCamera();
    };

    const retakeImage = () => {
        setCapturedImage(null);
        startCamera();
    };

    const useImage = () => {
        if (onCapture) {
            onCapture(capturedImage);
        }

        onClose();
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/70 to-transparent">
                <h2 className="text-white text-lg font-semibold"></h2>

                <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25"
                >
                    ✕
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-4">
                {cameraError ? (
                    <p className="text-white text-center">{cameraError}</p>
                ) : capturedImage ? (
                    <img
                        src={capturedImage}
                        alt="captured"
                        className="w-full max-w-md rounded-2xl object-cover shadow-xl"
                    />
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full max-w-md rounded-2xl object-cover shadow-xl"
                    />
                )}
            </div>

            <div className="px-6 py-6 bg-gradient-to-t from-black/80 to-transparent">
                {capturedImage ? (
                    <div className="flex gap-3">
                        <button
                            onClick={retakeImage}
                            className="flex-1 py-3 rounded-xl bg-white/15 text-white font-medium hover:bg-white/25 flex justify-center items-center"
                        >
                            <IoMdRefresh className='text-2xl'/>
                        </button>

                        <button
                            onClick={useImage}
                            className="flex-1 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 flex justify-center items-center"
                        >
                            <GrFormCheckmark className='text-2xl'/>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={captureImage}
                        className="mx-auto w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
                    >
                        <span className="w-14 h-14 rounded-full bg-white block" />
                    </button>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

export default CameraScanner