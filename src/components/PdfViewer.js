"use client";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ file }) => {
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={{ height: '100%' }}>
                <Viewer 
                    fileUrl={file}
                />
            </div>
        </Worker>
    );
};

export default PdfViewer;