<template>
  <card-layout>

    <v-form ref="createPetForm">

      <v-text-field v-model="form.name" label="Name" />

      <v-text-field v-model="form.serial" label="Serial" />

      <v-textarea v-model="form.description" label="Description" />

      <v-btn text color="primary">Create</v-btn>
    </v-form>

  </card-layout>
</template>

<script>
import CardLayout from '@/components/CardLayout.vue'

export default {
  name: 'pet-create',
  components: { CardLayout },
  data: () => ({
    form: {
      name: null,
      serial: null,
      description: null
    }
  })
}
</script>