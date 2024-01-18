import { useState } from 'react'
import Login_page from './screens/SignIn'
import SignUp from './screens/SignUp'
import { BrowserRouter, Route , Routes  } from 'react-router-dom'
import ForgotPassword from './screens/ForgotPassword'
import WelcomePage from './screens/WelcomePage'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<WelcomePage/>}/>
          <Route path='/SignUp'  element={<SignUp/>}/>
          <Route path='/SignIn'  element={<Login_page/>}/>
          <Route path='/ForgotPassword'  element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
