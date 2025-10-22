import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50  ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] flex flex-col">
                {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

                {/* Nội dung có scroll */}
                <div className="text-gray-700 overflow-y-auto flex-1">
                    {children}
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;