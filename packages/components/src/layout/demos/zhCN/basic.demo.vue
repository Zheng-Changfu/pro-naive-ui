<markdown>
# 基本展示
</markdown>

<script lang="tsx">
import { computed, defineComponent, ref } from 'vue'

type LayoutType =
  | 'full-content'
  | 'header-mixed-nav'
  | 'header-nav'
  | 'header-sidebar-nav'
  | 'mixed-nav'
  | 'sidebar-mixed-nav'
  | 'sidebar-nav'
export default defineComponent({
  setup() {
    const mode = ref<LayoutType>('sidebar-nav')
    const sidebarExtraVisible = ref(false)
    const preferences = ref({
      app: {
        accessMode: 'frontend',
        authPageLayout: 'panel-right',
        checkUpdatesInterval: 1,
        colorGrayMode: false,
        colorWeakMode: false,
        compact: false,
        contentCompact: 'wide',
        contentCompactWidth: 1200,
        contentPadding: 0,
        contentPaddingBottom: 0,
        contentPaddingLeft: 0,
        contentPaddingRight: 0,
        contentPaddingTop: 0,
        defaultAvatar:
      'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
        defaultHomePath: '/analytics',
        dynamicTitle: true,
        enableCheckUpdates: true,
        enablePreferences: true,
        enableRefreshToken: false,
        isMobile: false,
        layout: 'sidebar-nav',
        locale: 'zh-CN',
        loginExpiredMode: 'page',
        name: 'Vben Admin',
        preferencesButtonPosition: 'auto',
        watermark: false,
        zIndex: 200,
      },
      breadcrumb: {
        enable: true,
        hideOnlyOne: false,
        showHome: false,
        showIcon: true,
        styleType: 'normal',
      },
      copyright: {
        companyName: 'Vben',
        companySiteLink: 'https://www.vben.pro',
        date: '2024',
        enable: true,
        icp: '',
        icpLink: '',
        settingShow: true,
      },
      footer: {
        enable: true,
        fixed: false,
        height: 32,
      },
      header: {
        enable: true,
        height: 50,
        hidden: false,
        menuAlign: 'start',
        mode: 'fixed',
      },

      logo: {
        enable: true,
        source: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
      },
      navigation: {
        accordion: true,
        split: true,
        styleType: 'rounded',
      },
      shortcutKeys: {
        enable: true,
        globalLockScreen: true,
        globalLogout: true,
        globalPreferences: true,
        globalSearch: true,
      },
      sidebar: {
        autoActivateChild: false,
        collapsed: false,
        collapsedButton: true,
        collapsedShowTitle: false,
        collapseWidth: 60,
        enable: true,
        expandOnHover: true,
        extraCollapse: false,
        extraCollapsedWidth: 60,
        fixedButton: true,
        hidden: false,
        mixedWidth: 80,
        width: 224,
      },
      tabbar: {
        draggable: true,
        enable: true,
        height: 38,
        keepAlive: true,
        maxCount: 0,
        middleClickToClose: false,
        persist: true,
        showIcon: true,
        showMaximize: true,
        showMore: true,
        styleType: 'chrome',
        wheelable: true,
      },
      theme: {
        builtinType: 'default',
        colorDestructive: 'hsl(348 100% 61%)',
        colorPrimary: 'hsl(212 100% 45%)',
        colorSuccess: 'hsl(144 57% 58%)',
        colorWarning: 'hsl(42 84% 61%)',
        mode: 'dark',
        radius: '0.5',
        semiDarkHeader: false,
        semiDarkSidebar: false,
      },
      transition: {
        enable: true,
        loading: true,
        name: 'fade-slide',
        progress: true,
      },
      widget: {
        fullscreen: true,
        globalSearch: true,
        languageToggle: true,
        lockScreen: true,
        notification: true,
        refresh: true,
        sidebarToggle: true,
        themeToggle: true,
      },
    })
    function toggleSidebar() {
      preferences.value.sidebar.hidden = !preferences.value.sidebar.hidden
    }
    const sidebarVisible = computed(() => preferences.value.sidebar.enable)
    return {
      mode,
      toggleSidebar,
      sidebarVisible,
      preferences,
      sidebarExtraVisible,
    }
  },
})
</script>

<template>
  <n-flex vertical>
    <ProLayout
      v-model:sidebar-extra-visible="sidebarExtraVisible"
      :content-compact="preferences.app.contentCompact"
      :content-compact-width="preferences.app.contentCompactWidth"
      :content-padding="preferences.app.contentPadding"
      :content-padding-bottom="preferences.app.contentPaddingBottom"
      :content-padding-left="preferences.app.contentPaddingLeft"
      :content-padding-right="preferences.app.contentPaddingRight"
      :content-padding-top="preferences.app.contentPaddingTop"
      :footer-enable="preferences.footer.enable"
      :footer-fixed="preferences.footer.fixed"
      :footer-height="preferences.footer.height"
      :header-height="preferences.header.height"
      :header-hidden="preferences.header.hidden"
      :header-mode="preferences.header.mode"
      header-theme="dark"
      :header-toggle-sidebar-button="preferences.widget.sidebarToggle"
      :header-visible="preferences.header.enable"
      :is-mobile="preferences.app.isMobile"
      :layout="mode"
      :sidebar-collapse="preferences.sidebar.collapsed"
      :sidebar-collapse-show-title="preferences.sidebar.collapsedShowTitle"
      :sidebar-enable="sidebarVisible"
      :sidebar-collapsed-button="preferences.sidebar.collapsedButton"
      :sidebar-fixed-button="preferences.sidebar.fixedButton"
      :sidebar-expand-on-hover="preferences.sidebar.expandOnHover"
      :sidebar-extra-collapse="preferences.sidebar.extraCollapse"
      :sidebar-extra-collapsed-width="preferences.sidebar.extraCollapsedWidth"
      :sidebar-hidden="preferences.sidebar.hidden"
      :sidebar-mixed-width="preferences.sidebar.mixedWidth"
      sidebar-theme="'dark'"
      :sidebar-width="preferences.sidebar.width"
      :side-collapse-width="preferences.sidebar.collapseWidth"
      :tabbar-enable="preferences.tabbar.enable"
      :tabbar-height="preferences.tabbar.height"
      :z-index="preferences.app.zIndex"
      @toggle-sidebar="toggleSidebar"
      @update:sidebar-collapse="
        (value: boolean) => preferences.sidebar.collapsed = value
      "
      @update:sidebar-enable="
        (value: boolean) => preferences.sidebar.enable = value
      "
      @update:sidebar-expand-on-hover="
        (value: boolean) =>
          preferences.sidebar.expandOnHover = value
      "
      @update:sidebar-extra-collapse="
        (value: boolean) =>
          preferences.sidebar.extraCollapse = value
      "
    >
      <!-- logo -->
      <template #logo>
        logo
      </template>
      <!-- 头部区域 -->
      <template #header>
        header
      </template>
      <!-- 侧边菜单区域 -->
      <template #menu>
        menu
      </template>
      <template #mixed-menu>
        mixed-menu
      </template>
      <!-- 侧边额外区域 -->
      <template #side-extra>
        side-extra
      </template>
      <template #side-extra-title>
        side-extra-title
      </template>

      <template #tabbar>
        tabber
      </template>

      <!-- 主体内容 -->
      <template #content>
        content
      </template>

      <template v-if="preferences.transition.loading" #content-overlay>
        loading
      </template>

      <!-- 页脚 -->
      <template v-if="preferences.footer.enable" #footer>
        footer
      </template>

      <template #extra>
        extra
      </template>
    </ProLayout>
    <n-select
      v-model:value="mode"
      :options="[
        { label: 'full-content', value: 'full-content' },
        { label: 'header-mixed-nav', value: 'header-mixed-nav' },
        { label: 'header-nav', value: 'header-nav' },
        { label: 'header-sidebar-nav', value: 'header-sidebar-nav' },
        { label: 'mixed-nav', value: 'mixed-nav' },
        { label: 'sidebar-mixed-nav', value: 'sidebar-mixed-nav' },
        { label: 'sidebar-nav', value: 'sidebar-nav' },

      ]"
    />
  </n-flex>
</template>
