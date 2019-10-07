<template>
  <card-layout>
    <v-list three-line rounded>
      <pet-list-item v-for="(pet, key) in items" :item="pet" :key="key" />
    </v-list>
  </card-layout>
</template>

<script>
import { mapState } from 'vuex'
import CardLayout from '@/components/CardLayout.vue'
import PetListItem from '@/components/PetListItem.vue'

export default {
  name: 'pet-list',
  components: { CardLayout, PetListItem },
  computed: mapState({
    items: state => state.pet.items
  })
}
</script>