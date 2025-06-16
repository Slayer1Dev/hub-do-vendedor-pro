import "@/index.css";

export default function Landing() {
  return (
    <main className="min-h-screen w-full text-white bg-[#0d0d0d]">
      <section className="flex flex-col justify-center items-center text-center px-6 py-20 lg:py-32">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
          Hub do Vendedor Pro
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mb-10">
          Automatize respostas, centralize seu estoque e melhore seu SEO no Mercado Livre com IA de última geração.
        </p>
        <a
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-semibold px-8 py-3 rounded-full"
        >
          Começar agora
        </a>
      </section>

      <section className="bg-[#121212] py-20 px-6 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-8">Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Respostas automáticas</h3>
            <p className="text-gray-400">
              Deixe a IA responder por você com segurança e inteligência.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Estoque sincronizado</h3>
            <p className="text-gray-400">
              Gerencie múltiplos anúncios com um estoque centralizado.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">SEO para anúncios</h3>
            <p className="text-gray-400">
              Otimize títulos, descrições e imagens para destacar seu anúncio.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d0d0d] py-6 text-center text-sm text-gray-500">
        © 2025 Hub do Vendedor Pro — Todos os direitos reservados
      </footer>
    </main>
  );
}
