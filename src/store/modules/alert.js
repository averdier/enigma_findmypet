export const namespaced = true

const defaultState = () => {
    return {
        alerts: [],
        nextId: 1
    }
}

export const state = defaultState

export const mutations = {
    PUSH(state, alert) {
        state.alerts.push({
            ...alert,
            id: state.nextId++
        })
    },
    DELETE(state, alertToRemove) {
        state.alerts = state.alerts.filter(
            alert => alert.id !== alertToRemove.id
        )
    },
    RESET (state) {
        const initial = defaultState()
        Object.keys(initial).forEach(key => {
            state[key] = initial[key]
        })
    }
}

export const actions = {
    add({
        commit
    }, alert) {
        commit('PUSH', alert)
    },
    remove({
        commit
    }, alertToRemove) {
        commit('DELETE', alertToRemove)
    },
    reset ({
        commit
    }) {
        commit('RESET')
    }
}