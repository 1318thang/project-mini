import React, { useEffect, useState } from 'react';
// import type{ Attributes } from 'react';
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {

    type SelectChangeEvent,

} from "@mui/material";
import type { productType } from '../../../type/product/productType';
import Introduction from "../../../components/admin/product/InfoComponent/Introduction";
import Decription from "../../../components/admin/product/InfoComponent/Decription";
import Attribute from "../../../components/admin/product/InfoComponent/Attribute";
import Image from "../../../components/admin/product/InfoComponent/ImageForm";
import { CategoryRepository } from "../../../api/categoryAttributes/categoryRepository";
import { useDispatch } from 'react-redux';
import { getAllCategories, getCategoryAttribute } from '../../../redux/category/categorySlice';
import type { categoryAttributesType } from '../../../type/categoryAttribute/categoryAttribute';
import type { attributesType } from '../../../type/attribute/AttributeType';
import type { ProductAttributeValuesType } from '../../../type/productAttributesValue/ProductAttributesValuesType';

interface Props {
    // onCreate: (data: Omit<productType, "id">) => Promise<void>;
    onCreate: (data: FormData) => Promise<void>;
}
const ProductForm: React.FC<Props> = ({ onCreate }) => {
    //
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<'Introduction' | 'Decription' | 'Attribute' | 'Image'>('Introduction');
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const tabs = [
        { key: "Introduction", label: "Introduction" },
        { key: "Decription", label: "Decription" },
        { key: "Attribute", label: "Attribute" },
        { key: "Image", label: "Image" },


    ];
    console.log(loading)
    const [formDataCategory, setFormDataCategory] = useState<Partial<Omit<categoryAttributesType, "id">>>({
        CategoryName: "", // name của category (fashion, electronic, furniture,...)
    });

    const [formAttribute, setFormAttribute] = useState<Partial<Omit<attributesType, "id">>>({
        Name: "", // name của attribute (color, height, width,...)
        Id: 0
    });
    console.log(setFormAttribute);
    const [formData, setFormData] = useState<Partial<Omit<productType, "id">>>({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        categoryName: formDataCategory.CategoryName || "",
        AttributeId: formAttribute.Id || 0,
        mainImage: "",
        secondaryImage: [],
        // productAttributeValues: [] // get list value từ from component Attribute
        productAttributeValues: [] as ProductAttributeValuesType[], // ✅ đúng kiể
    });
    const getAllCategory = async () => {
        try {
            var data = await CategoryRepository.getAllCategory();
            dispatch(getAllCategories(data));

            return data;
        } catch (e: any) {
            console.error(e);
        }
    }
    const getAllAttributeCategory = async (categoryName: string) => {
        try {
            // console.log(categoryName);
            if (!categoryName || categoryName.trim() === "") {
                console.warn("CategoryName is empty, API call skipped");
                return [];
            }
            categoryName = categoryName.trim();
            // console.log("dat nè " + categoryName);
            var data = await CategoryRepository.getCategoryAttribute(categoryName);
            // console.log(data)
            dispatch(getCategoryAttribute(data));
            return data?.map((attr: any) => attr.Name) || []; // đảm bảo luôn là string[]
        } catch (e: any) {

            console.error(e);
            console.error("API Error:", e.response?.data || e);
        }
    }
    const renderContent = () => {
        switch (activeTab) {
            case "Introduction":
                return (
                    <Introduction
                        formData={formData}
                        onChange={handlChange}
                        onSelectChange={handleSelectChange}

                    />
                );
            case "Decription":
                return <Decription formData={formData} setFormData={setFormData} />;
            case "Attribute":
                return <Attribute
                    formData={formData}
                    onChange={handlChange}
                    onCategoryChange={handleCategoryChange}
                    onSelectAttributeChange={handleAttributeChange} />;
            case "Image":
                return (
                    <Image
                        preview={preview}
                        secondaryPreviews={secondaryPreviews}
                        handleImageChange={handleImageChange}
                        handleSecondaryImagesChange={handleSecondaryImagesChange}
                        handleRemoveImage={handleRemoveImage}
                    />
                );
            default:
                return null;
        }
    };
    const handleAttributeChange = (
        attrId: number,
        newValue: null | string,
        index: number,
        remove?: boolean
    ) => {
        setFormData(prev => {
            const attributes = prev.productAttributeValues ?? [];

            // Tìm attribute hiện tại
            const attr = attributes.find((a: any) => a.attributeId === Number(attrId));

            if (attr) {
                // clone array value hiện tại để tránh mutate trực tiếp
                const values = [...attr.value];
                // console.log("remove = " + remove);
                // console.log("newValue = " + newValue);
                if (remove && newValue === null) {
                    values.splice(index, 1);
                } else if (newValue !== null) {
                    // console.log("index = " + index);
                    // console.log("values.length = " + values.length)
                    if (index >= values.length) {
                        values.push(newValue);
                    } else {
                        values[index] = newValue;
                    }
                }
                // tạo object attribute mới hoàn toàn
                const updatedAttr = { ...attr, value: values };

                // trả về state mới clone toàn bộ mảng
                return {
                    ...prev,
                    productAttributeValues: attributes.map((a: ProductAttributeValuesType) =>
                        a.attributeId === attrId ? updatedAttr : { ...a }
                    ),
                };
            }
            else if (!remove && newValue !== null) {
                // nếu chưa tồn tại attribute trong state thì push mới
                console.log();
                return {
                    ...prev,
                    productAttributeValues: [
                        ...attributes,
                        { attributeId: attrId, value: [newValue] },
                    ],
                };
            }
            return prev;
        });
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl); // hiển thị preview
            setSelectedFile(file); // 👈 Lưu file vào state
            // Lưu vào formData
            setFormData((prev) => ({
                ...prev,
                imageUrl: previewUrl, // lưu tạm preview URL
            }));
        }
    };
    // 🧩 Thêm state để quản lý ảnh phụ
    // State lưu nhiều ảnh phụ
    const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);
    const [secondaryFiles, setSecondaryFiles] = useState<File[]>([]);
    // State lưu danh sách attribute dynamic
    const [formAttributes, setFormAttributes] = useState<string[]>([])
    const handleSecondaryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            // Cập nhật preview mới (gộp với cũ)
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setSecondaryPreviews(prev => [...prev, ...newPreviews]);

            // Lưu các file (gộp với cũ)
            setSecondaryFiles(prev => [...prev, ...files]);
        }
    };
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    console.log(formAttributes)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.name == null) {
            return alert("You need full info")

        }

        try {
            setLoading(true);
            const formDataToSend = new FormData();

            // 📝 Thêm các field text
            formDataToSend.append("name", formData.name ?? "");
            formDataToSend.append("price", String(formData.price ?? 0));
            formDataToSend.append("description", formData.description ?? "");
            formDataToSend.append("category", formData.categoryName ?? "");
            formDataToSend.append("stock", String(formData.stock ?? 0));
            // 🧩 Thêm productAttributeValues (chuyển sang JSON)
            formDataToSend.append(
                "productAttributeValues",
                JSON.stringify(formData.productAttributeValues ?? [])
            );

            // 🖼️ File ảnh chính
            if (selectedFile) {
                formDataToSend.append("MainImageFile", selectedFile);
            }

            // 🖼️ Các ảnh phụ (nhiều ảnh)
            if (secondaryFiles.length > 0) {
                secondaryFiles.forEach(file => {
                    formDataToSend.append("secondaryImagesFile", file);
                });
            }

            // 🕓 Ngày tạo & cập nhật
            formDataToSend.append("created_at", new Date().toISOString());
            formDataToSend.append("update_at", new Date().toISOString());

            // 🧩 Gọi hàm tạo
            await onCreate(formDataToSend);
            // ✅ Reset toàn bộ form sau khi gửi thành công
            setFormData({
                name: "",
                price: 0,
                description: "",
                stock: 0,
                mainImage: "",
                secondaryImage: [],
            });
            setSelectedFile(null);
            setSecondaryFiles([]);
            setPreview(null);              // 🧩 Reset ảnh chính preview
            setSecondaryPreviews([]);      // 🧩 Reset ảnh phụ preview
            // 🧩 Reset input file (DOM)
            const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
            fileInputs.forEach(input => (input.value = "")); // clear file input
            alert("✅ Thêm sản phẩm thành công!");
        } catch (error) {
            console.error("Submit failed:", error);
        } finally {
            setLoading(false);
        }
    };
    const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData(prev => ({
            ...prev,
            category: e.target.value  // 👈 cập nhật thẳng vào formData.category
        }));

    };
    const handleRemoveImage = (index: number) => {
        setSecondaryPreviews((prev) => prev.filter((_, i) => i !== index));
    };
    // Callback để nhận categoryName từ Attribute
    const handleCategoryChange = async (categoryName: string) => {
        setFormData(prev => ({
            ...prev,
            categoryName: categoryName
        }));

        setFormDataCategory({ CategoryName: categoryName }); // cập nhật state category

        // gọi API lấy attribute theo category
        const attributes = await getAllAttributeCategory(categoryName);
        setFormAttributes(attributes || []); // lưu danh sách attribute để render TextField
    };
    useEffect(() => {
        getAllCategory();
    }, [])
    useEffect(() => {
        if (formDataCategory.CategoryName != "") {
            getAllAttributeCategory(formDataCategory.CategoryName as string);
        }
    }, [formDataCategory.CategoryName])
    return (
        <div className=" mx-auto mt-6  md:px-30 ">
            <div className="flex gap-2 mb-6 px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as "Introduction" | "Decription" | "Attribute" | "Image")}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium 
        ${activeTab === tab.key
                                ? "bg-gray-800  text-white shadow"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        {tab.label}
                    </button>
                ))}
                <button onClick={handleSubmit} className='px-6 py-2.5 ml-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition'>💾Save</button>

            </div>
            {renderContent()}

        </div>
    );
};

export default ProductForm;