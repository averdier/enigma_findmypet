<template>
    <v-card class="card-layout">

        <v-card-actions ref="cardHeader">
            <div class="action-title">{{ title }}</div>
            <div class="flex-grow-1"></div>
            <v-btn v-if="close" icon :to="{ name: 'empty' }">
                <v-icon>close</v-icon>
            </v-btn>
        </v-card-actions>

        <v-card-text v-bind:style="contentStyle" class="card-content">
            <slot></slot>
        </v-card-text>

        <v-card-actions ref="cardFooter">
            <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'card-layout',
    props: {
        title: {
            type: String,
            required: false,
            default: () => 'Title'
        },
        close: {
            type: Boolean,
            required: false,
            default: () => true
        }
    },
    data: () => ({
        contentStyle: {
            'max-height': 'unset',
            'overflow': 'scroll'
        }
    }),
    methods: {
        updateContentStyle () {
            if (this.$refs.cardHeader && this.$refs.cardFooter) {
                this.contentStyle['max-height'] = `${window.innerHeight - this.$refs.cardHeader.clientHeight - this.$refs.cardFooter.clientHeight - 80 - 38}px`
            }
        }
    },
    created () {
        window.addEventListener('resize', this.updateContentStyle)
    },
    mounted () {
        this.updateContentStyle()
    },
    destroyed () {
        window.removeEventListener('resize', this.updateContentStyle)
    }
}
</script>

<style scoped>

/* Full width */
.card-layout {
    width: 100%;
}

/* Hide scrollbars */
.card-content::-webkit-scrollbar { width: 0 !important }
.card-content {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}

/* Title like button text */
.action-title {
    padding: 0 8px;
    height: 36px;
    font-size: 0.875rem;
    letter-spacing: 0.0892857143em;
    font-weight: 500;
    text-indent: 0.0892857143em;
    font: inherit;
    display: flex;
    align-items: center;
    text-transform: uppercase;
}
</style>