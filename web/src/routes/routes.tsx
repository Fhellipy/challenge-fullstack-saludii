import { Home } from '@pages/home'
import { NotFoundPage } from '@pages/not-found-page'

import { Route, Router } from '@redwoodjs/router'

export default function Routes() {
  return (
    <Router>
      <Route path="/" page={Home} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}
