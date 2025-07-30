
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './components/AppLayout'
import Body from './components/Body'
import CreateNote from './components/CreateNote'
import AllNotes from './components/AllNotes'
import AuthForm from './components/AuthForm'
import ProtectedRoute from './components/ProtectedRoute'

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
          element:(
          <ProtectedRoute>
            <Body />
          </ProtectedRoute>
        ),
        },
        {
          path:"/createnote",
          element:(
          <ProtectedRoute>
            <CreateNote/>
          </ProtectedRoute>
        ),
        },
        {
          path:"/allnotes",
          element:(
          <ProtectedRoute>
            <AllNotes/>
          </ProtectedRoute>
        ),
        }

      ],
    }
  ])

  return <RouterProvider router={appRouter}/>


}

export default App
