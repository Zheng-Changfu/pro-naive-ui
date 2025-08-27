<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdBanner',
  props: {
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div class="ad-banner">
    <a
      :href="href"
      target="_blank"
      class="ad-link"
    >
      <div class="ad-content">
        <div class="ad-title">{{ title }}</div>
        <div v-if="subtitle" class="ad-subtitle">{{ subtitle }}</div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.ad-banner {
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 6px;
  padding: 16px 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin: 12px 16px 8px 16px;
  transition: all 0.3s ease;
}

.ad-banner:hover {
  border-color: var(--n-primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ad-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--n-primary-color-rgb), 0.1), transparent);
  animation: ad-shimmer 4s ease-in-out infinite;
}

@keyframes ad-shimmer {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.ad-link {
  color: var(--n-text-color) !important;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  width: 100%;
  display: block;
  cursor: pointer;
}

.ad-link:hover {
  color: var(--n-primary-color) !important;
}

.ad-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ad-title {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.4;
  color: inherit;
}

.ad-subtitle {
  font-weight: 400;
  font-size: 11px;
  line-height: 1.4;
  color: var(--n-text-color-3);
  opacity: 0.8;
}

/* 深色主题适配 */
.n-config-provider--dark .ad-banner {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.12);
}

.n-config-provider--dark .ad-banner:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--n-primary-color);
}

.n-config-provider--dark .ad-link {
  color: rgba(255, 255, 255, 0.9) !important;
}

.n-config-provider--dark .ad-link:hover {
  color: var(--n-primary-color) !important;
}

.n-config-provider--dark .ad-subtitle {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Header 变体样式 */
.ad-link--header {
  margin: 0;
}

.ad-banner--header {
  margin: 0;
  padding: 8px 0;
  border-radius: 0;
  border-left: none;
  border-right: none;
}
</style>
