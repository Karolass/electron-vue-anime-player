<template>
  <div>
    <div class="layout-padding">
      <div class="row gutter wrap">
        <template v-for="item in data">
          <div class="sm-width-1of1 md-width-1of2 lg-width-1of4">
            <router-link :to="{ name: 'page', params: { path: item.href }}">
              <div class="card">
                <div class="card-title text-center">
                  {{ item.title }}
                </div>
                <img :src="item.image">
                <span class="overlap"> {{ item.update }} </span>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      index: 1,
      data: [],
    }
  },
  computed: {
  },
  methods: {
    load() {
      this.$electron.ipcRenderer.send('do-get-list')
    },
    getList(event, data) {
      this.data = this.data.concat(data)
    },
  },
  mounted() {
    this.load()
    this.$electron.ipcRenderer.on('done-get-list', this.getList)
  },
  beforeDestroy() {
    this.$electron.ipcRenderer.removeListener('done-get-list', this.getList)
  },
}
</script>

<style lang="scss" scoped>

.card {
  position: relative;
  cursor: pointer;

  &:focus, &:hover {
    box-shadow:4px 4px 3px rgba(20%,20%,40%,0.5);
  }

  .overlap {
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    color: white;
    line-height: 2rem;
    text-align: center;
    width: 100%;
  }
}
</style>
