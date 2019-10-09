import backend from '@/services/backend'

const defaultState = () => ({
    status: {
        subscribe: '',
        unsubscribe: ''
    }
})

export const namespaced = true

export const state = defaultState

export const getters = {
    updating (state) {
        return state.status.subscribe === 'loading' || state.status.unsubscribe === 'loading'
    }
}

export const mutations = {
    SET_STATUS (state, { key, status }) { state[key] = status },
    RESET (state) {
        const initial = defaultState()
        Object.keys(initial).forEach(key => {
            state[key] = initial[key]
        })
    }
}

export const actions = {
    subscribe ({ commit, dispatch }, subscription) {
        commit('SET_STATUS', { key: 'subscribe', message: 'loading' })
        return backend.pushSubscribe(subscription)
        .then(response => {
            commit('SET_STATUS', { key: 'subscribe', message: 'success' })

            return response
        })
        .catch(error => {
            let alertPayload = {
                type: 'error',
                message: `Unable to subscribe to server (${error.message})`
            }
            if (error.response) {
                if (error.response.status === 403) alertPayload.message = 'You are not allowed to subscribe'
                else if (error.response.data.message) alertPayload.message = error.response.data.message
                if (error.response.status !== 409) {
                    commit('SET_STATUS', { key: 'subscribe', message: 'error' })
                    dispatch('alert/add', alertPayload, { root: true })
                    throw error
                }
            }
            else {
                commit('SET_STATUS', { key: 'subscribe', message: 'error' })
                dispatch('alert/add', alertPayload, { root: true })
                throw error
            }
        })
    },

    unsubscribe ({ commit, dispatch }, endpoint) {
        commit('SET_STATUS', { key: 'unsubscribe', message: 'loading' })
        return backend.pushUnsubscribe(endpoint)
        .then(response => {
            commit('SET_STATUS', { key: 'unsubscribe', message: 'success' })

            return response
        })
        .catch(error => {
            let alertPayload = {
                type: 'error',
                message: `Unable to unsubscribe to server (${error.message})`
            }
            if (error.response) {
                if (error.response.status === 403) alertPayload.message = 'You are not allowed to unsubscribe'
                else if (error.response.data.message) alertPayload.message = error.response.data.message
                if (error.response.status !== 409) {
                    commit('SET_STATUS', { key: 'unsubscribe', message: 'error' })
                    dispatch('alert/add', alertPayload, { root: true })
                    throw error
                }
            }
            else {
                commit('SET_STATUS', { key: 'unsubscribe', message: 'error' })
                dispatch('alert/add', alertPayload, { root: true })
                throw error
            }
        })
    },

    reset ({ commit }) { commit('RESET') }
}