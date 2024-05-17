import useChatLogStore from "./store";


const Table = ({ data }: any) => {
  const setShowPDFViewer = useChatLogStore((state: any) => state.setShowPDFViewer);
  const setPdfPath = useChatLogStore((state: any) => state.setPdfPath);
  const setPdfPage = useChatLogStore((state: any) => state.setPdfPage);
  const setPdfClicked = useChatLogStore((state: any) => state.setPdfClicked);
  const API_URL = import.meta.env.VITE_BASE_URL
  return (
    <div className="w-full max-w-3xl mx-auto  text-gray-300">
      {data && data.map((item: any, index: any) => (
        <div key={index} className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold">{item[Object.keys(item)[0]].condition}</h3>
              <p className="text-gray-400">{item[Object.keys(item)[0]].deviation_reason}</p>
            </div>
            <div>
              <p className="text-gray-400">{item[Object.keys(item)[0]].exact_clause_details}</p>
            </div>
            <div>
              <p className="text-gray-400">Is Deviation Correct: {item[Object.keys(item)[0]].is_deviation_correct}</p>
              <p className="text-gray-400">Is Validation Correct: {item[Object.keys(item)[0]].is_validation_correct}</p>
            </div>
            <div>
              <p className="text-gray-400">Preferred Position: {item[Object.keys(item)[0]].preferred_position}</p>
              <p className="text-gray-400">Question: {item[Object.keys(item)[0]].question}</p>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold">Reference Documents:</h4>
              <div>
                {Object.keys(item[Object.keys(item)[0]].reference_documents).map((doc, docIndex) => (
                  <div key={docIndex} className="text-gray-400">
                    {item[Object.keys(item)[0]].reference_documents[doc].map((page: any, pageIndex: any) => (
                      <span
                        key={pageIndex}
                        className="text-blue-500 hover:text-blue-400 mr-1 cursor-pointer"
                        onClick={() => {
                          setShowPDFViewer(true)
                          let pageNumber = Number(page)
                          const path = API_URL + doc + '#page=' + page
                          setPdfPath(path)
                          setPdfPage(pageNumber)
                          setPdfClicked(true)

                        }}
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold">Clause Summary:</h4>
              <p className="text-gray-400">{item[Object.keys(item)[0]].validation_reason}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;