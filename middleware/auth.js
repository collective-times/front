export default function ({ store, error }) {
  if (!store.state.accessToken) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}