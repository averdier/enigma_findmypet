<template>
    <v-card class="card-layout">
        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn v-if="close" icon :to="{ name: 'empty' }">
                <v-icon>close</v-icon>
            </v-btn>
        </v-card-actions>

        <v-card-text>
            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'card-layout',
    props: {
        close: {
            type: Boolean,
            required: false,
            default: () => true
        }
    }
}
</script>

<style scoped>
.card-layout {
    width: 100%;
    height: 100%;
}
</style>>