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
      <div v-if="haveNext" class="row justify-center" style="margin-bottom: 50px;">
        <spinner name="dots" slot="message" :size="40"></spinner>
      </div>
      <h5 v-if="!haveNext" class="text-center">已經到底囉</h5>
    </div>
  </div>
</template>

<script>

function debounce(fn, wait = 250, immediate) {
  let timeout
  return function p(...args) {
    const later = () => {
      timeout = null
      if (!immediate) {
        fn.apply(this, args)
      }
    }

    clearTimeout(timeout)
    if (immediate && !timeout) {
      fn.apply(this, args)
    }
    timeout = setTimeout(later, wait)
  }
}

export default {
  data() {
    return {
      index: 1,
      haveNext: true,
      data: [],
    }
  },
  computed: {
  },
  methods: {
    poll() {
      if (this.$el.scrollHeight - 100 <= this.$el.offsetHeight + this.$el.scrollTop) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.haveNext) {
        this.$electron.ipcRenderer.send('do-get-list', this.index)
        this.index += 1
      }
      this.$el.removeEventListener('scroll', this.poll)
    },
    getList(event, result) {
      this.data = this.data.concat(result.data)
      this.haveNext = result.next
      this.$el.addEventListener('scroll', this.poll)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.poll = debounce(this.poll, 50)
      this.loadMore()
      this.$electron.ipcRenderer.on('done-get-list', this.getList)
    })
  },
  beforeDestroy() {
    this.$electron.ipcRenderer.removeListener('done-get-list', this.getList)
    this.$el.removeEventListener('scroll', this.poll)
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
