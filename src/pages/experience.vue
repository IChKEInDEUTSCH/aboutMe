<template>
  <div class="page-container">
    <h2 class="page-title">經歷 (Experience)</h2>
    <div class="timeline">
      <div class="timeline-item">
        <div class="date">2024/07/01 ~ 2024/08/30</div>
        <div class="company">
          系微股份有限公司
          <div class="detailed">
            處理主管交辦事項，清點公司資產，法律文件中翻英之翻譯。
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="date">2025/07/01 ~ 2025/08/30</div>
        <div class="company">
          系微股份有限公司
          <div class="detailed">
            使用系微開發之系統找出CVE，依照CVE編號找到對應處理方法，並撰寫處理方法或是過程的文檔。
            <br>有餘力時幫助同事，完成主管交辦事項。
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="date">2025/02/10 ~ 2025/06/30</div>
        <div class="company">
          凌網科技股份有限公司
          <div class="detailed">
            主要實習內容，從二月開始直到二月中左右做類似QA的工作，其中一名SA提供我即將上線的網站流程，希望我在操作流程當中找出網站有的問題，期間自行開發QA測試用的工具以利我能重複展現錯誤給原負責工程師看。
            <br>從二月中至三月中則是改成進行凌網之舊專案之維護和較為小型專案之功能需求新增的設計，從最初的增加網站拍照時顯示人物框至操作sqlite db去新增顧客所需欄位同時間調整前後端的對應欄位顯示和提供。
            <br>從三月到四月因原訂有開發IOS需求也有透過先行研究欲轉至IOS平台之APP的設計，期間穿插舊專案功能調整和QA。
            <br>六月開始因為計畫有所異動則開始從頭建置一個網站雛形為主，包含登入、表單填寫及簽章送出。
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
  height: fit-content;
}

.page-title {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.timeline {
  width: 100%;
  font-size: 1.5rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 0.2rem;
}

.company:before {
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
