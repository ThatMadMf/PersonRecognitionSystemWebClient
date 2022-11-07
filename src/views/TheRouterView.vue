<template>
  <div
      id="router-view-wrapper"
      :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
    <router-view/>
    <sidebar-menu
        :collapsed="collapsed"
        :menu="menu"
        :show-one-child="true"
        :theme="theme"
        @toggle-collapse="onToggleCollapse"
    />
    <div
        v-if="isOnMobile && !collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
    />
  </div>
</template>

<script>
export default {
  name: 'TheRouterView',
  data() {
    return {
      menu: [
        {
          href: '/home',
          title: 'Home',
        },
      ],
      collapsed: false,
      theme: 'white-theme',
      isOnMobile: false,
    }
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
}
</script>

<style scoped>

</style>