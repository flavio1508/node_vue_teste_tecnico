# 📄 PDF Upload & Streaming App (Node.js + Vue.js)

Aplicação fullstack para upload, armazenamento e visualização eficiente de arquivos PDF, com suporte a **streaming parcial (HTTP Range Requests)**.
---
## 🚀 Tecnologias utilizadas

### Backend
- Node.js
- Express
- Multer
- File System (fs)
### Frontend
- Vue.js (Vite)
---
## 📁 Estrutura do Projeto
/backend → API Node.js (upload + streaming de PDF)
/frontend → Aplicação Vue.js (upload + visualização)

---

## ⚙️ Como executar o projeto

### 🔧 Backend
cd backend
npm install
node server.js

Servidor disponível em:
http://localhost:3000
### 🔧 Frontend
cd frontend
npm install
npm run dev

📌 Funcionalidades
Upload de arquivos PDF
Armazenamento local no servidor
Endpoint para visualização
Streaming parcial de arquivos (Range Requests)
Visualização direta no navegador

🧠 Explicação técnica (Streaming)

O diferencial da aplicação está no suporte a streaming de PDF, permitindo carregamento progressivo.

🔄 Como funciona:

Quando o navegador solicita um PDF, ele pode enviar o header:

Range: bytes=start-end

O backend então:

Lê o header Range
Calcula o intervalo solicitado

Cria uma stream com:

fs.createReadStream(filePath, { start, end })

Retorna status:

206 Partial Content
Define os headers:
Content-Range
Accept-Ranges
Content-Length
Content-Type
🖥️ Frontend

A visualização é feita com um:

<iframe>

O próprio navegador:

Detecta suporte a streaming
Faz requisições parciais automaticamente
Renderiza o PDF sem precisar baixar tudo
⚡ Benefícios do Streaming
Carregamento mais rápido
Melhor experiência do usuário
Ideal para arquivos grandes
Redução de uso de banda
✅ Considerações finais

A solução foi desenvolvida com foco em:

Simplicidade
Clareza de implementação
Eficiência

O principal destaque é a implementação de streaming parcial no backend, permitindo a visualização de PDFs grandes de forma otimizada, sem necessidade de download completo.

<img width="785" height="771" alt="image" src="https://github.com/user-attachments/assets/32a935f0-7120-4a8e-96d1-89cec0174d35" />
