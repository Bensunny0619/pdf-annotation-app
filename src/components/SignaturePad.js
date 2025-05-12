import { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onSave }) => {
    const sigCanvas = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const handleClear = () => {
        sigCanvas.current.clear();
        setIsEmpty(true);
    };

    const handleSave = () => {
        if (!sigCanvas.current.isEmpty()) {
            const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            onSave(signatureData);
            alert('Signature saved successfully!');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Signature</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg mb-4">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'w-full h-48 bg-white',
                    }}
                    onBegin={() => setIsEmpty(false)}
                    onEnd={() => setIsEmpty(sigCanvas.current.isEmpty())}
                />
            </div>
            
            <div className="flex gap-4">
                <button
                    onClick={handleClear}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={handleSave}
                    disabled={isEmpty}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                        !isEmpty ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Save Signature
                </button>
            </div>
        </div>
    );
};

export default SignaturePad;