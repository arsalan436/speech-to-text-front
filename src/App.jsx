
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './components/AppLayout'
import Body from './components/Body'
import CreateNote from './components/CreateNote'
import AllNotes from './components/AllNotes'
import AuthForm from './components/AuthForm'

function App() {
  
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      children:[
        {
          path:"/",
          element:<AuthForm/>
        },
        {
          path:"/body",
          element:<Body/>
        },
        {
          path:"/createnote",
          element:<CreateNote/>
        },
        {
          path:"/allnotes",
          element:<AllNotes/>
        }

      ],
    }
  ])

  return <RouterProvider router={appRouter}/>


}

export default App
