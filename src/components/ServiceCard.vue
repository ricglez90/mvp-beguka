<template>
  <div class="service-card" :class="{ 'is-disabled': !isAvailable }">
    <div class="card-header" :style="{ backgroundColor: headerColor }">
      <span v-if="badge" class="badge">{{ badge }}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <button class="card-btn" :disabled="!isAvailable">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  badge: String,
  btnText: String,
  headerColor: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.service-card {
  background-color: #fffae4;
  border: 4px solid #07002C;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 8px 8px 0px 0px #07002C;
  transition: transform 0.2s ease;
  min-height: 380px;
}

.service-card:hover {
  transform: translateY(-4px);
}

.service-card.is-disabled {
  opacity: 0.85;
}

.card-header {
  height: 80px;
  border-bottom: 4px solid #07002C;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.badge {
  background-color: #fffae4;
  color: #07002C;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  border: 2px solid #07002C;
  text-transform: uppercase;
}

.card-body {
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  color: #07002C;
  font-size: 1.8rem;
  margin: 0 0 15px 0;
}

.card-description {
  color: #07002C;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 30px;
  flex: 1;
}

.card-btn {
  background-color: #07002C;
  color: #fffae4;
  border: none;
  padding: 15px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.card-btn:hover:not(:disabled) {
  background-color: #00abf3;
  color: #07002C;
}

.card-btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>