<template>
  <div class="sessions-wrapper">
    <h2>Users</h2>
    <div class="controls-wrapper">
      <a-button
          type="primary"
          @click="showCreateUserModal"
      >
        Create user
      </a-button>
    </div>
    <a-table :columns="columns" :dataSource="users">
      <span slot="action" slot-scope="text, record">
        <a @click="showUploadModal(record.id)">Upload face</a>
        <a-divider type="vertical"/>
        <a @click="deleteUser(record.id)">Delete user</a>
      </span>
    </a-table>
    <a-modal
        :visible="createUserVisible"
        @cancel="hideCreateUserModal"
        @ok="createUser"
    >
      <h3>Fill user fields</h3>
      <a-input v-model="username" class="modal-input" placeholder="Username"/>
      <a-input v-model="firstName" class="modal-input" placeholder="First name"/>
      <a-input v-model="lastName" class="modal-input" placeholder="Last name"/>
    </a-modal>
    <a-modal
        :visible="addFaceEncodingVisible"
        @cancel="hideUploadModal"
        @ok="uploadFace"
    >
      <a-upload
          :action="handleImage"
          :file-list="images"
          name="image"
      >
        <a-button>
          <a-icon type="upload"/>
          Upload face
        </a-button>
      </a-upload>
    </a-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {CREATE_USER, DELETE_USER, GET_USERS, UPLOAD_FACE} from "@/store/user.module";

export default {
  name: "TheUsersPage",
  computed: {
    ...mapGetters([
      'users',
    ])
  },
  data() {
    return {
      createUserVisible: false,
      addFaceEncodingVisible: false,
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
        {
          title: 'Action',
          key: 'action',
          scopedSlots: {customRender: 'action'},
        },
      ],
      username: '',
      firstName: '',
      lastName: '',
      currentUserId: null,
      images: [],
    };
  },
  methods: {
    showCreateUserModal() {
      this.createUserVisible = true;
    },
    showUploadModal(id) {
      this.currentUserId = id;

      this.addFaceEncodingVisible = true;
    },
    hideCreateUserModal() {
      this.username = '';
      this.firstName = '';
      this.lastName = '';

      this.createUserVisible = false;
    },
    hideUploadModal() {
      this.currentUserId = null;
      this.images = [];

      this.addFaceEncodingVisible = false;
    },
    createUser() {
      this.$store.dispatch(CREATE_USER, {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
      });

      this.hideCreateUserModal();
    },
    deleteUser(id) {
      this.$store.dispatch(DELETE_USER, id);
    },
    uploadFace() {
      this.$store.dispatch(UPLOAD_FACE, {id: this.currentUserId, image: this.images[0]})

      this.hideUploadModal();
    },
    handleImage(img) {
      this.images = [img];
    },
  },
  mounted() {
    this.$store.dispatch(GET_USERS);
  }
}
</script>

<style scoped>
.controls-wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding: 1rem 3rem;
}

.modal-input {
  margin: 0.5rem 0;
}
</style>