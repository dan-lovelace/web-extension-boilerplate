import { LocationProvider, Router, Route } from "preact-iso";

import { ROUTES } from "./lib/routes";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
