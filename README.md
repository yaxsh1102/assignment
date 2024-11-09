API Endpoints
1. Initialize Database
Endpoint: /initialize-database
Method: GET
2. Get Transactions
Endpoint: /api/v1/get-transactions
Method: GET
Query Parameters:
month: (Required) The month for which to fetch transaction data (e.g., 1 for January, 2 for February, etc.).
page: (Required) The page number for pagination.
perPage: (Required) The number of transactions to display per page.
3. Get Bar Graph Data
Endpoint: /api/v1/get-bar
Method: GET
Query Parameters:
month: (Required) The month for which to fetch bar graph data.
page: (Required) The page number for pagination.
perPage: (Required) The number of records to display per page.
4. Get Pie Chart Data
Endpoint: /api/v1/get-pie-chart
Method: GET
5. Get Combined Data
Endpoint: /api/v1/get-combined-data
Method: GET
Query Parameters:
month: (Required) The month for which to fetch combined data.
page: (Required) The page number for pagination.
perPage: (Required) The number of records to display per page.



Requirements:Replace the MONGODB_URL in index.js

Installation for frontend and backend :
```bash
 npm i
```

Running(for frontend):

```bash
npm start
```

Running(for backend):

```bash
npm run start
```


