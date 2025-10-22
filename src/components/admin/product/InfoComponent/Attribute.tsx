import React from "react";
import {
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box
} from "@mui/material";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

interface Props {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (categoryName: string) => void;
    onSelectAttributeChange: (
        attrId: number,
        newValue: string | null,
        index: number,
        remove?: boolean
    ) => void;
}

const Attribute: React.FC<Props> = ({
    formData,
    onCategoryChange,
    onSelectAttributeChange
}) => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoryAttribute = useSelector((state: RootState) => state.categories.categoryAttribute);

    const handleCategorySelect = (e: any) => {
        onCategoryChange(e.target.value);
    };

    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-300">
                <h3 className="font-semibold text-gray-900">Attributes</h3>
            </div>

            <div className="overflow-x-auto py-2 flex flex-col md:px-14">
                <Grid container spacing={2} direction="column">
                    {/* Chọn Category */}
                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                            <InputLabel>Choose Category</InputLabel>
                            <Select
                                name="categoryName"
                                value={formData.categoryName || ""}
                                onChange={handleCategorySelect}
                                label="Choose Category"
                            >
                                {categories.map((c: any, index: number) => (
                                    <MenuItem key={index} value={c.categoryName}>
                                        {c.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Hiển thị attribute */}
                    {categoryAttribute &&
                        categoryAttribute.length > 0 &&
                        categoryAttribute.map((attr: any) => {
                            const attrObj = formData.productAttributeValues?.find(
                                (v: any) => v.attributeId === Number(attr.id)
                            );
                            const values: string[] = attrObj?.value || [];

                            return (
                                <Grid size={{ xs: 12 }} key={attr.id}>
                                    <Box sx={{ mb: 1 }}>
                                        <strong>{attr.name}</strong>
                                    </Box>
                                    <Grid container spacing={1} alignItems="center">
                                        {values.map((val: string, idx: number) => (
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx} sx={{ display: "flex", gap: 1, mb: 1 }}>
                                                <TextField
                                                    value={val}
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={(e) =>
                                                        onSelectAttributeChange(attr.id, e.target.value, idx)
                                                    }
                                                />
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() =>
                                                        onSelectAttributeChange(attr.id, null, idx, true)
                                                    }
                                                >
                                                    ❌
                                                </Button>
                                            </Grid>
                                        ))}

                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => onSelectAttributeChange(Number(attr.id), "", values.length)}
                                            >
                                                + Add {attr.name}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
            </div>
        </div>
    );
};

export default Attribute;


// import React from "react";
// import {
//     TextField,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Button,
//     Box
// } from "@mui/material";
// import type { RootState } from "../../../../redux/store";
// import { useSelector } from "react-redux";

// interface Props {
//     formData: any;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onCategoryChange: (categoryName: string) => void; // callback để thông báo lên cha
//     onSelectAttributeChange: (
//         attrId: number,
//         newValue: string | null,
//         index: number,
//         remove?: boolean
//     ) => void;
// }

// const Attribute: React.FC<Props> = ({
//     formData,
//     onCategoryChange,
//     onSelectAttributeChange
// }) => {
//     const categories = useSelector((state: RootState) => state.categories.categories);
//     const categoryAttribute = useSelector((state: RootState) => state.categories.categoryAttribute);

//     const handleCategorySelect = (e: any) => {
//         onCategoryChange(e.target.value); // gửi category lên ProductForm
//     };

//     return (
//         <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
//             {/* Header */}
//             <div className="px-4 py-3 border-b border-gray-300">
//                 <h3 className="font-semibold text-gray-900">Attributes</h3>
//             </div>

//             <div className="overflow-x-auto py-2 flex flex-col md:px-14">
//                 <Grid container spacing={2} sx={{ flexDirection: "column" }}>
//                     {/* Chọn Category */}
//                     <Grid item xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel>Choose Category</InputLabel>
//                             <Select
//                                 name="categoryName"
//                                 value={formData.categoryName || ""}
//                                 onChange={handleCategorySelect}
//                                 label="Choose Category"
//                             >
//                                 {categories.map((c: any, index: number) => (
//                                     <MenuItem key={index} value={c.categoryName}>
//                                         {c.categoryName}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Hiển thị attribute */}
//                     {categoryAttribute &&
//                         categoryAttribute.length > 0 &&
//                         categoryAttribute.map((attr: any) => {
//                             const attrObj = formData.productAttributeValues?.find(
//                                 (v: any) => v.attributeId === Number(attr.id) // ép kiểu Number nếu cần

//                             );

//                             const values: string[] = attrObj?.value || [];

//                             return (
//                                 <Grid item xs={12} key={attr.id}>
//                                     <Box sx={{ mb: 1 }}>
//                                         <strong>{attr.name}</strong>
//                                     </Box>
//                                     <Grid container spacing={1} alignItems="center">
//                                         {values.map((val: string, idx: number) => (
//                                             <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: "flex", gap: 1, mb: 1 }}>
//                                                 <TextField
//                                                     value={val}
//                                                     fullWidth
//                                                     variant="outlined"
//                                                     onChange={(e) =>
//                                                         onSelectAttributeChange(attr.id, e.target.value, idx,)
//                                                     }
//                                                 />
//                                                 <Button
//                                                     variant="outlined"
//                                                     color="error"
//                                                     onClick={() =>
//                                                         onSelectAttributeChange(attr.id, null, idx, true)
//                                                     }
//                                                 >
//                                                     ❌
//                                                 </Button>
//                                             </Grid>
//                                         ))}

//                                         <Grid item xs={12}>
//                                             <Button
//                                                 variant="contained"
//                                                 size="small"
//                                                 onClick={() => onSelectAttributeChange(Number(attr.id), "", values.length)}
//                                             >
//                                                 + Add {attr.name}
//                                             </Button>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             );
//                         })}
//                 </Grid>
//             </div>
//         </div>
//     );
// };

// export default Attribute;
