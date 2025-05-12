// components/PdfWorker.js
"use client";

import { Worker } from '@react-pdf-viewer/core';

export default function PdfWorker({ children }) {
    return (
        <Worker workerUrl="/pdfjs/pdf.worker.min.js">
            {children}
        </Worker>
    );
}