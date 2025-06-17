// Dados mocados que podem vir de um banco de dados no futuro
const outrasPlataformas = {
    amazon: { nome: 'Amazon', logo: 'https://placehold.co/40x40/FF9900/000000?text=A', comissao: 0.15, taxa_fixa: 2.50 },
    shopee: { nome: 'Shopee', logo: 'https://placehold.co/40x40/EE4D2D/FFFFFF?text=S', comissao: 0.14, taxa_fixa: 3.00 },
    magazine_luiza: { nome: 'Magazine Luiza', logo: 'https://placehold.co/40x40/0086FF/FFFFFF?text=M', comissao: 0.18, taxa_fixa: 5.00 }
};

interface FormData {
    custo: number;
    frete: number;
    outrosCustos: number;
    lucroDesejado: number;
    tipoAnuncioML: 'classico' | 'premium';
    categoria: {
        nome: string;
        taxas: {
            classico: number;
            premium: number;
        }
    };
}

export const calculatePricingLogic = (data: FormData) => {
    const { custo, frete, outrosCustos, lucroDesejado, tipoAnuncioML, categoria } = data;
    const custoTotal = custo + frete + outrosCustos;
    const margemLucro = lucroDesejado / 100;
    const novosResultados = [];

    // Cálculo para o Mercado Livre
    if (categoria) {
        const taxaAnuncio = categoria.taxas[tipoAnuncioML];
        const taxaFixaML = 6.00; // Taxa para produtos abaixo de R$79

        // Fórmula de precificação que considera que as taxas incidem sobre o preço final
        let precoSugerido = (custoTotal + (custoTotal * margemLucro)) / (1 - taxaAnuncio);

        // Ajuste da taxa fixa para produtos < R$79
        if (precoSugerido < 79) {
            precoSugerido = (custoTotal + (custoTotal * margemLucro) + taxaFixaML) / (1 - taxaAnuncio);
        }
        
        // Simulação do frete grátis (50% do custo para o vendedor)
        const freteConsiderado = precoSugerido >= 79 ? frete * 0.5 : 0;
        const precoFinalML = precoSugerido + freteConsiderado;

        const comissaoValorML = (precoFinalML * taxaAnuncio) + (precoFinalML < 79 ? taxaFixaML : 0);
        const lucroFinalML = precoFinalML - custoTotal - comissaoValorML - freteConsiderado;
        const margemFinalML = (lucroFinalML / precoFinalML) * 100;

        novosResultados.push({ 
            nome: 'Mercado Livre', 
            logo: 'https://placehold.co/40x40/FFE600/000000?text=ML', 
            precoFinal: precoFinalML.toFixed(2), 
            comissaoValor: comissaoValorML.toFixed(2), 
            lucroFinal: lucroFinalML.toFixed(2), 
            margemFinal: margemFinalML.toFixed(1) 
        });
    }
    
    // Cálculo para outras plataformas
    Object.values(outrasPlataformas).forEach(plat => {
        const precoFinal = (custoTotal + plat.taxa_fixa) / (1 - margemLucro - plat.comissao);
        const comissaoValor = (precoFinal * plat.comissao) + plat.taxa_fixa;
        const lucroFinal = precoFinal - custoTotal - comissaoValor;
        const margemFinal = (lucroFinal / precoFinal) * 100;
        novosResultados.push({ ...plat, precoFinal: precoFinal.toFixed(2), comissaoValor: comissaoValor.toFixed(2), lucroFinal: lucroFinal.toFixed(2), margemFinal: margemFinal.toFixed(1) });
    });

    return novosResultados;
}