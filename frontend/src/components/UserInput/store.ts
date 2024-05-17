import { create } from 'zustand';

interface ChatLog {
  type: 'assistant' | 'user';
  message: any;
}

interface ChatLogState {
  chatLogs: ChatLog[];
  query: string;
  isChatVisible: boolean;
  journeyName:string;
  tabs:string;
  loading:boolean;
  loaderForSOW: boolean;
  loaderForMSA:boolean;
  loaderForGenerateAnswer:boolean;
  showPDFViewer:boolean;
  pdfPath: string;
  pdfPage:number;
  pdfClicked:boolean
  rightActive: boolean;

  addChatLog: (chatLog: ChatLog) => void;
  setIsChatVisible: (visible: boolean) => void;
  setQuery: (query: string) => void;
  setJourneyName: (query: string) => void;
  setTabs: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setLoaderForSOW: (loaderForSOW: boolean) => void;
  setLoaderForMSA: (loaderForMSA: boolean) => void;
  setLoaderForGenerateAnswer: (loaderForGenerateAnswer: boolean) => void;
  setShowPDFViewer: (showPDFViewer: boolean) => void;
  setPdfPath: (pdfPath: string) => void;
  setPdfPage: (pdfPage: number) => void;
  setPdfClicked: (pdfClicked: boolean) => void;
  setRightActive: (rightActive: boolean) => void;
 
 
 
}

const useChatLogStore = create<ChatLogState>((set) => ({
  chatLogs: [],
  isChatVisible: false,
  query: '',
  journeyName:'extract-data',
  showModal: false,
  tabs:'sow',
  loading:false,
  loaderForSOW: true,
  loaderForMSA:true,
  loaderForGenerateAnswer:true,
  showPDFViewer:false,
  pdfPath: '',
  pdfPage:1,
  pdfClicked:false,
  rightActive: true,

  
  addChatLog: (chatLog) =>
    set((state) => ({
      
      chatLogs: [...state.chatLogs, chatLog],
    })),
  
  removeChatLog: (index:any) =>
    set((state) => ({
      
      chatLogs: state.chatLogs.filter((_, i) => i !== index),
     
    })),

  setIsChatVisible: (visible) =>
    set(() => ({
      isChatVisible: visible,
    })),
  setQuery: (query) =>
    set(() => ({
      query,
    })),
    setJourneyName: (journeyName) =>
      set(() => ({
        journeyName,
      })),

    setTabs: (tabs) =>
      set(() => ({
        tabs,
      })),
  
    setLoading: (loading) =>
      set(() => ({
        loading,
      })),

    setLoaderForSOW: (loaderForSOW) =>
      set(() => ({
        loaderForSOW,
      })),

    setLoaderForMSA: (loaderForMSA) =>
      set(() => ({
        loaderForMSA,
      })),

    setLoaderForGenerateAnswer: (loaderForGenerateAnswer) =>
      set(() => ({
        loaderForGenerateAnswer,
      })),

    setShowPDFViewer: (showPDFViewer) =>
      set(() => ({
        showPDFViewer,
      })),

    setPdfPath: (pdfPath) =>
      set(() => ({
        pdfPath,
      })),

    setPdfPage: (pdfPage) =>
      set(() => ({
        pdfPage,
      })),

    setPdfClicked: (pdfClicked) =>
      set(() => ({
        pdfClicked,
      })),

    setRightActive: (rightActive) =>
      set(() => ({
        rightActive,
      })),

  
  
}));

export default useChatLogStore;