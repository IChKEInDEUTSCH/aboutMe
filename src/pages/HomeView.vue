<template>
  <div class="home-content">
    <h1 class="main-title">顏珖宇</h1>
    <p>在名為人生的遊戲中努力增加自己籌碼的人</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-content {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.home-content p {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  pointer-events: auto;
  text-align: center;
  margin-top: 0.1rem;
  text-shadow: 1px 1px 2px var(--shadow-color);
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.main-title {
  color: var(--text-primary);
  font-size: 4rem;
  font-family: Arial, sans-serif;
  pointer-events: auto;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 4px var(--shadow-color);
  transition: color 0.2s ease, text-shadow 0.2s ease;
  margin-bottom: 0.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .home-content p {
    font-size: 1rem;
  }
}
</style>
