const express = require("express")

const app = express()
const Product = require('./models/product.schema'); 
const mongoose = require("mongoose")
const axios = require("axios");
const productsRoutes = require("./routes/products.routes");
const cors = require("cors")

app.use(express.json())
app.use(cors())




app.get('/initialize-database', async (req, res) => {
    try {
      const existingData = await Product.findOne();
      if (existingData) {
        return res.status(200).send('Database is already initialized with data.');
      }
  
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const products = response.data;
  
      await Product.insertMany(products);
  
      res.status(200).send('Database Initialzed');
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:error , });
    }
  });

  app.use("/api/v1" , productsRoutes )





async function connectDb(){
  try{
    await mongoose.connect("mongodb://127.0.0.1:27017/test" ,{
        
    })

}catch(err){
    console.log(err)

}
}
connectDb()




  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
  