import React, { useState, useEffect } from 'react';
import axios from "axios";

const MonthlyStatistics = () => {
  const [month, setMonth] = useState(6);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    soldItemsCount: 0,
    notSoldItemsCount: 0
  });

  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 }
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/get-statistic?month=${month}`)
      .then((resp) => {
        console.log("API Response:", resp);
        const data = {
          totalSaleAmount: resp.data.totalSaleAmount,
          soldItemsCount: resp.data.soldItemsCount,
          notSoldItemsCount: resp.data.notSoldItemsCount
        };
        console.log("Mapped Data:", data);
        setStatistics(data);
      })
      .catch((error) => {
        console.error("Error fetching statistics", error);
      });
  }, [month]);

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value);
    setMonth(selectedMonth);

    // Setting mock statistics based on the month selected
    setStatistics({
      totalSaleAmount: selectedMonth * 1000,
      soldItemsCount: selectedMonth * 30,
      notSoldItemsCount: 100 - selectedMonth * 10
    });
  };

  const currentMonthName = months[month - 1]?.name || "Unknown Month";

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-slate-600 w-[60%] flex flex-col gap-y-4 mx-auto p-4 rounded-lg">
        <p className="text-white text-center text-lg font-semibold">Statistics - {currentMonthName}</p>

        <select
          className="bg-gray-300 p-2 rounded-lg outline-none w-[30%] mx-auto"
          value={month}
          onChange={handleMonthChange}
        >
          {months.map((monthItem) => (
            <option key={monthItem.number} value={monthItem.number}>
              {monthItem.name}
            </option>
          ))}
        </select>

        <div className="bg-yellow-200 w-[30%] rounded-2xl flex flex-col gap-y-4 p-4 mx-auto text-center">
          <div className='flex justify-between'>
            <p className="font-semibold">Total Sale</p>
            <p>{statistics.totalSaleAmount}</p>
          </div>
          <div className='flex justify-between'>
            <p className="font-semibold">Total Sold Items</p>
            <p>{statistics.soldItemsCount}</p>
          </div>
          <div className='flex justify-between'>
            <p className="font-semibold">Total Not Sold Items</p>
            <p>{statistics.notSoldItemsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyStatistics;
