<template>
  <div>
    <div class="zodiac-title-container">
      <div class="zodiac-title">{{ name }}</div>
      <div class="zodiac-underline"></div>
      <div class="zodiac-subtitle">Hi Bro</div>
    </div>
    <div class="level-authors">
      <div class="type-title-sm">First Victor</div>
      <p class="type-body">
        <span>{{ verifier }}</span>
      </p>
      <div class="type-title-sm">Publisher</div>
      <p class="type-body">
        <span>{{ author }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: { type: String, required: true },
    verifier: { type: String, required: true },
    name: { type: String, required: true } // Add this prop for the title
  }
}
</script>

<style scoped>
.zodiac-title {
  font-size: 48px; /* Example size, adjust to match your design */
  font-weight: bold;
}
.zodiac-underline {
  width: 100%;
  height: 2px;
  background: #fff;
  margin: 4px 0 0 0;
}
.zodiac-subtitle {
  font-size: 38px; /* 10px smaller than Zodiac title */
  margin-top: 8px;
  color: #ccc;
}
</style>
