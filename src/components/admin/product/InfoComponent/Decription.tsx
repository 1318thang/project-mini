import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface FormData {
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    // thêm các field khác nếu có
}
interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Decription: React.FC<Props> = ({ formData, setFormData }) => (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-300">
            <h3 className="font-semibold text-gray-900">Decription Product</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto py-2 flex flex-col md:px-14">
            <div>

                <CKEditor
                    editor={ClassicEditor as any}
                    data={formData.description}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(event);
                        // setFormData((prev) => ({ ...prev, description: data }));
                        setFormData((prev: FormData) => ({ ...prev, description: data }));
                    }}
                />
            </div>

        </div>

    </div>

);

export default Decription;
