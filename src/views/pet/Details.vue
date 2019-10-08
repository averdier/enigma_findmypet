<template>
  <card-layout>
    <template v-if="item !== undefined">

      <v-list-item>
        <v-list-item-avatar>
            <img v-bind:src="item.picture" />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
    </template>
  </card-layout>
</template>

<script>
import CardLayout from '@/components/CardLayout.vue'

export default {
  name: 'pet-details',
  components: { CardLayout },
  props: {
        id: {
            type: String,
            required: true
        }
    },
    data: () => ({
        item: undefined
    }),
    watch: {
        id: function () {
            this.updateItem()
        }
    },
    methods: {
        updateItem () {
            this.item = this.$store.getters['pet/getItem'](this.id)
            if (this.item === undefined) this.$router.push({ name: 'empty' })
        }
    },
    created () {
        this.updateItem()
    }
}
</script>