import React, { useState, useEffect } from 'react'

const BetForm = ({ saveBetFn, opcionesLigas }) => {
    const [bet, setBet] = useState({
        Date: '',
        Time: '',
        Team1: '',
        Team2: '',
        Bet: '',
        Winner: true,
        Odd: '0',
        Profit: 0,
        Amount: 0,
        League: ''
    });
    const [leagueValue, setLeagueValue] = useState('Otro');
    const [showLeagueTxt, setShowLeagueTxt] = useState(false);
    const [leagueValueTxt, setLeagueValueTxt] = useState('');

    useEffect(() => {
        leagueValue === "Otro" ? setShowLeagueTxt(true) : setShowLeagueTxt(false);
    }, [leagueValue])

    const handleSubmit = (e) => {
        e.preventDefault();

        //check every field is filled
        if (bet.Date === '' || bet.Time === '' || bet.Team1 === '' || bet.Team2 === '' || bet.Bet === '' ||
            (bet.Odd > -100 && bet.Odd < 100) || bet.Amount <= 0 || (leagueValue === 'Otro' && leagueValueTxt === '')) {
            alert('Please fill in all fields');
            return;
        }
        //check if Amount is a number
        if (isNaN(bet.Amount)) {
            alert('Please enter a number for the amount');
            return;
        }
        //check if odd is a number
        if (isNaN(bet.Odd)) {
            alert('Please enter a number for the odd');
            return;
        }
        //check if profit is a number
        if (isNaN(bet.Profit)) {
            alert('Please enter a number for the profit');
            return;
        }

        saveBetFn({ ...bet, 
            Odd: Number(bet.Odd), 
            Profit: bet.Odd > 0 ? Number((bet.Amount * bet.Odd / 100 + bet.Amount).toFixed(2)) : Number((100 / Math.abs(bet.Odd) * bet.Amount + bet.Amount).toFixed(2)),
            League: leagueValue === 'Otro' ? leagueValueTxt : leagueValue
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="Date">Fecha:</label>
                <input className='betDate' type="date" id="Date" name="Date" value={bet.Date} onChange={(e) => setBet({ ...bet, Date: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Time">Hora:</label>
                <input className='betTime' type="time" id="Date" name="Date" value={bet.Time} onChange={(e) => setBet({ ...bet, Time: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Team 1">Equipo 1:</label>
                <input type="text" id="Team 1" name="Team 1" value={bet.Team1} onChange={(e) => setBet({ ...bet, Team1: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Team 2">Equipo 2:</label>
                <input type="text" id="Team 2" name="Team 2" value={bet.Team2} onChange={(e) => setBet({ ...bet, Team2: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Bet">Apuesta:</label>
                <input type="text" id="Bet" name="Bet" value={bet.Bet} onChange={(e) => setBet({ ...bet, Bet: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Odd">Momio:</label>
                <input type="text" id="Odd" name="Odd" value={bet.Odd} onChange={(e) => setBet({ ...bet, Odd: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="Amount">Cantidad apostada: $</label>
                <input type="number" id="Amount" name="Amount" value={bet.Amount} onChange={(e) => setBet({ ...bet, Amount: Number(e.target.value) })} />
            </div>
            <div className="form-group">
                <label htmlFor="selectLeague">Liga:</label>
                <select name="selectLeague" id="selectLeague" value={leagueValue} onChange={e => setLeagueValue(e.target.value)}>
                    {opcionesLigas.map((liga, idx) => <option key={idx} value={liga}>{liga}</option>)}
                    <option value={"Otro"}>Otro</option>
                </select>
                {showLeagueTxt && <input type="text" name="leagueName" id="leagueName" value={leagueValueTxt} onChange={e => setLeagueValueTxt(e.target.value)} />}
            </div>
            <div className="form-group">
                <button className='submit' type="submit">Guardar</button>
            </div>
        </form>
    )
}

export default BetForm