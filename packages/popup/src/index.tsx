import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import "./style.css";

import { ROUTES } from "./lib/routes";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route default component={NotFoundPage} />
      </Router>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app") as HTMLElement);
