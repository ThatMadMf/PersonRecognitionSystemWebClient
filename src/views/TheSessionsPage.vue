<template>
  <div class="sessions-wrapper">
    <a-table :columns="columns" :dataSource="sessions"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_SESSIONS} from "@/store/sessions.module";

export default {
  name: "TheSessionsPage",
  computed: {
    ...mapGetters([
      'sessions',
    ])
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
          title: 'Start time',
          dataIndex: 'startTime',
          key: 'startTime',
        },
        {
          title: 'End time',
          dataIndex: 'endTime',
          key: 'endTime',
        },
        {
          title: 'Result',
          dataIndex: 'resultType',
          key: 'resultType',
        },
        {
          title: 'Details',
          dataIndex: 'resultDetails',
          key: 'resultDetails',
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_SESSIONS);
  }
}
</script>

<style scoped>

</style>