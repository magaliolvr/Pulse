
## Correção do Layout do Ecrã de Login

### Problema
O painel direito do ecrã de autenticação (linha 231 de `Auth.tsx`) não tem nenhuma propriedade que o faça expandir para preencher o espaço restante. O painel esquerdo usa `w-1/2`, mas o direito apenas tem `flex items-center justify-center p-8`, sem `flex-1` ou `w-1/2`.

### Solução
Adicionar `flex-1` ao container do painel direito para que ocupe todo o espaço restante, mantendo o conteúdo centrado.

### Detalhes Técnicos

**Ficheiro:** `src/pages/Auth.tsx`, linha 231

Alterar de:
```
className="max-[600px]:p-6 max-[600px]:flex-wrap flex items-center justify-center p-8"
```

Para:
```
className="flex-1 flex items-center justify-center p-8 max-[600px]:p-6"
```

Isto faz com que:
- O painel direito ocupe todo o espaço restante (50% quando o painel esquerdo está visível, 100% em mobile)
- O formulário continue centrado vertical e horizontalmente dentro desse espaço
- O layout mobile continue a funcionar corretamente
