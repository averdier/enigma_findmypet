const defaultState = () => {
    const localState = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_NAME}-settings`))
    if (localState !== null) return localState
    else return {
        push: true,
        bluetooth: false
    }
}

export const namespaced = true

export const state = defaultState

export const mutations = {
    SET_PARAM (state, { key, value}) {
        state[key] = value
        localStorage.setItem(`${process.env.VUE_APP_NAME}-settings`, JSON.stringify(state))
    },

    RESET (state) {
        localStorage.removeItem(`${process.env.VUE_APP_NAME}-settings`)
        const initial = defaultState()
        Object.keys(initial).forEach(key => {
            state[key] = initial[key]
        })
    }
}

export const actions = {
    setParam ({ commit }, { key, value }) {
        commit('SET_PARAM', { key, value })
    },

    reset ({ commit }) {
        commit('RESET')
    }
}