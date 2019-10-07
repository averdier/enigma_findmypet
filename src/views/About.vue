<template>
  <card-layout>
    <v-container grid-list-lg>
      <v-layout :justify-center="!onMobile" :align-center="!onMobile" wrap>
        <v-flex sm12 md4 lg3 v-for="(item, key) in devs" :key="key">
            <v-card flat>
              <template v-if="!onMobile">
                <v-img :src="item.avatar" contain max-height="240">
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>

                <v-card-title>{{ item.name }}</v-card-title>
              </template>

              <v-list-item three-line v-else>
                <v-list-item-avatar size="125" tile>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="align-self-start">
                  <v-list-item-title class="headline mb-2" v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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