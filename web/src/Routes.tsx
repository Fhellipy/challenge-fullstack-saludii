import Home from 'src/pages/HomePage/HomePage'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'

import { Route, Router } from '@redwoodjs/router'


export default function Routes() {
  return (
    <Router>
      <Route notfound page={NotFoundPage} />
      <Route path="/" page={Home} name="home" />
    </Router>
  )
}
