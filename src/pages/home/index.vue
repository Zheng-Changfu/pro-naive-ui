<script lang="ts">
import { useThemeVars } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useThemeName } from '../../store'
import { i18n, useIsMobile, useIsTablet } from '../../utils/composables'
import LandingFooter from './Footer.vue'
import leftImage from './Left.vue'
import rightImage from './Right.vue'

export default defineComponent({
  components: {
    LandingFooter,
    LeftImage: leftImage,
    RightImage: rightImage,
  },
  setup() {
    const vars = useThemeVars()
    const isMobileRef = useIsMobile()
    return {
      vars,
      isMobile: isMobileRef,
      isTablet: useIsTablet(),
      theme: useThemeName(),
      titleStyle: computed(() => {
        if (isMobileRef.value) {
          return 'margin-top: 0; font-size: 64px !important'
        }
        else {
          return 'margin-top: 0; font-size: 80px !important'
        }
      }),
      ...i18n({
        'zh-CN': {
          start: '开始使用',
          tips: '此项目非官方出品！',
          intro1: '基于 Naive UI 二次封装',
          intro2: '适用于中后台项目，希望让你早点下班，多点时间陪伴家人',
          intro3: '',
          intro4: '换个主题',
        },
      }),
    }
  },
  data() {
    return {
      hover: false,
      themeOptions: {
        dark: {
          next: 'light',
        },
        light: {
          next: 'dark',
        },
      },
    }
  },
  methods: {
    handleStartClick() {
      this.$router.push(`${this.$route.path}/docs/installation`)
    },
    handleTitleMouseEnter() {
      this.hover = true
    },
    handleTitleMouseLeave() {
      this.hover = false
    },
    handleThemeChangeClick() {
      // @ts-expect-error
      this.theme = this.themeOptions[this.theme].next
    },
  },
})
</script>

<template>
  <n-layout
    :native-scrollbar="false"
    :position="isMobile ? 'static' : 'absolute'"
    :style="isMobile ? undefined : 'top: var(--header-height);'"
  >
    <n-alert :title="t('tips')" type="info" :bordered="false" :show-icon="false">
      <template #header>
        <div class="flex items-center justify-center">
          <n-icon :color="vars.infoColor" :size="20">
            <svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g fill-rule="nonzero">
                  <path d="M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z" />
                </g>
              </g>
            </svg>
          </n-icon>
          <span class="ml-8px">{{ t('tips') }}</span>
        </div>
      </template>
    </n-alert>
    <div class="banner" style="overflow: hidden">
      <RightImage v-if="!(isMobile || isTablet)" class="right-image" />
      <n-h1 :style="titleStyle" class="naive-title">
        <span
          @mouseenter="handleTitleMouseEnter"
          @mouseleave="handleTitleMouseLeave"
        >Pro Na{{ hover ? 'ï' : 'i' }}ve UI</span>
      </n-h1>
      <n-p style="font-size: 16px; margin-top: 0; margin-bottom: 0">
        {{ t('intro1') }}
      </n-p>
      <n-p
        style="
          font-size: 16px;
          margin-bottom: 4px;
          margin-top: 4px;
          font-weight: 500;
        "
      >
        {{ t('intro2') }}
      </n-p>
      <n-p style="font-size: 16px; margin-top: 0">
        {{ t('intro3') }}
      </n-p>
      <div>
        <n-button
          type="default"
          size="large"
          style="margin-right: 12px"
          @click="handleThemeChangeClick"
        >
          {{ t('intro4') }}
        </n-button>
        <n-button
          type="primary"
          :ghost="theme === 'dark'"
          size="large"
          @click="handleStartClick"
        >
          {{ t('start') }}
        </n-button>
      </div>
      <LeftImage class="left-image" />
    </div>
    <n-layout-footer>
      <LandingFooter centered />
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
.banner {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  justify-content: center;
}

.banner::after {
  content: '';
  width: 100%;
  height: 64px;
}

.naive-title {
  line-height: 1;
  font-family: Metropolis, sans-serif;
  margin-bottom: 18px !important;
}

@media only screen and (max-width: 1920px) {
  .left-image {
    right: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }
  .right-image {
    left: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }
}

@media only screen and (min-width: 1920px) {
  .left-image {
    left: 0;
    width: 700px;
  }
  .right-image {
    right: 0;
    width: 700px;
  }
}

.left-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.right-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

@media only screen and (max-width: 1023px) {
  .banner {
    position: static;
    text-align: left;
    padding-left: 16px;
    transform: none;
    padding-top: 60px;
    padding-right: 16px;
    min-height: 550px;
    height: calc(100vh - 124px);
  }
  .left-image {
    position: relative;
    left: -16px;
    min-width: unset;
    width: 300px;
    top: 8px;
    transform: none;
  }
}
</style>
