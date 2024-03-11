import { Provider } from "react-redux"
import { store } from "./redux"
import HomePage from "./pages/Home"

function App() {

  return (
    <>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </>
  )
}

export default App
