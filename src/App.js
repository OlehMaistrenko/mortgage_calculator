import "./styles/App.css";
import Nav from "./components/Nav";
import Banks from "./pages/Banks";
import { getBanks } from "./api/rest/bank";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Calculatotr from "./pages/Calculator";

function App() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    updateBanksList();
  }, []);

  const updateBanksList = () => {
    getBanks().then((resp) => {
      setBanks(resp.data);
      console.log(resp.data);
    });
  };
  return (
    <div className='App'>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Navigate replace to='/banks' />}></Route>
        <Route path='/banks' element={<Banks banks={banks} />} />
        <Route
          path='/calculator'
          element={
            <Calculatotr banks={banks} updateBanksList={updateBanksList} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
