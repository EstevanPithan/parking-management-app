# 🚗 Parking Management App

Uma aplicação web moderna para gerenciamento de estacionamentos — com UX instantânea graças a optimistic updates com rollback automático. Uso onMutate para atualizar o cache local antes da requisição e onError para reverter ao estado anterior em caso de falha. Novos planos recebem ID temporário (Date.now()) até a confirmação do servidor, enquanto cancelQueries evita race conditions e mantém o cache consistente. Além disso, implementação de prefetch ao passar o mouse (hover) em botões de ação, pré-aquecendo o cache com o TanStack Query para que telas e detalhes abram quase instantaneamente.

## 🚀 Stack Utilizada

### React 19
- Liberdade de arquitetura: você compõe as peças (roteamento, camada de dados, SSR se necessário) — sem camadas prescritivas.
- Controle de bundle e performance: tree-shaking, code-splitting e lazy garantem carregamento rápido e HMR veloz — sem overengineering.
- Agnóstico de infraestrutura: fácil de hospedar em qualquer provedor/CDN, evitando lock-in, dificuldades e custos inesperados.
- Simplicidade poderosa: Context API para autenticação/estado global e hooks (incl. customizados) para lógica reutilizável e testável.

### TanStack Query
- Cache inteligente: chaves declarativas, stale-while-revalidate e garbage collection — dados sempre frescos sem re-render desnecessário.
- UX instantânea: optimistic updates com onMutate/onError para rollback automático e IDs temporários até a confirmação do servidor.
- Concorrência sob controle: dedupe de requisições, cancelQueries e retries com backoff — evitando race conditions e estados incorretos.
- Navegação fluida: prefetch em hover/focus e hidratação inicial — telas carregam com dados prontos e sensação de app nativo.
- Ergonomia e escala: hooks (useQuery, useMutation, useInfiniteQuery), Devtools e invalidação declarativa — DX rápida e código previsível.

### Shadcn/UI + Tailwind CSS v4
- Componentes acessíveis (Dialog, Select, Switch, Tabs) sem lock-in
- Sistema de design consistente com tokens padronizados
- Escalas tipográficas e spacing padronizadas
- Classes utilitárias previsíveis para refatoração rápida

### React Router
- Roteamento declarativo e aninhado com proteção de rotas
- Navegação SPA otimizada com ProtectedRoute
- Estrutura orientada a componentes
- Gerenciamento de estado de navegação

### Vite + SWC
- Dev server ultra-rápido com HMR instantâneo
- Build otimizado com compilador Rust (SWC)
- Configuração mínima com aliases de path
- Integração perfeita com TypeScript e Tailwind

### Bun
- Runtime/bundler com foco em performance superior
- Instalação de pacotes 3x mais veloz que npm/yarn
- Scripts de desenvolvimento simplificados
- Integração otimizada com Vite para melhor DX

### Sistema de Ícones com Type Safety
- Geração automática de tipos TypeScript através de script que escaneia `src/icons/`
- Union type `IconName` sempre sincronizada com ícones personalizados colocados dentro da pasta `src/icons/`
- Autocomplete inteligente e prevenção de erros em tempo de compilação
- Componente `<Icon name="..." />` com fallback visual para ícones inexistentes
- Manutenção zero: tipos atualizados automaticamente ao adicionar/remover ícones

🎨 Design System
- Tipografia Inter
- Fonte moderna otimizada para interfaces digitais
- Letterforms com legibilidade superior em telas de alta resolução
- Performance otimizada com fallbacks para system fonts
- Versatilidade tipográfica em diferentes pesos e tamanhos
- Paleta Lime - Identidade Estapar
- Cores primárias extraídas diretamente da marca Estapar

LINKS E REPOSITÓRIO

Repositório: https://github.com/EstevanPithan/parking-management-app

Site implementado: https://estapar.netlify.app

Usuário: estapar
Senha: @estapar@

## 🛠️ Como Executar
```bash
# Instalar dependências
bun install

# Executar em modo desenvolvimento
bun dev

# Build para produção
bun run build
```

