<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { computed } from 'vue'

interface Props {
  href: string
  title: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
})

const themeVars = useThemeVars()

const textStyles = computed(() => ({
  '--text-color-1': themeVars.value.textColor1,
  '--text-color-2': themeVars.value.textColor2,
  '--text-color-3': themeVars.value.textColor3,
  '--border-color': themeVars.value.borderColor,
}))

function handleClick() {
  if (props.href) {
    window.open(props.href, '_blank')
  }
}
</script>

<template>
  <div class="ad-banner" :style="textStyles">
    <div class="ad-banner__container" @click="handleClick">
      <div class="ad-banner__content">
        <div class="ad-banner__text">
          <h3 class="ad-banner__title">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="ad-banner__subtitle">
            {{ subtitle }}
          </p>
        </div>
        <div class="ad-banner__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="ad-banner-placeholder" />
</template>

<style scoped>
/* 基础容器样式 */
.ad-banner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  z-index: 1001;
  border-bottom: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.005);
  backdrop-filter: blur(8px);
}

.ad-banner-placeholder {
  height: 88px;
}

/* 主容器样式 */
.ad-banner__container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 内容区域 */
.ad-banner__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  gap: 16px;
}

/* 文本区域 */
.ad-banner__text {
  flex: 1;
  text-align: center;
}

.ad-banner__title {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-color-1);
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}

.ad-banner__subtitle {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-color-2);
  transition: all 0.2s ease;
  opacity: 0.8;
}

/* CTA区域 */
.ad-banner__cta {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  flex-shrink: 0;
  border: 1px solid transparent;
}

/* 悬停效果 */
.ad-banner__container:hover {
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.015), transparent);
}

.ad-banner__container:hover .ad-banner__title {
  transform: translateY(-1px);
  color: var(--text-color-1);
}

.ad-banner__container:hover .ad-banner__subtitle {
  opacity: 1;
  transform: translateY(-1px);
}

.ad-banner__container:hover .ad-banner__cta {
  background-color: rgba(0, 0, 0, 0.08);
  border-color: var(--border-color);
  transform: translateX(3px) scale(1.05);
  color: var(--text-color-1);
}

/* 点击效果 */
.ad-banner__container:active {
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.025), transparent);
}

.ad-banner__container:active .ad-banner__cta {
  transform: translateX(2px) scale(0.98);
}

/* 深色主题适配 */
@media (prefers-color-scheme: dark) {
  .ad-banner {
    background: rgba(255, 255, 255, 0.008);
  }

  .ad-banner__container:hover {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.02), transparent);
  }

  .ad-banner__container:hover .ad-banner__cta {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .ad-banner__container:active {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.035), transparent);
  }
}
</style>
