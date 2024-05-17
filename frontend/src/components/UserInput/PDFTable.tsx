import { useState } from "react";
const PDFTable = ({ referenceDocuments }: any) => {
    const [showPDF, setShowPDF] = useState(false);
    const [selectedPDF, setSelectedPDF] = useState('');

    const handlePDFClick = (pdfName: any) => {
        setSelectedPDF(pdfName);
        setShowPDF(true);
    };

    const handleCloseClick = () => {
        setShowPDF(false);
    };
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            PDF Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Page Number
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200">
                    {Object.entries(referenceDocuments).map(([pageNumber, pdfName]: any) => {
                        console.log(pageNumber, pdfName)
                        return (
                            <tr key={pageNumber}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href="#"
                                        onClick={() => handlePDFClick(pdfName)}
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        {pdfName}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-black whitespace-nowrap">{pageNumber}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
            {showPDF && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className=" flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <iframe src={selectedPDF} className="w-full h-96" title="PDF Viewer"></iframe>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleCloseClick}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PDFTable;