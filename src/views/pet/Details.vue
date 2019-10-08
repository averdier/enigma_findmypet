<template>
  <card-layout title="Details">
    <template v-if="item !== undefined">

        <!--Header-->
        <v-list-item>
            <v-list-item-avatar>
                <img v-bind:src="item.picture" />
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle><span class='text--primary'>Last update:</span> {{ item.location.at }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <div class="details-container">

            <!--Position-->
            <pre>{{ item.location.position }}</pre>

            <!--Description-->
            <p>{{ item.description }}</p>
        </div>
      
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

<style scoped>
/* Align details with avatar */
.details-container {
    margin: 8px 16px 0 16px;
}

.details-container > p {
    margin-top: 8px;
}
</style>