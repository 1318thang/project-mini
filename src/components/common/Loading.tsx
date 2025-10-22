import React from "react";
// import loadingGif from "../assets/delivery.gif"; // file gif động
import loading from "../../../public/loading.mp4";
const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
            <video
                src={loading}
                autoPlay
                loop
                muted
                playsInline
                className="w-34 h-34 object-contain"
            />

        </div>
    );
};

export default Loading;