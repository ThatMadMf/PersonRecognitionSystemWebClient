<template>
  <div class="sessions-wrapper">
    <h2>Users</h2>
    <a-table :columns="columns" :dataSource="users"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_USERS} from "@/store/user.module";

export default {
  name: "TheUsersPage",
  computed: {
    ...mapGetters([
      'users',
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
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'First name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Last login',
          dataIndex: 'lastLogin',
          key: 'lastLogin',
        },
        {
          title: 'Date joined',
          dataIndex: 'dateJoined',
          key: 'dateJoined',
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_USERS);
  }
}
</script>

<style scoped>

</style>