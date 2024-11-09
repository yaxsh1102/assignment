const axios = require('axios');
const Product = require("../models/product.schema");

exports.getTransactions = async (req, res) => {

    try{
    const page = parseInt(req.query.page) || 1;
    const perPageItems = parseInt(req.query.perPage) || 10;
    const month = req.query.month || 3; 
    const searchQuery = req.query.search || "";
    
    const products = await getStatsForMonth(month);

    const filteredProducts = products.filter(product => {
        return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.price.toString().includes(searchQuery)
        );
    });

    const startIndex = (page - 1) * perPageItems;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + perPageItems);

    return res.status(200).json({
        success: true,
        data: paginatedProducts,
        totalItems: filteredProducts.length,
        message: "Data Fetched Successfully"
    });
}catch(err){
    console.log(err)
    return res.status(500).json({
        success:false ,
        message:"Error Occured"
    })
}
};


exports.getStatistics = async (req, res) => {
    try {
        const month = req.query.month;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: "No Month Selected"
            });
        }

        const sales = await getStatsForMonth(formattedMonth);

        const totalSaleAmount = sales.reduce((total, sale) => sale.sold ? total + sale.price : total, 0);
        const soldItemsCount = sales.filter(sale => sale.sold).length;
        const notSoldItemsCount = sales.filter(sale => !sale.sold).length;

        return res.status(200).json({
            success: true,
            message: "Data Fetched",
            totalSaleAmount,
            soldItemsCount,
            notSoldItemsCount
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getBarGraph = async (req, res) => {
    try {
        const month = req.query.month;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: "No Month Selected"
            });
        }

        const sales = await getStatsForMonth(formattedMonth);

        const ranges = [
            { min: 0, max: 100, count: 0 },
            { min: 101, max: 200, count: 0 },
            { min: 201, max: 300, count: 0 },
            { min: 301, max: 400, count: 0 },
            { min: 401, max: 500, count: 0 },
            { min: 501, max: 600, count: 0 },
            { min: 601, max: 700, count: 0 },
            { min: 701, max: 800, count: 0 },
            { min: 801, max: 900, count: 0 },
            { min: 900, max: 999999999, count: 0 }
        ];

        sales.forEach(element => {
            const rangeFound = ranges.find(r => element.price >= r.min && element.price <= r.max);
            if (rangeFound) {
                rangeFound.count += 1;
            }
        });

        const result = ranges.map(range => ({
            range: `${range.min}-${range.max}`,
            count: range.count
        }));

        return res.status(200).json({
            success: true,
            data: result,
            message: "Data Fetched"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error Occured"
        });
    }
};

exports.getPieChart = async (req, res) => {
    try {
        const month = req.query.month;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: "No Month Selected"
            });
        }

        const sales = await getStatsForMonth(formattedMonth);

        const categoryCount = {};

        sales.forEach(element => {
            if (categoryCount[element.category]) {
                categoryCount[element.category].count += 1;
            } else {
                categoryCount[element.category] = { count: 1 };
            }
        });

        const results = Object.entries(categoryCount).map(([category, count]) => ({
            category,
            count: count.count
        }));

        return res.status(200).json({
            success: true,
            data: results,
            message: "Data Fetched"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err
        });
    }
}


exports.getCombinedData = async (req, res) => {
    try {
        const month = req.query.month;

        const stats = await axios.get(`http://localhost:4000/api/v1/get-statistic?month=${month}`);
        const pie = await axios.get(`http://localhost:4000/api/v1/get-pie-chart?month=${month}`);
        const bar = await axios.get(`http://localhost:4000/api/v1/get-bar-graph?month=${month}`);
        console.log(stats.data)

        return res.status(200).json({
            success: true,
            message: "Data Fetched",
            stats: stats.data,
            pie: pie.data,
            bar: bar.data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

async function getStatsForMonth(formattedMonth) {
    const allProducts = await Product.find();

    const statsForMonth = allProducts.filter(product => {
        const saleMonth = new Date(product.dateOfSale).getMonth() + 1; 
        return saleMonth === parseInt(formattedMonth);
    });

    return statsForMonth;
}
