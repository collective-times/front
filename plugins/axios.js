export default function({$axios, store}) {
  $axios.onRequest(config => {
    if (store.state.accessToken) {
      config.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken;
    }
  })
}