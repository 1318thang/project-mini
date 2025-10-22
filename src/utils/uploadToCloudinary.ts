// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = "dzayvuc1z";
    const preset = "my_unsigned_preset_dat";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
    });

    if (!res.ok) throw new Error("Upload failed");

    const result = await res.json();
    return result.secure_url; // lấy URL ảnh
};
