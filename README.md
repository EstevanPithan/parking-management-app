# 🚗 Parking Management App

**Links rápidos**
- **Aplicação publicada:** https://estapar.netlify.app
- **Repositório:** https://github.com/EstevanPithan/parking-management-app  
- **Login de avaliação:** usuário `estapar` • senha `@estapar@`

Uma aplicação web moderna para gerenciamento de estacionamentos — com UX instantânea graças a *optimistic updates* com rollback automático. Uso `onMutate` para atualizar o cache local antes da requisição e `onError` para reverter ao estado anterior em caso de falha. Novos planos recebem ID temporário (`Date.now()`) até a confirmação do servidor, enquanto `cancelQueries` evita race conditions e mantém o cache consistente. Além disso, há **prefetch em hover** nos botões de ação, pré-aquecendo o cache com TanStack Query para que telas e detalhes abram quase instantaneamente.

## 🚀 Stack Utilizada

### React 19
- Liberdade de arquitetura: você compõe as peças (roteamento, dados, SSR se necessário) — sem camadas prescritivas.
- Performance de bundle: tree-shaking, code-splitting e lazy garantem carregamento rápido e HMR veloz.
- Agnóstico de infraestrutura: fácil de hospedar em qualquer provedor/CDN.
- Simplicidade poderosa: Context API e hooks (incl. customizados) para lógica reutilizável e testável.

### TanStack Query
- **Cache inteligente:** chaves declarativas, stale-while-revalidate e GC — dados frescos sem re-renders desnecessários.
- **UX instantânea:** optimistic updates com `onMutate`/`onError` (rollback) e IDs temporários até confirmar no servidor.
- **Concorrência sob controle:** dedupe de requisições, `cancelQueries` e retries com backoff — evitando race conditions.
- **Navegação fluida:** prefetch em hover/focus e hidratação inicial — sensação de app nativo.
- **Ergonomia e escala:** `useQuery`, `useMutation`, `useInfiniteQuery`, Devtools e invalidação declarativa.

### Shadcn/UI + Tailwind CSS v4
- Componentes acessíveis (Dialog, Select, Switch, Tabs) sem lock-in
- Tokens e escalas tipográficas/spacing consistentes
- Utilitárias previsíveis para refatoração rápida

### React Router
- Roteamento declarativo/aninhado com proteção de rotas (SPA)
- `ProtectedRoute` e gerenciamento do estado de navegação

### Vite + SWC
- Dev server muito rápido com HMR
- Build otimizado (SWC) + TS/Tailwind integrados

### Bun
- Runtime/bundler focado em performance
- Instalação de pacotes muito rápida e DX simples

### Sistema de Ícones com Type Safety
- Tipos TS gerados automaticamente com o script `src/scripts/genarate-icons-type.ts` a partir de `src/icons/`
- `IconName` sempre sincronizado; `<Icon name="..."/>` com fallback
- Autocomplete e erros prevenidos em tempo de desenvolvimento

## 🛠️ Como Executar
```bash
# Instalar dependências
bun install

# Dev
bun dev

# Build
bun run build
