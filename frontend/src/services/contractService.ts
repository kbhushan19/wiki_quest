import axios from 'axios';
const API_URL = import.meta.env.VITE_BASE_URL


export const ContractCopilotServices:any = {
    generateAnswer: async (data: FormData) => {
        try {
          const url = `${API_URL}generate-answer`;
          const body = data;
          const response = await axios.post(url, body);
          return response.data;
        } catch (error: unknown) {
          return error;
        }
      },

      generateFilesResponse: async (data: FormData) => {
        try {
          const url = `${API_URL}upload`;
          const body = data;
          const response = await axios.post(url, body);
          return response.data;
        } catch (error: unknown) {
          return error;
        }
      },
      deleteEntryResponse: async (data: any) => {
        try {
          const url = `${API_URL}delete-entry`;
          const response = await axios.delete(url, { data });
          return response.data;
        } catch (error: unknown) {
          return error;
        }
    },
  
    generateFetchExtractResponse: async(data:FormData) => {
        try {
            const url = `${API_URL}fetch-extract`;
            const body = data;
            const response = await axios.post(url, body);
            return response.data;
        }catch (error: unknown) {
            return error;
        }
        
    },
    getFetchExtractResponse :async (data: any) => {
      try {
        const url = `${API_URL}fetch-extract-response`;
        const response = await axios.get(url, { params: data });
        return response.data;
      } catch (error: unknown) {
        return error;
      }
  },
    generateFetchClauseResponse: async(data:FormData) => {
        try {
            const url = `${API_URL}fetch-clause`;
            const body = data;
            const response = await axios.post(url, body);
            return response.data;
        }catch (error: unknown) {
            return error;
        }
        
    },
    getFetchClauseResponse :async (data: any) => {
      try {
        const url = `${API_URL}fetch-clause-response`;
        const response = await axios.get(url, { params: data });
        return response.data;
      } catch (error: unknown) {
        return error;
      }
  },
 
    generateFetchValidateContractResponse: async(data:FormData) => {
        try {
            const url = `${API_URL}fetch-validate`;
            const body = data;
            const response = await axios.post(url, body);
            return response.data;
        }catch (error: unknown) {
            return error;
        }
        
    },
    getFetchValidateContractResponse :async (data: any) => {
        try {
          const url = `${API_URL}fetch-validate-response`;
          const response = await axios.get(url, { params: data });
          return response.data;
        } catch (error: unknown) {
          return error;
        }
    },
    
  



}




  


