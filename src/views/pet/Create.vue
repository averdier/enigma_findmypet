<template>
  <card-layout>

    <v-form ref="createPetForm" @click="submit">

      <v-text-field label="Name"
        v-model="form.name"
        :error-messages="nameErrors"
        @input="$v.form.name.$touch()"
        @blur="$v.form.name.$touch()" />

      <v-text-field label="Serial"
        v-model="form.serial"
        :error-messages="serialErrors"
        @input="$v.form.serial.$touch()"
        @blur="$v.form.serial.$touch()" />

      <v-text-field label="Picture"
        v-model="form.picture"
        :error-messages="pictureErrors"
        @input="$v.form.serial.$touch()"
        @blur="$v.form.serial.$touch()" />

      <v-textarea label="Description"
        v-model="form.description"
        :error-messages="descriptionErrors"
        @input="$v.form.description.$touch()"
        @blur="$v.form.description.$touch()" />

      <v-btn text color="primary" @click="submit">Create</v-btn>
    </v-form>

  </card-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import CardLayout from '@/components/CardLayout.vue'

const betweenLength = (min, max) => (value) => value.length >= min && value.length <= max

export default {
  name: 'pet-create',
  mixins: [validationMixin],
  components: { CardLayout },
  data: () => ({
    form: {
      name: null,
      serial: null,
      picture: null,
      description: null
    }
  }),
  validations: {
    form: {
      name: {
        required,
        between: betweenLength(3, 32)
      },
      serial: {
        required,
        between: betweenLength(12, 32)
      },
      picture: {
        required
      },
      description: {
        required,
        between: betweenLength(3, 512)
      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.required && errors.push('Required')
      !this.$v.form.name.between && errors.push('Between 3 and 32 char')
      return errors
    },

    pictureErrors () {
      const errors = []
      if (!this.$v.form.picture.$dirty) return errors
      !this.$v.form.picture.required && errors.push('Required')
      return errors
    },

    serialErrors () {
      const errors = []
      if (!this.$v.form.serial.$dirty) return errors
      !this.$v.form.serial.required && errors.push('Required')
      !this.$v.form.serial.between && errors.push('Between 12 and 32 char')
      return errors
    },

    descriptionErrors () {
      const errors = []
      if (!this.$v.form.description.$dirty) return errors
      !this.$v.form.description.required && errors.push('Required')
      !this.$v.form.description.between && errors.push('Between 3 and 512 char')
      return errors
    }
  },
  methods: {
    submit (e) {
      if (e) e.preventDefault()
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('pet/createItem', this.form)
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>