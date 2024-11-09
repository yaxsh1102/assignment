import logo from './logo.svg';
import './index.css';
import Table from './components/Table';
import MonthlyStatistics from './components/MonthlyStatistics';
import { useState , useEffect } from 'react';
import BarCharts from './components/BarChart';
import axios from "axios"


function App() {

  const [data , setData]  = useState()


 



 
    return (<div className=" w-full flex flex-col justify-between items-center gap-y-24">

      <Table ></Table>
      <MonthlyStatistics ></MonthlyStatistics>
      <BarCharts  ></BarCharts>
      
      
      
    </div>
  );
}

export default App;
