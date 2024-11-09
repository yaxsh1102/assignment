import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table() {
  const titles = ["ID", "Title", "Description", "Price", "Category", "Sold", "Image"];
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
    { name: "December", number: 12 },
  ];

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [month, setSelectedMonth] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/get-transactions?month=${month}&page=${page}&perPage=10&search=${searchTerm}`
      )
      .then((resp) => {
        setProducts(resp.data.data);
        console.log(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, searchTerm, page]);

  const handleMonthChange = (event) => {
    const selectedMonthNumber = event.target.value;
    setSelectedMonth(selectedMonthNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-[80%] h-auto flex flex-col justify-center items-center mt-12">
      <div className="w-full flex justify-center items-center">
        <div className="rounded-full h-40 w-40 bg-slate-400 flex justify-center items-center">
          <p className="text-white">Transaction Table</p>
        </div>
      </div>

      <div className="w-full flex justify-between mt-4">
        <div className="w-44 flex justify-center items-center ">
          <input
            type="text"
            placeholder="Search Transaction"
            className="w-full h-10 px-4 rounded-3xl outline-none bg-[#faf266]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-44">
          <select
            className="w-full h-10 px-4 rounded-3xl text-center outline-none bg-[#faf266]"
            value={month}
            onChange={handleMonthChange}
          >
            <option value="" defaultValue={"March"}>Select Month</option>
            {months.map((month) => (
              <option key={month.number} value={month.number}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full mt-4 rounded-3xl overflow-hidden border-2 border-black">
        <div className="grid grid-cols-7 bg-[#faf266]">
          {titles.map((title, index) => (
            <div key={index} className="p-2 text-center font-semibold border-b-2 border-r-2 border-black last:border-r-0">
              {title}
            </div>
          ))}
        </div>
        
        <div className="bg-[#faf266]">
          {products.length > 0 && products.map((product, index) => (
            <div key={index} className="grid grid-cols-7 border-b-2 border-black last:border-b-0">
              <div className="p-2 text-center border-r-2 border-black">{product.id}</div>
              <div className="p-2 text-center border-r-2 border-black">{product.title}</div>
              <div className="p-2 text-center border-r-2 border-black">
                {product.description.length > 24 ? (product.description.substring(0, 24) + "...") : (product.description)}
              </div>
              <div className="p-2 text-center border-r-2 border-black">{product.price}</div>
              <div className="p-2 text-center border-r-2 border-black">{product.category}</div>
              <div className="p-2 text-center border-r-2 border-black">{product.sold ? "Yes" : "No"}</div>
              <div className="p-2 text-center flex justify-center items-center">
                <img src={product.image} alt={product.title} className="h-10 w-10 object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-4 px-4">
        <p className="text-sm font-medium">Page No: {page}</p>
        <div className="flex gap-x-4">
          <button 
            className="px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-400 transition-colors"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors"
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
        <p className="text-sm font-medium">Per Page: 10</p>
      </div>
    </div>
  );
}

export default Table;