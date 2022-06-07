import React, { useEffect, useState} from 'react';
import './App.css';
import Axios from "axios";



function App() {
  const [addStockName, setAddStockName] = useState('');
  const [addStockSymbol, setAddStockSymbol] = useState('');

  const [stockNameList, setStockNameList] = useState([]);

  const [stockName, setStockName] = useState('');
  const [transcType, setTranscType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [transcDate, setTranscDate] = useState('');
  const [stockList, setStockList] = useState([]);
  const [indivStockName, setIndivStockName] = useState('');

  // for overall summay
  const [soldAmounts, setSoldAmounts] = useState('');
  const [totalUnits, setTotalUnits] = useState('');
  const [overAllProfits, setOverAllProfits] = useState('');
  const [totalInvests, setTotalInvests] = useState('');
  const [currentAmounts, setCurrentAmounts] = useState('');
  const [soldQuantitys, setSoldQuantitys] = useState('');
  const [remnQuantitys, setRemnQuantitys] = useState('');
  const [avgSellPrices, setAvgSellPrices] = useState('');
  const [avgBuyPrices, setAvgBuyPrices] = useState('');
  
  // for individuals
  const [indivTotalUnits, setIndivTotalUnits] = useState('');
  const [indivSoldAmounts, setIndivSoldAmounts] = useState('');
  const [indivOverAllProfits, setIndivOverAllProfits] = useState('');
  const [indivTotalInvests, setIndivTotalInvests] = useState('');
  const [indivCurrentAmounts, setIndivCurrentAmounts] = useState('');
  const [indivSoldQuantitys, setindivSoldQuantitys] = useState('');
  const [indivRemnQuantitys, setIndivRemnQuantitys] = useState('');
  const [indivAvgBuyPrices, setIndivAvgBuyPrices] = useState('');
  const [indivAvgSellPrices, setIndivAvgSellPrices] = useState('');

  // for overall summary
  let soldAmount=0;
  let totalUnit=0;
  let overAllProfit=0;
  let totalInvest=0;
  let currentAmount=0;  
  let soldQuantity=0;
  let remnQuantity=0;
  let avgSellPrice=0;
  let avgBuyPrice=0;

  // for individual summary
  let indivSoldAmount=0;
  let indivTotalUnit=0;
  let indivOverAllProfit=0;
  let indivTotalInvest=0;
  let indivCurrentAmount=0;
  let indivSoldQuantity=0;
  let indivRemnQuantity=0;
  let indivAvgBuyPrice=0;
  let indivAvgSellPrice=0;



  // Adding Stock symbols to DB
  const addStockSymbols = () =>{
    Axios.post('http://localhost:3001/api/insertStockSymbol',{
      addStockName:addStockName,
      addStockSymbol:addStockSymbol,   
    });
    setAddStockName('');
    setAddStockSymbol('');
    getStockNameDetails();
  }
  
  
  // Adding Stocks to DB
  const addStocks = () =>{
    Axios.post('http://localhost:3001/api/insert',{
      stockName:stockName,
      transcType:transcType,
      quantity:quantity,
      amount:amount,
      transcDate:transcDate,     
    });
    setAmount('');
    setQuantity('');
    setStockName('');
    setTranscDate('');
    setTranscType('');
  }

  // Getting Stock sYmbol Names
  const getStockNameDetails =() =>{
    Axios.get('http://localhost:3001/api/getAllStockNames').then((response) => {
      setStockNameList(response.data)
    })
  } 

  // Getting stock details
  const getDetails=() => {
    Axios.get('http://localhost:3001/api/getAll').then((response) => {
      setStockList(response.data) 
    })
};


  // console.log(stockList);
  async function getSummaryOfStock(stockList){
    stockList.map((val) => {
      if(val.transcType==="Buy"){
        totalUnit = totalUnit + parseFloat(val.quantity);
        totalInvest =totalInvest+ parseFloat(val.quantity) *parseFloat(val.amount);
        avgBuyPrice = avgBuyPrice + parseFloat(val.quantity) *parseFloat(val.amount);
      
      }else if(val.transcType ==="Sell"){
        avgSellPrice = avgSellPrice + (parseFloat(val.quantity) * parseFloat(val.amount));
        soldQuantity = soldQuantity + parseFloat(val.quantity);
        soldAmount = soldAmount + parseFloat(val.quantity) * parseFloat(val.amount);
      } return;
    });
    remnQuantity = totalUnit - soldQuantity;
    avgBuyPrice = avgBuyPrice/totalUnit;
    avgSellPrice = avgSellPrice/soldQuantity;
    overAllProfit = (soldQuantity* avgSellPrice)- (soldQuantity*avgBuyPrice);
    currentAmount = remnQuantity*avgBuyPrice;

    setTotalUnits(totalUnit);
    setRemnQuantitys(remnQuantity);
    setSoldQuantitys(soldQuantity);
    setCurrentAmounts(currentAmount);
    setTotalInvests(totalInvest);
    setOverAllProfits(overAllProfit);
    setSoldAmounts(soldAmount);
    setAvgBuyPrices(avgBuyPrice);
    setAvgSellPrices(avgSellPrice);
  };
  // get all the details
  useEffect(() => {
    getStockNameDetails();    
    getDetails();
    getSummaryOfStock(stockList);
  }, [stockList]);
 

  // Get Individual Details
  const getIndividualDetails= (sName)=>{
    setIndivStockName(sName)
    stockList.map((val) => {
      if(val.stockName===sName){
        if(val.transcType==="Buy"){
          indivTotalUnit = indivTotalUnit + parseFloat(val.quantity);
          indivTotalInvest =indivTotalInvest+ parseFloat(val.quantity) *parseFloat(val.amount);
          indivAvgBuyPrice = indivAvgBuyPrice + parseFloat(val.quantity)*parseFloat(val.amount)
        
        }else if(val.transcType ==="Sell"){
          indivSoldQuantity = indivSoldQuantity + parseFloat(val.quantity);
          indivSoldAmount = indivSoldAmount + parseFloat(val.quantity) * parseFloat(val.amount);
          indivAvgSellPrice = indivAvgSellPrice + parseFloat(val.quantity)*parseFloat(val.amount);
        }
      }
  })
  indivRemnQuantity = indivTotalUnit - indivSoldQuantity;
  indivAvgBuyPrice = indivAvgBuyPrice/indivTotalUnit;
  indivAvgSellPrice = indivAvgSellPrice/indivSoldQuantity;
  indivOverAllProfit = (indivSoldQuantity* indivAvgSellPrice)- (indivSoldQuantity*indivAvgBuyPrice);
  indivCurrentAmount = indivRemnQuantity*indivAvgBuyPrice;
  
  setIndivTotalUnits(indivTotalUnit);
  setIndivRemnQuantitys(indivRemnQuantity);
  setindivSoldQuantitys(indivSoldQuantity);
  setIndivCurrentAmounts(indivCurrentAmount);
  setIndivTotalInvests(indivTotalInvest);
  setIndivOverAllProfits(indivOverAllProfit);
  setIndivSoldAmounts(indivSoldAmount);
  setIndivAvgBuyPrices(indivAvgBuyPrice);
  setIndivAvgSellPrices(indivAvgSellPrice);
  }

  return (
  <>
    <div className='container'>
     <div className='header'>
       <h1>Portfolio Management</h1>
     </div>

     {/* xxxxxxxxxxxxxxxxxxxxxx Question 1 && 2 xxxxxxxxxxxxxxxxxxxxx */}
     <div className='subContainer'>
       
         {/* -------------question 2: Adding Stock Name && Transaction Details---------- */}
       <div className='first'>
         <div className='forAddingStockSymbols'>           
          <h3>Add New Stock Name</h3>
           <label htmlFor='forStockName'>Enter Stock Name</label>
           <input type="text" placeholder=" Eg: SBI bank of Nepal" id="forStockName"
           value={addStockName} onChange={(e) => {
            setAddStockName(e.target.value);
          }} /><br/>
           <label htmlFor='forStockSymbol'>Enter Stock Symbol</label>
           <input type="text" placeholder=" Eg: SBI" id="forStockSymbol"
           value={addStockSymbol} onChange={(e) => {
            setAddStockSymbol(e.target.value.toUpperCase());
          }}  /><br/>

           <button id='addStockName' onClick={addStockSymbols}>Add stock Name</button>
         </div>
         
         <div className='forAddingTranscDetails'>
           <h3>Add Transacion Details</h3>
            <label htmlFor='stock'>Select Stock:</label>
            <select name="stock" id="stock" value={stockName} onChange={(e) => {
          setStockName(e.target.value);
        }} >
              <option value="">Select Stock</option>
              {
                 stockNameList.map((val) => {
                  return(                       
                <option value={val.stockSymbol}>({val.stockSymbol}) {val.stockName}</option>
                  )
                })
              }
            </select><br/>
            <label htmlFor='numberOfStocks'>Enter Number of Stocks:</label>
            <input type="number" value={quantity} id='numberOfStocks'  placeholder=' Number of stocks' 
            onChange={(e) => {
              setQuantity(e.target.value);
            }} /><br/>

            <label htmlFor='buySellOptn'>Buy/Sell :  </label>
            <select name="option" value={transcType} id="buySellOptn" onChange={(e) => {
          setTranscType(e.target.value);
        }}>
              <option value="">Select Buy/sell</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select><br/>

            <label htmlFor='pricePerUnit'>Enter Price Per Unit:</label>
            <input type="number" value={amount} id='pricePerUnit' placeholder=' Price Per Unit'
            onChange={(e) => {
              setAmount(e.target.value);
            }} /><br/>

            <label htmlFor='transcDate'>Transacion Date:</label>
            <input type="date" id='transcDate' value={transcDate}
            onChange={(e) => {
              setTranscDate(e.target.value);
            }} /><br/>

            <button id='addStock' onClick={addStocks}>Add Stock</button>
         </div>
        </div>

         {/* --------- question 1: List all the stocks----------- */}
       <div className='second'>          
          <div className='forListStocks'>
          <h3>Stocks List</h3>
            <table>
              <thead>
                <tr>
                  <th>S.N.</th>
                  <th>Stock Name</th>
                  <th>Transaction Type</th>
                  <th>Quantity</th>
                  <th>Amount (Per Unit.)</th>
                  <th>Transacion Date</th>
                </tr>
              </thead>
              {
              stockList.map((val) => {
                return( 
                  <tbody>
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.stockName}</td>
                      <td>{val.transcType}</td>
                      <td>{val.quantity}</td>
                      <td>{val.amount}</td>
                      <td>{val.transacDate}</td>
                    </tr>
                  </tbody>
                )
              })
            }
            </table>
          </div>
       </div>
     </div>

{/* xxxxxxxxxxxxxxxxxxxxx question 3 && 4  xxxxxxxxxxxxxxxxxxxxxxxx */}

     <div className='subContainer1'> 
     {/* --------question 4 : Individual Details--------     */}
        <div className='third'>
          <div className='forSummaryOfIndivStock'>            
            <h2>Summary Of Individual Stocks</h2>
            <label>Stock Name: {indivStockName}</label> 
            <select name="stock" id="stock" onChange={(e) => {
          getIndividualDetails(e.target.value);
        }}>
              <option value="">Select Stock</option>
              {
                 stockNameList.map((val) => {
                  return(                       
                <option value={val.stockSymbol}>({val.stockSymbol}) {val.stockName}</option>
                  )
                })
              }
            </select><br/>
            
          </div>
          <div className='individualDetails'>
            <table>
            <tr>
              <th>Total Units:</th>
              <td>{indivTotalUnits}</td>
            </tr>
            <tr>
              <th>Sold Units:</th>
              <td>{indivSoldQuantitys}</td>
            </tr>
            <tr>
              <th>Remaining Units:</th>
              <td>{indivRemnQuantitys}</td>
            </tr>
            <tr>
              <th>Average Buy Price:</th>
              <td>{indivAvgBuyPrices}</td>
            </tr>
            <tr>
              <th>Average Sell Price:</th>
              <td>{indivAvgSellPrices}</td>
            </tr>
            <tr>
              <th>Total Investment:</th>
              <td>Rs.{indivTotalInvests} /-</td>
            </tr>
            <tr>
              <th>Sold Amount:</th>
              <td>Rs.{indivSoldAmounts} /-</td>
            </tr>
            <tr>
              <th>Over all Profi/Loss:</th>
              <td>Rs.{indivOverAllProfits} /-</td>
            </tr>
            <tr>
              <th>Current Amount:</th>
              <td>Rs.{indivCurrentAmounts} /-</td>
            </tr>
            </table>
          </div>
        </div>

        {/* ----------question 3: For Overall Summary----------- */}
        <div className='fourth'>
          <div className='forOverallSummary'>             
            <h3>Overall Dashboard Summary</h3>
            <table>
            <tr>
              <th>Total Units:</th>
              <td>{totalUnits}</td>
            </tr>
            <tr>
              <th>Sold Unit:</th>
              <td>{soldQuantitys}</td>
            </tr>
            <tr>
              <th>Remaining Unit:</th>
              <td>{remnQuantitys}</td>
            </tr>
            <tr>
              <th>Average Buy Price:</th>
              <td>{avgBuyPrices}</td>
            </tr>  
            <tr>
              <th>Average Sell Price: </th>
              <td>{avgSellPrices}</td>
            </tr>             
            <tr>
              <th>Total Investment:</th>
              <td>Rs. {totalInvests}</td>
            </tr>
            <tr>
              <th>Sold Amount:</th>
              <td>Rs.{soldAmounts}</td>
            </tr>
            <tr>
              <th>Over all Profit/Loss:</th>
              <td>Rs.{overAllProfits}</td>
            </tr>
            <tr>
              <th>Current Amount:</th>
              <td>Rs.{currentAmounts}</td>
            </tr>
            </table>
          </div>
        </div>
     </div>
     <div className='footer'>
       <footer>This is the footer &copy; All Right Reserved</footer>
     </div>
    </div>
  </>
  );
}

export default App;
