import backend from '@/services/backend'

const defaultState = () => ({
    status: '',
    createStatus: '',
    items: []
})

export const namespaced = true
export const state = defaultState

export const mutations = {
    SET_STATUS (state, status) { state.status = status },
    SET_CREATE_STATUS (state, status) { state.createStatus = status },
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
        return backend.getPets()
        .then(data => {
            commit('SET_STATUS', 'success')
            commit('SET_ITEMS', data.pets)

            return data
        })
        .catch(error => {
            commit('SET_STATUS', 'error')
            throw error
        })
    },

    createItem ({ commit, state }, payload) {
        commit('SET_CREATE_STATUS', 'loading')
        return backend.createPet(payload)
        .then(pet => {
            commit('SET_CREATE_STATUS', 'success')
            state.items.push(pet)
            return pet
        })
        .catch(error => {
            commit('SET_CREATE_STATUS', 'error')
            throw error
        })
    },

    reset ({ commit }) {
        commit('RESET')
    }
}

export const getters = {
    getItem: (state) => (id) => {
        return state.items.find(pet => pet.id === id)
    }
}