// Helper genérico para chamadas autenticadas (sua função original, sem alterações)
async function fetchAuthenticated(
    url: string,
    token: string,
    options: RequestInit = {}
  ) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Lançando um erro que pode ser capturado pelo componente
      throw new Error(errorData.error || `Falha na requisição: ${response.statusText}`);
    }
  
    // Retorna a resposta em JSON se a requisição for bem-sucedida
    return response.json();
  }
  
  // --- CORREÇÃO PRINCIPAL ---
  // Criamos e exportamos o objeto 'api' que os seus componentes estão tentando importar.
  export const api = {
    // O método 'get' do nosso objeto 'api'
    get: async <T>(url: string, getToken: () => Promise<string | null>): Promise<T> => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(url, token);
    },
  
    // O método 'post' do nosso objeto 'api'
    post: async <T>(url: string, data: any, getToken: () => Promise<string | null>): Promise<T> => {
      const token = await getToken();
      if (!token) throw new Error("Não autenticado");
      return fetchAuthenticated(url, token, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    
    // Você pode adicionar outros métodos como 'put', 'delete' aqui se precisar
    // put: async (...) => { ... },
    // delete: async (...) => { ... },
  };
  
  // --- FUNÇÕES ANTIGAS (OPCIONAL) ---
  // Com a criação do objeto 'api' acima, as funções abaixo se tornam redundantes.
  // Os componentes agora podem chamar 'api.get' ou 'api.post' diretamente.
  // Recomendo remover as funções abaixo e ajustar os componentes para usar o novo objeto 'api'.
  // Manterei algumas aqui como exemplo de como ficariam.
  
  export const fetchDashboardStats = (getToken: () => Promise<string | null>) => {
    return api.get('/api/dashboard/stats', getToken);
  };
  
  export const getAiSettings = (getToken: () => Promise<string | null>) => {
    return api.get('/api/settings/ai', getToken);
  };
  
  export const updateAiSettings = (settings: any, getToken: () => Promise<string | null>) => {
    return api.post('/api/settings/ai', settings, getToken);
  };
  
  export const calculatePricing = (data: any, getToken: () => Promise<string | null>) => {
    return api.post('/api/pricing/calculate', data, getToken); // Ajuste o endpoint se necessário
  };
  
  export const getStockGroups = (getToken: () => Promise<string | null>) => {
    return api.get('/api/stock/groups', getToken);
  };
  
  export const createStockGroup = (data: { groupName: string; announcementIds: string[] }, getToken: () => Promise<string | null>) => {
    return api.post('/api/stock/groups', data, getToken);
  };
  
  export const checkConnectionStatus = (getToken: () => Promise<string | null>) => {
    return api.get('/api/connections', getToken);
  };
  
  export const connectMercadoLivreAccount = (data: { code: string, verifier: string }, getToken: () => Promise<string | null>) => {
    return api.post('/api/connections/mercadolivre', data, getToken);
  };
  
  // E assim por diante para todas as outras...