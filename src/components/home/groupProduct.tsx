import React from 'react';
import { useNavigate } from 'react-router-dom';
const GroupProduct: React.FC = () => {
    const navigate = useNavigate();
    const groups = [
        [
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761016584/carlos-torres-fouVDmGXoPI-unsplash_1_kwrlsd.jpg", keyword: "shirt" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761016584/pexels-pixabay-267320_1_mgpeod.jpg", keyword: "shoes" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761016584/pexels-romanp-16170_1_alhtv9.jpg", keyword: "jacket" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761016584/pexels-micaasato-1082528_1_eyg4y4.jpg", keyword: "jean" },
        ],
        [
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017007/pexels-blankspace-2647714_1_hvizzs.jpg", keyword: "tabel" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017007/pexels-donghuangmingde-2177482_1_dhefec.jpg", keyword: "booksheft" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017007/pexels-markusspiske-105004_1_htuqnq.jpg", keyword: "chair" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017007/pexels-pixabay-279746_1_mnugmo.jpg", keyword: "bed" },
        ],
        [
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017535/pexels-pixabay-274506_z2rgao.jpg", keyword: "football" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017535/pexels-pixabay-358042_hpeps5.jpg", keyword: "basketball" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017535/pexels-karola-g-4966373_jekdew.jpg", keyword: "badminton rackets" },
            { img: "https://res.cloudinary.com/dzayvuc1z/image/upload/v1761017534/istockphoto-486689763-1024x1024_nkkbqc.jpg", keyword: "paddle" },
        ],
    ];
    return (
        <div className="flex flex-col items-center py-10   bg-[#D9D9D9]">
            {/* Dòng các nhóm */}
            <div className="flex flex-wrap justify-center gap-14 px-4">
                {groups.map((group, i) => (
                    <div
                        key={i}
                        className="bg-white  shadow-md p-6 w-[420px] flex flex-col gap-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {group.map((item, j) => (
                                <div
                                    key={j}
                                    onClick={() => navigate(`/${item.keyword}`)} // 👈 Điều hướng tới SearchResult
                                    className="flex flex-col items-center justify-center border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.keyword}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <p className="text-sm text-gray-700 mt-1 capitalize">
                                        {item.keyword}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default GroupProduct;