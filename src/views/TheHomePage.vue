<template>
  <div class="home-wrapper">
    <a-card
        v-for="device in getDevices"
        :key="device.deviceId"
        class="device-wrapper"
    >
      <p> {{ device.deviceId }} </p>
      <p> {{ device.deviceName }}</p>
      <img :src="`data:image/jpeg;base64,${device.image}`" alt="no frame yet" class="frame"/>
    </a-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters([
      'devices',
    ]),
    getDevices() {
      return this.devices;
    },
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img {
  width: 24rem;
  height: 32rem;
}
</style>
