<template>
    <v-list-item :to="{ name: 'pet-details', params: { id: item.id } }">
        <v-list-item-avatar style="margin-top: 26px;">
            <img v-bind:src="item.picture" />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle><span class='text--primary'>Last location:</span> {{ item.location.position }}</v-list-item-subtitle>
            <v-list-item-subtitle><span class='text--primary'>At:</span> {{ item.location.at }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action style="margin-top: 26px;">
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
        }
    }
}
</script>