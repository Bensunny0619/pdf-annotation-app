"use client";

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onSave }) => {
    const sigCanvas = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const handleClear = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
            setIsEmpty(true);
        }
    };

    const handleSave = () => {
        console.log("Save button clicked"); // ✅ This must log!
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            console.log("Generated signature data URL:", dataUrl); // ✅ Debug
            onSave(dataUrl);
        } else {
            alert("Signature is empty!");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Signature</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg mb-4">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    onEnd={() => {
                        if (sigCanvas.current) {
                            setIsEmpty(sigCanvas.current.isEmpty());
                        }
                    }}
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'bg-white w-full h-48',
                    }}
                />
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleClear}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                >
                    Clear
                </button>
                <button
                    onClick={handleSave}
                    disabled={isEmpty}
                    className={`flex-1 px-4 py-2 text-white rounded-lg ${
                        isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    Save Signature
                </button>
            </div>
        </div>
    );
};

export default SignaturePad;