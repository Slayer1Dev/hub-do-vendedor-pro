// 1. A URL do backend foi removida. As chamadas agora usarão caminhos relativos.
// const API_URL = 'http://localhost:3333';

// Helper genérico para chamadas autenticadas
async function fetchAuthenticated(
    url: string, // Agora receberá um caminho como '/api/dashboard/stats'
    token: string,
    options: RequestInit = {}
  ) {
    const response = await fetch(url, { // 2. A chamada é feita para um caminho relativo
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Falha na requisição: ${response.statusText}`);
    }
  
    return response.json();
  }
  
  
  // --- Funções da API ---
  
  export const fetchDashboardStats = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    if (!token) throw new Error("Não autenticado");
    return fetchAuthenticated(`/api/dashboard/stats`, token);
  };
  
  export const getAiSettings = async (getToken: () => Promise<string | null>) => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(`/api/settings/ai`, token);
  };
  
  export const updateAiSettings = async (
      settings: any,
      getToken: () => Promise<string | null>
  ) => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(`/api/settings/ai`, token, {
          method: 'POST',
          body: JSON.stringify(settings),
      });
  };
  
  export const calculatePricing = async (
      formData: any,
      getToken: () => Promise<string | null>
  ) => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(`/api/pricing/calculate`, token, {
          method: 'POST',
          body: JSON.stringify(formData),
      });
  };
  
  export const getStockGroups = async (getToken: () => Promise<string | null>) => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(`/api/stock/groups`, token);
  };
  
  export const createStockGroup = async (
      groupData: { groupName: string, announcementIds: string[] },
      getToken: () => Promise<string | null>
  ) => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(`/api/stock/groups`, token, {
          method: 'POST',
          body: JSON.stringify(groupData),
      });
  };

// ... (outras funções da api) ...

export const checkConnectionStatus = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    if (!token) throw new Error("Não autenticado");
    return fetchAuthenticated(`/api/connections`, token);
};

export const connectMercadoLivreAccount = async (
    // Agora recebe um objeto com o código e o verifier
    data: { code: string, verifier: string },
    getToken: () => Promise<string | null>
) => {
    const token = await getToken();
    if (!token) throw new Error("Não autenticado");
    return fetchAuthenticated(`/api/connections/mercadolivre`, token, {
        method: 'POST',
        // Envia ambos no corpo da requisição
        body: JSON.stringify(data),
    });
};