import createPersistedState from "vuex-persistedstate";

export default ({store}) => {
    createPersistedState()(store); // vuex plugins can be connected to store, even after creation
};