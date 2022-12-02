<template>
  <div class="sessions-wrapper">
    <h2>Session frames history</h2>
    <a-table :columns="columns" :dataSource="frames">
    <span slot="action" slot-scope="text, record">
      <a @click="showInputImage(record.id)">View input frame</a>
      <a-divider type="vertical"/>
      <a @click="showOutputImage(record.id)">View output frame</a>
    </span>
    </a-table>
    <a-modal
        :visible="visible"
        @cancel="() => this.visible = false"
        @ok="() => this.visible = false"
    >
      <img :src="`data:image/jpeg;base64,${image}`"/>
    </a-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_FRAMES, GET_INPUT_IMAGE, GET_OUTPUT_IMAGE} from "@/store/frames.module";

export default {
  name: "TheFramesPage",
  computed: {
    ...mapGetters([
      'frames',
    ])
  },
  data() {
    return {
      visible: false,
      image: '',
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Details',
          dataIndex: 'frameDetails',
          key: 'frameDetails',
        },
        {
          title: 'Timestamp',
          dataIndex: 'timestamp',
          key: 'timestamp',
        },
        {
          title: 'Capture session ID',
          dataIndex: 'captureSessionId',
          key: 'captureSessionId',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: {customRender: 'action'},
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch(GET_FRAMES);
  },
  methods: {
    showModal(image) {
      if (!image) {
        this.$notification.open({
          message: 'No image available',
          description: '',
        });

        return
      }

      this.image = image;
      this.visible = true;
    },
    showInputImage(frameId) {
      this.$store.dispatch(GET_INPUT_IMAGE, frameId)
          .then((response) => {
            this.showModal(response.data)
          })
          .catch((err) => {
            console.error(err);
            this.$notification.open({
              message: 'No image available',
              description: '',
            });
          });
    },
    showOutputImage(frameId) {
      this.$store.dispatch(GET_OUTPUT_IMAGE, frameId)
          .then((response) => {
            this.showModal(response.data)
          })
          .catch((err) => {
            console.error(err);
            this.$notification.open({
              message: 'No image available',
              description: '',
            });
          });
    },
  }
}
</script>

<style scoped>
img {
  width: 30rem;
  height: 40rem;
}

</style>