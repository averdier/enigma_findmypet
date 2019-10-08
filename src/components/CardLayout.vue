<template>
    <v-card class="card-layout">
        <v-card-actions :ref="cardRef">
            <div class="flex-grow-1"></div>
            <v-btn v-if="close" icon :to="{ name: 'empty' }">
                <v-icon>close</v-icon>
            </v-btn>
        </v-card-actions>

        <v-card-text class="card-content" v-bind:style="contentStyle">
            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script>
import uuidv1 from 'uuid'

export default {
    name: 'card-layout',
    props: {
        close: {
            type: Boolean,
            required: false,
            default: () => true
        }
    },
    data: () => ({
        cardRef: uuidv1(),
        contentStyle: {
            'max-height': '500px'
        }
    }),
    methods: {
        updateContentHeigth () {
            if (this.$refs[this.cardRef]) {
                this.contentStyle['max-height'] = window.innerHeight - 92 - this.$refs[this.cardRef].clientHeight + 'px'
            }
        }
    },
    created () {
        window.addEventListener('resize', this.updateContentHeigth)
        this.updateContentHeigth()
    },
    destroyed () {
        window.removeEventListener('resize', this.updateContentHeigth)
    },
    mounted () {
        this.updateContentHeigth()
    }
}
</script>

<style scoped>
.card-layout {
    width: 100%;
    height: 100%;
}
.card-content {
    height: 100%;
    overflow-y: scroll
}
</style>