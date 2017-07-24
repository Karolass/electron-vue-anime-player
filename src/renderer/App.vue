<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="0">Electron Vue Anime Player</q-toolbar-title>
      </div>

      <!-- Left side Drawer -->
      <q-drawer ref="leftDrawer">
        <div class="list platform-delimiter">
          <div class="list-header"></div>
          <q-drawer-link icon="mail" :to="{path: '/', exact: true}">連載中</q-drawer-link>
        </div>
      </q-drawer>

      <transition
      name="custom-classes-transition"
      enter-active-class="animated rollIn"
      leave-active-class="animated rollOut">
        <router-view class="layout-view"></router-view>
      </transition>
    </q-layout>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'

/*
 * Root component
 */
export default {
  mounted() {
  },
}
</script>

<style></style>
