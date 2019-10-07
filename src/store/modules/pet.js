import backend from '@/services/backend'

const defaultState = () => ({
    status: '',
    items: []
})

export const namespaced = true
export const state = defaultState

export const mutations = {
    SET_STATUS (state, status) { state.status = status },
    SET_ITEMS (state, items) { state.items = items },
    RESET (state) {
        const ds = defaultState()
        Object.keys(ds).forEach(key => {
            state[key] = ds[key]
        })
    }
}

export const actions = {
    getItems ({ commit }) {
        commit('SET_STATUS', 'loading')
        return backend.getItems()
        .then(pets => {
            commit('SET_STATUS', 'success')
            commit('SET_ITEMS', pets)

            return pets
        })
        .catch(error => {
            commit('SET_STATUS', 'error')
            throw error
        })
    },

    reset ({ commit }) {
        commit('RESET')
    }
}