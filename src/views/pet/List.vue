<template>
  <card-layout title="Pets">

    <template v-if="status === 'success'">
      <v-list v-if="items.length > 0" two-line rounded>
        <pet-list-item v-for="(pet, key) in items" :item="pet" :key="key" />
      </v-list>
      <v-layout v-else justify-center align-center fill-height>
        <div>
          <h4>Not pets found</h4>
          <v-btn text :to="{ name: 'pet-create' }">Create</v-btn>
        </div>
      </v-layout>
    </template>

    <template v-if="status === 'loading'">
      Loading pets...
    </template>

    <template v-if="status === 'error'">
      Something goes wrong, please refresh
    </template>

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
    status: state => state.pet.status,
    items: state => state.pet.items
  })
}
</script>