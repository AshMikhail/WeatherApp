import { Route, Routes } from 'react-router-dom';
import '../styles/App.css'

import Weathergeo from './Weathergeo';
import Weekweather from './Weekweather';



function App() {
  const PLACES = [
    { name: "Moscow", verbname: "Москва" },
    { name: "Kiev", verbname: "Киев" },
    { name: "Minsk", verbname: "Минск" },
    { name: "New York", verbname: "Нью Йорк" },
    { name: 'Novosibirsk', verbname: "Новосибирск" },
  ];
  return (
    <div className="App">
      <nav>
          <formgroup>
              <form className="form" action="/">
                  <button>Главная страница</button>
              </form>
              {PLACES.map((name) =>

                  <form className="form" key={name.name} action={`/week/${name.name}`}>
                      <button>{name.verbname}</button>
                  </form>
              )}
          </formgroup>
      </nav>
      <Routes>
        <Route path='/' Component={Weathergeo}/>
        <Route exaxt path={'/week/:name'} Component={Weekweather}/>
      </Routes>
    </div>
  );
}

export default App;
