const JourneyButtonsForExtractData = ({ contractType, journeysObj, handleClick }: any) => {

  const renderButtons = (obj: any) => {
    return Object.entries(obj).map(([key, value]: any) => (
      <div key={key}>
        <p className="text-white">Please tell me what you would like to extract from this document. This seems like a {contractType}. Here are a few question people usually ask from these, however you can ask me anything from this document.
        </p>
        <div className="mt-5 flex gap-5">
          {value?.btns?.map((btn: any) => {

            return (
              <div>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" key={btn.name} onClick={() => handleClick(btn.value)}>
                  {btn.name}
                </button>
              </div>
            )
          }

          )}
        </div>
      </div>
    ));
  };

  return <div>

    {renderButtons(journeysObj)}</div>;
};

export default JourneyButtonsForExtractData 