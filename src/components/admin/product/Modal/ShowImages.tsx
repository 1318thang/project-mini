interface Props {
    setShowImages: (show: boolean) => void;
    selectedImages: string[];
}

const ShowImages: React.FC<Props> = ({ setShowImages, selectedImages }) => {

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <h3 className="font-semibold mb-3">Tất cả ảnh phụ</h3>
                <div className="grid grid-cols-3 gap-3">
                    {selectedImages.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded-md border" />
                    ))}
                </div>
                <button
                    onClick={() => setShowImages(false)}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default ShowImages;