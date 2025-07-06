"use client";

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import SignaturePad from '../components/SignaturePad';
import Toolbar from '../components/Toolbar';
import PdfLibExporter from '../components/PdfLibExporter'; // Import PdfLibExporter
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile } from 'react-icons/fi';

// Dynamically import PdfViewer with SSR disabled and a loading fallback
const PdfViewer = dynamic(() => import('../components/PdfViewer'), { 
    ssr: false,
    loading: () => <p>Loading PDF viewer...</p>
});

export default function Home() {
    const [file, setFile] = useState(null);
    const [signature, setSignature] = useState(null);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [targetPage, setTargetPage] = useState('last'); // <-- Add this line
    const pdfRef = useRef(null); // Reference for the PDF container

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'application/pdf',
        onDrop: (acceptedFiles) => {
            setFile(URL.createObjectURL(acceptedFiles[0]));
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">PDF Signing Portal</h1>
                
                <Toolbar 
                    onSign={() => setShowSignaturePad(true)}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div
                            {...getRootProps()}
                            className="p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-blue-500 transition-colors cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center text-center">
                                <FiUploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-2">Drag & drop PDF, or click to browse</p>
                                <p className="text-sm text-gray-500">Max file size: 5MB</p>
                            </div>
                        </div>

                        {showSignaturePad && (
                            <SignaturePad 
                                onSave={(sig) => {
                                    setSignature(sig);
                                    setShowSignaturePad(false); // Hide after saving
                                }} 
                            />
                        )}

                        {signature && (
                            <>
                                <div className="text-green-600 text-sm mt-2">Signature saved!</div>
                                <img
                                    src={signature}
                                    alt="Saved Signature Preview"
                                    className="mt-4 border border-gray-300 rounded"
                                    width={200}
                                />
                            </>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="bg-white rounded-xl shadow-lg p-6 h-[600px] overflow-hidden">
                        {file ? (
                            <div ref={pdfRef} className="h-full">
                                <PdfViewer 
                                    file={file} 
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                <FiFile className="w-16 h-16 mb-4" />
                                <p>PDF Preview Will Appear Here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Page selection dropdown */}
                {file && (
                    <div className="mt-4">
                        <label className="text-sm text-gray-600 mr-2">Place signature on:</label>
                        <select
                            value={targetPage}
                            onChange={(e) => setTargetPage(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="last">Last Page</option>
                            <option value="0">Page 1</option>
                            <option value="1">Page 2</option>
                            <option value="2">Page 3</option>
                            {/* You can dynamically generate these if you extract page count */}
                        </select>
                    </div>
                )}

                {/* Export Button */}
                {file && (
                    <div className="mt-6">
                        <PdfLibExporter 
                            fileUrl={file} 
                            signature={signature}
                            targetPage={targetPage} // <-- Pass to exporter
                        />
                    </div>
                )}
            </div>
        </div>
    );
}