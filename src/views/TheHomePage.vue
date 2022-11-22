<template>
  <div class="home-wrapper">
    <h2>Active devices</h2>
    <div class="devices-wrapper">
      <a-card
          v-for="device in getDevices"
          :key="device.deviceId"
          class="device-wrapper"
      >
        <p> {{ device.deviceId }} </p>
        <p> {{ device.deviceName }}</p>
        <img v-if="device.image" :src="`data:image/jpeg;base64,${device.image}`" alt="can't dispaly" class="frame"/>
        <img v-if="!device.image" alt="no frame yet" class="frame" src="/await.png"/>

      </a-card>
    </div>
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
  width: 20rem;
  height: 26.6rem;
}

.devices-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.devices-wrapper * {
  margin: 2rem;
}
</style>
