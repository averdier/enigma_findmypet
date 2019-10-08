<template>
    <v-card class="pet-details-card">
        <v-list v-if="item !== undefined" three-line rounded>
            <pet-list-item :item="item" />
        </v-list>
    </v-card>
</template>

<script>
import PetListItem from '@/components/PetListItem.vue'

export default {
    name: 'pet-focus',
    components: { PetListItem },
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
.pet-details-card {
    width: 100%;
    border-radius: 58.6666666667px !important;
}
</style>