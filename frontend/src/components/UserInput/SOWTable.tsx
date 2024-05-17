import { useEffect, useState } from "react";
import useChatLogStore from "./store";

const SOWTable = ({ data }: { data: any[] }) => {
    const results = data;
    const [tableData, setTableData] = useState<any>([])
    const showPDFViewer = useChatLogStore((state: any) => state.showPDFViewer);
    const setShowPDFViewer = useChatLogStore((state: any) => state.setShowPDFViewer);
    const setPdfPath = useChatLogStore((state: any) => state.setPdfPath);
    const setPdfPage = useChatLogStore((state: any) => state.setPdfPage);
    const setPdfClicked = useChatLogStore((state: any) => state.setPdfClicked);

    useEffect(() => {
        massageData()
    }, [data])

    const massageData = () => {
        const records = [];
        let referenceDocs: any = []
        for (const result of results) {
            const obj = result[Object.keys(result)[0]];

            referenceDocs = []

            for (const page in obj.reference_documents) {
                if (obj.reference_documents.hasOwnProperty(page)) {

                    const filePath = page.replace(/\\/g, '/')
                    const page_list = obj.reference_documents[page]


                    for (let i = 0; i < page_list.length; i++) {
                        referenceDocs.push({ pageNo: page_list[i], filePath: filePath })
                    }
                }
            }

            records.push({ field_name: obj.field_name, answer: obj.answer, referenceDocs })
            setTableData(records)
            // return records;
        }
    }
    const API_URL = import.meta.env.VITE_BASE_URL



    return (
        <div className="space-y-6">
            {tableData.map((item: any, index: any) => (
                <div
                    key={index}
                    className="bg-gray-700 shadow-lg rounded-lg p-4 hover:bg-gray-800 transition-colors duration-300"
                >
                    <h3 className="text-lg font-bold mb-2 text-white">{item.field_name}</h3>
                    <p className="text-gray-300 mb-4">{item.answer}</p>
                    {item.referenceDocs.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h4 className="text-gray-400 font-semibold mb-2">Reference Documents:</h4>
                            {item.referenceDocs.map((doc: any, docIndex: any) => (
                                <span
                                    key={docIndex}
                                    // href={doc.filePath}
                                    onClick={() => {

                                        setShowPDFViewer(true)
                                        let page = Number(doc.pageNo)
                                        const path = API_URL + encodeURIComponent(doc.filePath) + '#page=' + doc.pageNo
                                        setPdfPath(path)
                                        setPdfPage(page)
                                        setPdfClicked(true)

                                    }}
                                    // target="_blank"
                                    // rel="noopener noreferrer"
                                    className="block text-indigo-400 hover:text-indigo-300 mb-1 cursor-pointer"
                                >
                                    Page {doc.pageNo}
                                </span>
                            ))}
                        </div>
                    )}
                    {item.referenceDocs.length === 0 && (
                        <ul className="list-disc pl-4 text-gray-300">
                            {item.referenceDocs.map((doc: any, docIndex: any) => (
                                <li key={docIndex}>Page {doc.pageNo}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))
            }
        </div >
    );
};

export default SOWTable;