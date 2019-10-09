const PUSH_KEY = `${process.env.VUE_APP_PUSH_SERVER_KEY}`

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)

    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const defaultState = () => ({
    registration: null,
    subscription: null,
    status: ''
})

export const namespaced = true

export const state = defaultState

export const mutations = {
    SET_REGISTRATION (state, registration) { state.registration = registration },
    SET_SUBSCRIPTION (state, subscription) { state.subscription = subscription },
    SET_STATUS (state, status) { state.status = status },
    RESET (state) {
        const initial = defaultState()
        Object.keys(initial).forEach(key => {
            state[key] = initial[key]
        })
    }
}

export const actions = {
    register ({ commit }, registration) { 
        commit('SET_REGISTRATION', registration)
    },

    checkSubscription ({ commit, state }) {
        if (Notification.permission === 'denied') throw 'Notification denied'
        if (state.registration === null) throw 'Worker not found'
        if (state.registration.pushManager === undefined) throw 'Push manager not found'
        return state.registration.pushManager.getSubscription()
        .then(subscription => {
            commit('SET_SUBSCRIPTION', subscription)
            return subscription
        })
    },

    subscribe ({ commit, dispatch, state}) {
        commit('SET_STATUS', 'loading')

        return dispatch('checkSubscription')
        .then(subscription => {
            if (subscription !== null) {
                commit('SET_STATUS', 'success')
                return {
                    subscription: subscription,
                    is_active: true
                }
            }
            else {
                const applicationServerKey = urlB64ToUint8Array(PUSH_KEY)

                return state.registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey
                })
                .then(subscription => {
                    commit('SET_SUBSCRIPTION', subscription)
                    commit('SET_STATUS', 'success')
                    return {
                        subscription: subscription,
                        is_active: true
                    }
                })
            }
        })
        .catch (error => {
            commit('SET_STATUS', 'error')
            dispatch('alert/add', { type: 'error', message: `Unable to subscribe (${error.message})`}, { root: true })
            throw error
        })
    },

    unsubscribe ({ commit, dispatch }) {
        commit('SET_STATUS', 'loading')

        return dispatch('checkSubscription')
        .then(subscription => {
            if (subscription !== null) subscription.unsubscribe()
            commit('SET_SUBSCRIPTION', null)
            commit('SET_STATUS', 'success')

            return {
                subscription: subscription,
                is_active: false
            }
        })
        .catch(error => {
            commit('SET_STATUS', 'error')
            dispatch('alert/add', { type: 'error', message: `Unable to unsubscribe (${error.message})`}, { root: true })
            throw error
        })
    },

    reset ({ commit }) { commit('RESET') }
}

export const getters = {
    registered: (state) => { return state.registration !== null },
    canSubscribe: (state) => { return state.registration !== null && state.registration.pushManager !== undefined },
    subscribed: (state) =>  { return state.subscription !== null }
}
