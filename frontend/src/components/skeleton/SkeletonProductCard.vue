<template>
  <div class="sk_card">
    <div class="sk_img sk" />
    <div class="sk_body">
      <div class="sk_line sk title" />
      <div class="sk_line sk title short" />
      <div class="sk_line sk price" />
      <div class="sk_line sk offer" />
      <div class="sk_btn sk" />
      <div class="sk_btn sk" />
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

.sk_card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  height: 460px;
  display: flex;
  flex-direction: column;
}

.sk_img {
  width: 100%;
  height: 200px;
}

.sk_body {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}

.sk_line {
  height: 14px;
  border-radius: 10px;
}

.sk_line.title {
  height: 16px;
}

.sk_line.title.short {
  width: 75%;
}

.sk_line.price {
  height: 18px;
  width: 55%;
  margin-top: 6px;
}

.sk_line.offer {
  width: 60%;
}

.sk_btn {
  height: 44px;
  border-radius: 8px;
  margin-top: auto;
}

.sk_btn + .sk_btn {
  margin-top: 10px;
}

@media (max-width: 576px) {
  .sk_card {
    height: 400px;
  }

  .sk_img {
    height: 160px;
  }
}
</style>
