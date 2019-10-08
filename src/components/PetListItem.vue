<template>
    <v-list-item :to="{ name: 'pet-details', params: { id: item.id } }">
        <v-list-item-avatar>
            <img v-bind:src="item.picture" />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle><span class='text--primary'>Last update:</span> {{ item.location.at }}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="showLocation"><span class='text--primary'>At:</span> {{ item.location.position }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'pet-list-item',
    props: {
        item: {
            type: Object,
            required: true
        },
        showLocation: {
            type: Boolean,
            required: false,
            default: () => false
        }
    }
}
</script>