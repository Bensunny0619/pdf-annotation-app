"use client";

import { PDFDocument } from 'pdf-lib';

export default function PdfLibExporter({ fileUrl, signature, targetPage }) {
    const exportPdf = async () => {
        try {
            // Load the existing PDF
            const existingPdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Add signature if exists
            if (signature) {
                const totalPages = pdfDoc.getPageCount();
                const pageIndex =
                    targetPage === 'last' ? totalPages - 1 : parseInt(targetPage, 10);

                const page = pdfDoc.getPage(pageIndex);
                const pngImage = await pdfDoc.embedPng(signature);
                page.drawImage(pngImage, {
                    x: 50,
                    y: 50,
                    width: 120,
                    height: 60,
                });
            }

            // Trigger download
            const pdfBytes = await pdfDoc.save();
            downloadPdf(pdfBytes);
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    // Helper: Trigger PDF download
    const downloadPdf = (pdfBytes) => {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'annotated-document.pdf';
        link.click();
    };

    return (
        <button
            onClick={exportPdf}
            disabled={!signature}
            className={`mt-4 px-4 py-2 rounded-md ${
                signature
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
        >
            Export PDF
        </button>
    );
}