import React from "react";
type SectionTitleProps = {
    text: string;
};
const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
    return (
        <div className="flex justify-center bg-white p-4">
            <h3>
                <b>
                    {text}
                    <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
                </b>
            </h3>
        </div>
    );
};
export default SectionTitle;
