import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState("");
  const [having, setHaving] = useState(1);
  useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
    }, []);

  function onChange(event) {
    setSelected(event.target.selectedOptions[0].value);
  }
  function calc(event) {
    setHaving(event.target.value);
  }
  return (
    <div>
      <h1>The Coins!</h1>
      {loading ? "Loading...":
        <div>
          <select onChange={onChange}>
            {coins.map((coin) => 
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>)
            }
          </select>
          <hr />
          i have : <input value={having} onChange={calc}></input>
          Can buy {having/selected}
        </div>
      }
    </div>
  )
}

export default App;
