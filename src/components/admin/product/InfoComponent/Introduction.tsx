
import type { SelectChangeEvent } from '@mui/material';
import React from 'react';
import { Grid, TextField } from "@mui/material";
interface Props {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: SelectChangeEvent) => void;
}
const Introduction: React.FC<Props> = ({ formData, onChange }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-300">
                <h3 className="font-semibold text-gray-900">Introduction</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto py-2 flex flex-col md:px-14">
                {/* Container Grid */}
                <Grid container spacing={2} sx={{ flexDirection: "column" }}>
                    {/* Grid Items với size mới */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Product Name"
                            required
                            fullWidth
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Price ($)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            name="price"
                            value={formData.price}
                            onChange={onChange}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Stock"
                            type="number"
                            fullWidth
                            variant="outlined"
                            name="stock"
                            value={formData.stock}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Introduction;


// import type { SelectChangeEvent } from '@mui/material';
// import React from 'react';
// // import { TextField } from "@mui/material/";
// // import Grid from "@mui/material/Grid";
// import { Grid, TextField } from "@mui/material";
// interface Props {
//     formData: any;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onSelectChange: (e: SelectChangeEvent) => void;
// }

// const Introduction: React.FC<Props> = ({ formData, onChange }) => {
//     return (
//         <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden px-6 md:px-0">
//             {/* Header */}
//             <div className="px-4 py-3 border-b border-gray-300">
//                 <h3 className="font-semibold text-gray-900">Introduction</h3>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto py-2 flex flex-col md:px-14">
//                 <Grid container spacing={2} sx={{ flexDirection: "column" }}>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="Product Name"
//                             required
//                             fullWidth
//                             variant="outlined"
//                             name="name"
//                             value={formData.name}
//                             onChange={onChange}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="Price ($)"
//                             type="number"
//                             fullWidth
//                             variant="outlined"
//                             name="price"
//                             value={formData.price}
//                             onChange={onChange}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="Stock"
//                             type="number"
//                             fullWidth
//                             variant="outlined"
//                             name="stock"
//                             value={formData.stock}
//                             onChange={onChange}
//                         />
//                     </Grid>
//                 </Grid>

//             </div>

//         </div>

//     );
// };

// export default Introduction;    