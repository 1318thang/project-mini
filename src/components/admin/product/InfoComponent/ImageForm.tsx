
import React from "react";
import { Box, Button, Paper, IconButton } from "@mui/material";
import { Grid } from "@mui/material";
import { DeleteIcon } from "lucide-react";

interface Props {
    preview: string | null;
    secondaryPreviews: string[];
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSecondaryImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (index: number) => void;
}

const ImageForm: React.FC<Props> = ({
    preview,
    secondaryPreviews,
    handleImageChange,
    handleSecondaryImagesChange,
    handleRemoveImage,
}) => (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-300">
            <h3 className="font-semibold text-gray-900">Image</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto py-2 flex flex-col md:px-14">
            <Grid container spacing={2} sx={{ flexDirection: "column" }}>
                <Grid size={{ xs: 12 }}>
                    <Button variant="outlined" component="label">
                        Choose Main Image
                        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                    </Button>
                </Grid>

                {preview && (
                    <Grid size={{ xs: 12 }}>
                        <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                            <Box
                                component="img"
                                src={preview}
                                alt="main preview"
                                sx={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain" }}
                            />
                        </Paper>
                    </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                    <Button variant="outlined" component="label">
                        Choose Secondary Images
                        <input type="file" accept="image/*" hidden multiple onChange={handleSecondaryImagesChange} />
                    </Button>
                </Grid>

                {secondaryPreviews.length > 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            {secondaryPreviews.map((url, i) => (
                                <Box key={i} sx={{ position: "relative" }}>
                                    <Box
                                        component="img"
                                        src={url}
                                        alt={`secondary-${i}`}
                                        sx={{ width: 100, height: 100, borderRadius: 2, border: "2px solid #ccc" }}
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveImage(i)}
                                        sx={{
                                            position: "absolute",
                                            top: -10,
                                            right: -10,
                                            backgroundColor: "rgba(255,255,255,0.8)",
                                            "&:hover": { backgroundColor: "rgba(255,0,0,0.8)", color: "white" },
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </div>
    </div>
);

export default ImageForm;

// import React from "react";
// import { Box, Button, Grid, Paper, IconButton } from "@mui/material";
// import { DeleteIcon } from "lucide-react";

// interface Props {

//     preview: string | null;
//     secondaryPreviews: string[];
//     handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleSecondaryImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleRemoveImage: (index: number) => void;
// }

// const ImageForm: React.FC<Props> = ({
//     preview,
//     secondaryPreviews,
//     handleImageChange,
//     handleSecondaryImagesChange,
//     handleRemoveImage,
// }) => (
//     <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
//         {/* Header */}
//         <div className="px-4 py-3 border-b border-gray-300">
//             <h3 className="font-semibold text-gray-900">Image</h3>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto py-2 flex flex-col md:px-14">
//             <Grid container spacing={2} sx={{ flexDirection: "column" }}>
//                 <Grid item xs={12}>
//                     <Button variant="outlined" component="label">
//                         Choose Main Image
//                         <input type="file" accept="image/*" hidden onChange={handleImageChange} />
//                     </Button>
//                 </Grid>

//                 {preview && (
//                     <Grid item xs={12}>
//                         <Paper elevation={3} sx={{ p: 2, display: "flex", justifyContent: "center" }}>
//                             <Box
//                                 component="img"
//                                 src={preview}
//                                 alt="main preview"
//                                 sx={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain" }}
//                             />
//                         </Paper>
//                     </Grid>
//                 )}

//                 <Grid item xs={12}>
//                     <Button variant="outlined" component="label">
//                         Choose Secondary Images
//                         <input type="file" accept="image/*" hidden multiple onChange={handleSecondaryImagesChange} />
//                     </Button>
//                 </Grid>

//                 {secondaryPreviews.length > 0 && (
//                     <Grid item xs={12}>
//                         <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                             {secondaryPreviews.map((url, i) => (
//                                 <Box key={i} sx={{ position: "relative" }}>
//                                     <Box
//                                         component="img"
//                                         src={url}
//                                         alt={`secondary-${i}`}
//                                         sx={{ width: 100, height: 100, borderRadius: 2, border: "2px solid #ccc" }}
//                                     />
//                                     <IconButton
//                                         onClick={() => handleRemoveImage(i)}
//                                         sx={{
//                                             position: "absolute",
//                                             top: -10,
//                                             right: -10,
//                                             backgroundColor: "rgba(255,255,255,0.8)",
//                                             "&:hover": { backgroundColor: "rgba(255,0,0,0.8)", color: "white" },
//                                         }}
//                                         size="small"
//                                     >
//                                         <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                 </Box>
//                             ))}
//                         </Box>
//                     </Grid>
//                 )}
//             </Grid>

//         </div>

//     </div>

// );

// export default ImageForm;
