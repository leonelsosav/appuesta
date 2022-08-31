import React, { useState, useEffect } from 'react';
import BetForm from "./components/UI/BetForm";
import DAO from "./components/Logic/DAO";
import './App.css';

function App() {
  var FI = new Date().toLocaleDateString().split("/");
  String(FI[1]).length === 1 && (FI[1] = "0" + FI[1])
  String(FI[0]).length === 1 && (FI[0] = "0" + FI[0])
  const [showForm, setShowForm] = useState(false);
  const [bets, setBets] = useState([]);
  const [dateFilter, setDateFilter] = useState(`${FI[2]}-${FI[1]}-${FI[0]}`);
  const [opcionesLigas, setOpcionesLigas] = useState([]);

  const { getWhere, getById, createItem, updateItem } = DAO();

  useEffect(() => {
    const getLigas = async () => {
      const ligas = await getById("Ligas", "Ligas");
      setOpcionesLigas(ligas.Ligas);
    }
    getLigas();
  }, []);

  useEffect(() => {
    const getBets = async () => {
      const betsRetrieved = await getWhere("Bets", "Date", "==", dateFilter);
      betsRetrieved.length > 1 && betsRetrieved.sort((a, b) => (a.Time > b.Time) ? 1 : -1);
      setBets(betsRetrieved);
    }
    getBets();
  }, [dateFilter])

  const SaveBet = async (bet) => {
    try {
      const newBet = await createItem("Bets", bet);
      setShowForm(false);
      if (!opcionesLigas.includes(bet.League)) {
        let newOpcionesLigas = [...opcionesLigas, bet.League];
        await updateItem("Ligas", "Ligas", { Ligas: newOpcionesLigas });
        setOpcionesLigas(newOpcionesLigas);
      }
      if (newBet.Date === dateFilter) {
        const newBets = bets.length > 0 ? [...bets, newBet] : [newBet];
        newBets.sort((a, b) => (a.Time > b.Time) ? 1 : -1);
        setBets(newBets);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ChangeResult = async (bet, winnerValue) => {
    try {
      const newBet = { ...bet, Winner: winnerValue };
      await updateItem("Bets", bet.Id, newBet);
      const newBets = [...bets];
      newBets.splice(newBets.indexOf(bet), 1, newBet);
      setBets(newBets);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    < >
      <div className="container">
        <div className="form-container">
          <button className='new-bet-button' onClick={() => setShowForm(!showForm)}>New bet</button>
          {showForm && <BetForm opcionesLigas={opcionesLigas} saveBetFn={SaveBet}></BetForm>}
        </div>
        <div className="bets-container">
          <input type="date" name="dateFilter" id="dateFilter" className='dateFilter' value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          {bets.length > 0 ?
            <>
              <h1 className="stats">Total apostado: ${bets.reduce((p, c) => p + c.Amount, 0).toFixed(2)}</h1>
              <h1 className="stats">Total ganado: ${bets.filter(v => v.Winner).reduce((p, c) => p + c.Profit, 0).toFixed(2)}</h1>
              <h1 className="stats">Profit del dia: ${(bets.filter(v => v.Winner).reduce((p, c) => p + c.Profit, 0) - bets.reduce((p, c) => p + c.Amount, 0)).toFixed(2)}</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Equipo 1</th>
                    <th>Equipo 2</th>
                    <th>Apuesta</th>
                    <th>Momio</th>
                    <th>Cantidad</th>
                    <th>Ganancia</th>
                    <th>Ganador</th>
                    <th>Liga</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet, idx) => (
                    <tr key={idx} className={bet.Winner ? "ganador" : "perdedor"}>
                      <td>{bet.Date}</td>
                      <td>{bet.Time}</td>
                      <td>{bet.Team1}</td>
                      <td>{bet.Team2}</td>
                      <td>{bet.Bet}</td>
                      <td>{bet.Odd}</td>
                      <td>${bet.Amount}</td>
                      <td>${bet.Winner ? bet.Profit : 0}</td>
                      <td><input type="checkbox" name="resultCheck" id="resultCheck" checked={bet.Winner} onChange={(e) => ChangeResult(bet, e.target.checked)} /></td>
                      <td>{bet.League}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
            :
            <div className="no-bets">No hay apuestas</div>}
        </div>
      </div>
    </>
  );
}

export default App;
