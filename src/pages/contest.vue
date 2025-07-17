<template>
  <div class="page-container">
    <h2>比賽 (Contest)</h2>
    <div class="contests">
      <div class="contest-item">
        <div class="contest-name">
          2025 年全國技專校院學生實務專題製作競賽暨成果展
          <div class="detailed">
            參賽專題名稱 : 以影像分割及AR顯示整合系統作為弱視患者的定向和移動輔助工具
            <br>參賽群組 : 資工通訊類群
            <br>序號 : C10
            <br>名次 : 入圍
          </div>
        </div>
      </div>
      <div class="contest-item">
        <div class="contest-name">
          雲林科技大學資工系專題競賽
          <div class="detailed">
            參賽專題名稱 : 以AR技術輔助強化弱視患者感知能力
            <br>名次 : 第三名
          </div>
        </div>
      </div>
      <div class="contest-item">
        <div class="contest-name">
          2024 年全國大專校院智慧創新暨跨域整合創作競賽
          <div class="detailed">
            參賽專題名稱 : 弱視患者移動輔助工具(Mobility Assistance Tool for Amblyopia Patients)
            <br>參賽群組 : 體感互動科技
            <br>隊伍名稱/編號 : 馬卡巴卡/60011
            <br>名次 : 入圍
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  padding: 20px;
  color: var(--text-primary);
  background-color: rgba(var(--bg-primary-rgb), 0.7);
  backdrop-filter: blur(50px);
  overflow-y: auto;
  height: 100%;
}

h2 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.page-title {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.contests {
  width: 100%;
  font-size: 1.5rem;
}

.contest-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.2rem;
}

.contest-name:before {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: var(--accent-color);
  border-radius: 50%;
  margin-left: 0.15rem;
}

.detailed {
  border-left: 0.3rem dotted var(--text-secondary);
  padding-left: 2.5rem;
  margin-left: 0.5rem;
  height: fit-content;
  white-space: pre-line;
}
</style>
