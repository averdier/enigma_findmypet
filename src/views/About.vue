<template>
  <card-layout title="About">
    <v-list two-line subheader>
      <v-subheader>Developpers</v-subheader>

      <v-list-item v-for="(item, key) in devs" :key="key">

        <v-list-item-avatar>
            <img v-bind:src="item.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.github }}</v-list-item-subtitle>
        </v-list-item-content>

      </v-list-item>

    </v-list>
  </card-layout>
</template>

<script>
import CardLayout from '@/components/CardLayout.vue'

export default {
  name: 'about',
  components: { CardLayout },
  data: () => ({
    devs: [
      {
        name: 'averdier',
        github: 'https://github.com/averdier',
        avatar: 'https://avatars3.githubusercontent.com/u/4647487?s=460&v=4'
      },
      {
        name: 'romoliere',
        github: 'https://github.com/romoliere',
        avatar: 'https://avatars0.githubusercontent.com/u/17572145?s=460&v=4'
      },
      {
        name: 'remi0411',
        github: 'https://github.com/remi0411',
        avatar: 'https://avatars0.githubusercontent.com/u/9786969?s=460&v=4'
      }
    ]
  }),
  computed: {
    onMobile () {
      return !this.$vuetify.breakpoint.mdAndUp
    }
  }
}
</script>