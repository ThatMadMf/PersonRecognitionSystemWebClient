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
import {mapGetters} from "vuex";

export default {
  name: 'TheRouterView',
  computed: {
    ...mapGetters([
      'token',
    ])
  },
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
      socket: null,
      connectAttemptInterval: setInterval(this.initSocket, 1000),
      socketConnected: false,
    }
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    getSocketUrl() {
      const host = process.env.VUE_APP_SOCKET_URL || 'ws://localhost:5005'

      return `${host}?auth_token=${this.token.replace('Bearer ', '')}`
    },
    initSocket() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        return;
      }

      if (!this.token) {
        console.log('No token is set');

        return;
      }

      this.socket = new WebSocket(this.getSocketUrl());

      this.socket.onconnect = () => {
        console.log('Socket connected');
      };

      this.socket.onerror = () => {
        console.log('Socket error');
      };

      this.socket.onclose = () => {
        console.log('Socket closed');
      };

      this.socket.onmessage = (message) => {
        const event = JSON.parse(message.data);

        console.log(`Event ${event.command} with data:`, event?.data);
        switch (event.command) {
          case "test":

            break;
          default:
            console.log(`Unknown event ${event.command} with data:`, event?.data);
        }
      };
    },
  },
  destroyed() {
    clearInterval(this.connectAttemptInterval);
  },
}
</script>

<style scoped>

</style>