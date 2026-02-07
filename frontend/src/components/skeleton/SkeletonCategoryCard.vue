<template>
  <div class="sk_cat">
    <div class="sk_cat_img sk" />
    <div class="sk_cat_body">
      <div class="sk_cat_line sk" />
    </div>
  </div>
</template>

<style scoped>
.sk {
  background: linear-gradient(90deg, #e6e6e6 25%, #f3f3f3 37%, #e6e6e6 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.sk_cat {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 260px;
}

.sk_cat_img {
  width: 100%;
  height: 140px;
}

.sk_cat_body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
}

.sk_cat_line {
  width: 70%;
  height: 16px;
  border-radius: 10px;
}

@media (max-width: 576px) {
  .sk_cat {
    height: 220px;
  }

  .sk_cat_img {
    height: 120px;
  }
}
</style>
