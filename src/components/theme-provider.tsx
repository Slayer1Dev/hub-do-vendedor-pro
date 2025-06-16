import { createContext, useContext, useEffect, useState } from "react"

// Define o tipo para o estado do provedor de tema
type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

// Estado inicial que será usado se o provedor não for encontrado
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

// Cria o contexto do provedor de tema
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Define as propriedades que o componente ThemeProvider pode receber
type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme", // Chave usada para salvar o tema no localStorage
  ...props
}: ThemeProviderProps) {
  // Estado para armazenar o tema atual, buscando do localStorage ou usando o padrão
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  // Efeito que executa sempre que o tema muda
  useEffect(() => {
    const root = window.document.documentElement

    // Remove as classes de tema anteriores
    root.classList.remove("light", "dark")

    // Se o tema for 'system', detecta a preferência do sistema operacional
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    // Adiciona a classe do tema selecionado ('light' or 'dark') ao elemento root (<html>)
    root.classList.add(theme)
  }, [theme])

  // O valor que será compartilhado com os componentes filhos através do contexto
  const value = {
    theme,
    setTheme: (theme: string) => {
      localStorage.setItem(storageKey, theme) // Salva o novo tema no localStorage
      setTheme(theme) // Atualiza o estado
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Hook customizado para facilitar o uso do contexto do tema
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
