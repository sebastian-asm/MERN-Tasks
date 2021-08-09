import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projects/Proyectos';
import ProyectoState from './context/projects/proyectoState';
import RutaPrivada from './components/routes/RutaPrivada';
import TareaState from './context/tasks/tareaState';

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
