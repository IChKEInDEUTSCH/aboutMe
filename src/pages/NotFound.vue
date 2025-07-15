<template>
  <div class="not-found-container">
    <h1 class="error-title">404</h1>
    <h2 class="error-subtitle">頁面未找到</h2>
    <p class="error-message">抱歉，您訪問的頁面不存在。</p>
    <div class="error-actions">
      <button @click="goHome" class="home-button">
        <v-icon name="gi-house" scale="1.2" />
        回到首頁
      </button>
      <button @click="goBack" class="back-button">
        返回上一頁
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  color: var(--text-primary);
}

.error-title {
  font-size: 6rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px var(--shadow-color);
}

.error-subtitle {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.error-message {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.home-button,
.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.home-button {
  background-color: var(--accent-color);
  color: white;
}

.home-button:hover {
  background-color: var(--accent-color-hover, var(--accent-color));
  transform: translateY(-2px);
}

.back-button {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.back-button:hover {
  background-color: var(--bg-primary);
  transform: translateY(-2px);
}

/* Responsive design */
@media (max-width: 768px) {
  .error-title {
    font-size: 4rem;
  }
  
  .error-subtitle {
    font-size: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .home-button,
  .back-button {
    width: 200px;
    justify-content: center;
  }
}
</style>
