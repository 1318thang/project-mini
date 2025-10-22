import React from 'react';
import logotemplate from '../../../public/logotemplate.jpg';
interface Props {
    className: string
}

const Logo: React.FC<Props> = ({ className }) => {
    console.log(className);
    return (
        <div id="logo" className="flex-shrink-0">
            <a href='/'>
                <img src={logotemplate} alt="logo" className="h-[50px] w-auto object-contain" />
            </a>
        </div>
    );
};

export default Logo;