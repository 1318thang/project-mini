import React from "react";

type LoadMoreButtonProps = {
    onClick?: () => void;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
    return (
        <div className="flex justify-center p-3">
            <button onClick={onClick} className="px-10 py-3 bg-white rounded-md shadow">
                Thêm
            </button>
        </div>
    );
};

export default LoadMoreButton;
