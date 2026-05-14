import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './providers/store/store'
import { router } from './providers/router/AppRouter'

export const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
