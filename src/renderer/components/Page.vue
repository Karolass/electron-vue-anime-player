<template>
  <div>
    <div class="layout-padding">
      <div class="row gutter wrap">
        <div class="auto">
          <div v-if="data.info" class="card">
            <div class="card-content">
              <div class="row gutter">
                <div class="width-1of3">
                  <img :src="data.info.image">
                </div>

                <div class="width-2of3">
                  <h5 class="text-center">{{ $route.params.title }}</h5>
                  <hr>
                  <h5 class="text-center">劇情簡介</h5>
                  {{ data.info.desc }}
                  <hr>
                  <template v-for="item in data.list">
                    <span v-if="item.google || item.bilibili" class="auto label bg-primary text-white" @click="show(item)">{{ item.title }}</span>
                  </template>
                  <h5 v-if="data.list.length > 0 && !haveSrc" class="text-center">很抱歉，此動畫沒有HTML5的來源。</h5>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <q-modal
        ref="iframe"
        :content-css="{minWidth: '80vw'}"
        @close="close">
        <q-video :src="url"></q-video>
      </q-modal>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: {
        info: {},
        list: [],
      },
      url: '',
      haveSrc: false,
    }
  },
  computed: {
  },
  methods: {
    load() {
      this.$electron.ipcRenderer.send('do-get-page', this.$route.params.path)
    },
    getPage(event, data) {
      this.data = data
      data.list.forEach((element) => {
        if (element.google || element.bilibili) this.haveSrc = true
      })
    },
    show(item) {
      if (item.google) {
        this.url = item.google
      } else {
        this.url = item.bilibili
      }
      this.$nextTick(() => {
        this.$refs.iframe.open()
      })
    },
    close() {
      this.url = null
    },
  },
  mounted() {
    this.load()
    this.$electron.ipcRenderer.on('done-get-page', this.getPage)
  },
  beforeDestroy() {
    this.$electron.ipcRenderer.removeListener('done-get-page', this.getPage)
  },
}
</script>

<style lang="scss" scoped>
.row {
  img {
    width: 100%;
  }
}
.label {
  margin: .5rem;
  cursor: pointer;

  &:focus, &:hover {
    box-shadow:4px 4px 3px rgba(20%,20%,40%,0.5);
  }
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
