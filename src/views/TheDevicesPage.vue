<template>
  <div class="sessions-wrapper">
    <h2>Input devices</h2>
    <a-table :columns="columns" :dataSource="devices"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_DEVICES} from "@/store/devices.module";

export default {
  name: "TheDevicesPage",
  computed: {
    ...mapGetters([
      'devices',
    ]),
  },
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Device name',
          dataIndex: 'deviceName',
          key: 'deviceName',
        },
        {
          title: 'Attached at',
          dataIndex: 'attachedAt',
          key: 'attachedAt',
        },
        {
          title: 'Valid until',
          dataIndex: 'validUntil',
          key: 'validUntil',
        },
        {
          title: 'Input type',
          dataIndex: 'inputType',
          key: 'inputType',
        },
        {
          title: 'Authorization type',
          dataIndex: 'authorizationType',
          key: 'authorizationType',
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_DEVICES);
  }
}
</script>

<style scoped>

</style>