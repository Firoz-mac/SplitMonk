import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import { QRCodeCanvas } from "qrcode.react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { assets } from './../assets/assets';
import { useAppContext } from "../context/AppContext";

const CameraScanner = ({ onClose, onCapture, loggedUserQr }) => {

    const { user } = useAppContext();

    useEffect(() => {
        console.log(loggedUserQr);
    }, []);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const [cameraError, setCameraError] = useState("");
    const [showUserQR, setShowUserQR] = useState(false);

    useEffect(() => {
        startCamera();

        return () => {
            stopScanning();
            stopCamera();
        };
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
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    scanQRCode();
                };
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

    const stopScanning = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const scanQRCode = () => {
        if (showUserQR) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
            animationRef.current = requestAnimationFrame(scanQRCode);
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
            stopScanning();
            stopCamera();

            if (onCapture) {
                onCapture(qrCode.data);
            }

            onClose();
            return;
        }

        animationRef.current = requestAnimationFrame(scanQRCode);
    };

    const handleShowQR = () => {
        stopScanning();
        stopCamera();
        setShowUserQR(true);
    };

    const handleClose = () => {
        stopScanning();
        stopCamera();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
            {showUserQR ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black px-6">
                    <div className="w-full max-w-[340px] bg-white p-5 rounded-2xl shadow-2xl">
                        <div className="flex gap-3 justify-center items-center mb-4">
                            <div className="w-10 h-10 bg-amber-300 rounded-full overflow-hidden shrink-0">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user?.profileImg || assets.profileImg1}
                                    alt={user?.userName || "User"}
                                />
                            </div>

                            <span className="text-base font-semibold text-gray-900 truncate">
                                {user?.userName}
                            </span>
                        </div>

                        <div className="flex justify-center">
                            <QRCodeCanvas
                                value={loggedUserQr || ""}
                                size={260}
                                level="H"
                                includeMargin
                            />
                        </div>

                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-500">
                                Scan to pay with splitMonk
                            </span>
                        </div>
                    </div>
                </div>
            ) : cameraError ? (
                <div className="absolute inset-0 flex items-center justify-center px-6">
                    <p className="text-white text-center">{cameraError}</p>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            <div className="absolute inset-x-0 top-0 z-10 flex justify-end p-6 bg-gradient-to-b 
            from-black/60 to-transparent space-x-10">
                <button type="button" onClick={handleShowQR}>
                    <MdOutlineQrCodeScanner className="w-7 h-7 text-white" />
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-full text-white flex items-center justify-center hover:bg-black/60"
                >
                    <IoMdClose className="w-7 h-7" />
                </button>
            </div>

            {!showUserQR && !cameraError && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 border-2 border-white rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default CameraScanner;
