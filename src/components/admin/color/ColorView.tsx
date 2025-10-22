import React from 'react';
interface Props {

}
const ColorView: React.FC<Props> = () => {

    return (
        <div className="mx-auto mt-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Product Color</h3>
                    {/* <p className="text-sm text-gray-500 mt-1">
                        Product Color
                    </p> */}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam perferendis cum ratione voluptatum, labore ducimus, reiciendis libero quia possimus tenetur cupiditate beatae! Dolor, facilis quod? Earum culpa nesciunt eveniet placeat.
                    Neque quod ipsam alias sapiente sint iure cum dicta ducimus unde corrupti quia esse consectetur, repellendus fugit repudiandae corporis illum, eos voluptatibus. Deserunt ipsam, impedit maxime modi maiores consectetur quae.
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-50 text-gray-700">
                            {/* <tr>
                                <th className="px-4 py-3 font-medium">Image</th>
                                <th className="px-4 py-3 font-medium">Product Name</th>
                                <th className="px-4 py-3 font-medium">Added On</th>
                                <th className="px-4 py-3 font-medium">Last Updated</th>
                            </tr> */}
                        </thead>

                        <tbody>
                            {/* {products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-4 py-3">
                                        <img
                                            src={p.mainImage}
                                            alt="product"
                                            className="w-14 h-14 rounded-md object-cover border border-gray-200"
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                                            <span className="text-xs text-gray-500 mt-0.5">{p.category}</span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-gray-500">
                                        {p.created_at ? new Date(p.created_at).toLocaleDateString("vi-VN") : ""}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {p.update_at ? new Date(p.update_at).toLocaleDateString("vi-VN") : ""}
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ColorView;