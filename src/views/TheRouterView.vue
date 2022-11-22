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
import {APPEND_DEVICE, SET_DEVICES, SET_FRAME} from "@/store/live-frame-capture";
import uuid from "uuid";

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

      this.socket.addEventListener('open', (_) => {
        console.log('Socket connected');

        this.socket.send(JSON.stringify({command: "get-devices", uuid: uuid.v4()}))
      })

      this.socket.onconnect = () => {
        console.log('Socket connected');

        alert("here")

        this.socket.send(JSON.stringify({command: "get-devices", uuid: "1"}))
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
          case "device-authorized":
            this.$store.commit(APPEND_DEVICE, event.data);

            break;
          case "frame-captured":
            this.$store.commit(SET_FRAME, event.data);

            break;
          case "get-devices":
            this.$store.commit(SET_DEVICES, event.data);

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

#router-view-wrapper {
  padding-left: 350px;
}

</style>