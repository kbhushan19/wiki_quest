
import useChatLogStore from './store';

const PDFViewer = () => {
    const pdfUrl = useChatLogStore((state: any) => state.pdfPath);
    console.log(pdfUrl)

    return (

        <iframe

            key={pdfUrl}
            src={pdfUrl}
            className='w-full h-full'
            width="100%"
            height="100%"
            style={{ border: 'none' }}
        ></iframe>
    );
};

export default PDFViewer;