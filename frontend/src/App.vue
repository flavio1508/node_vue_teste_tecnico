<script setup>
import { ref } from 'vue';

const file = ref(null);
const status = ref('');
const pdfUrl = ref('');

const handleFile = (event) => {
  file.value = event.target.files[0];
  status.value = '';
};

const uploadFile = async () => {
  if (!file.value) {
    status.value = 'Selecione um arquivo PDF';
    return;
  }

  status.value = 'Enviando...';

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro no upload');
    }

    pdfUrl.value = data.fileUrl;
    status.value = 'Upload realizado com sucesso!';
  } catch (error) {
    status.value = 'Erro ao enviar arquivo';
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h1>📄 Upload</h1>

      <label class="file-input">
        {{ file ? file.name : "Selecionar arquivo PDF" }}
        <input 
          type="file" 
          accept="application/pdf" 
          @change="handleFile"
        />
      </label>

      <button 
        @click="uploadFile" 
        :disabled="status === 'Enviando...'"
        class="btn"
      >
        {{ status === 'Enviando...' ? 'Enviando...' : 'Enviar PDF' }}
      </button>

      <p 
        class="status"
        :class="{
          success: status.includes('sucesso'),
          error: status.includes('Erro')
        }"
      >
        {{ status }}
      </p>
    </div>

    <div v-if="pdfUrl" class="viewer">
      <h2>📖 Visualização</h2>

      <iframe 
        :src="pdfUrl" 
        class="iframe"
      />
    </div>
  </div>
</template>

<style>
.container {
  min-height: 100vh;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  font-family: Arial, sans-serif;
}

.card {
  background: #1e293b;
  padding: 10px;
  border-radius: 16px;
  width: 350px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h1 {
  color: #fff;
  margin-bottom: 20px;
}

h2 {
  color: #fff;
  margin-bottom: 10px;
}

.file-input {
  display: block;
  background: #334155;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 15px;
}

.file-input input {
  display: none;
}

.btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.03);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  margin-top: 15px;
  font-weight: bold;
}

.status.success {
  color: #22c55e;
}

.status.error {
  color: #ef4444;
}

.viewer {
  margin-top: 30px;
  width: 100%;
  max-width: 900px;
}

.iframe {
  width: 100%;
  height: 600px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}
</style>