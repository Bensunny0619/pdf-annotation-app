// components/Toolbar.js
import { useState } from 'react';

const Toolbar = ({ onSign, onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState('#ffff00');
    
    return (
        <div className="flex gap-4 my-4 items-center">
            <div className="flex gap-2">
                
            </div>
            <button
                onClick={onSign}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Add Signature
            </button>
        </div>
    );
};

export default Toolbar;