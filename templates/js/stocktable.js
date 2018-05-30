function stockTable(stock){
  url=`https://api.iextrading.com/1.0/stock/${stock}/stats`

  Plotly.d3.json(url, function(error, response) {

  if (error) return console.warn(error);

  // grab values from response json
  // company name
  let Stock_name= response.companyName;
  desc = "Company Name";
  addRow(desc, Stock_name);

  // company market cap
  let Stock_mrktcap=response.marketcap;
  // determine if market cap is in millions or billions
  Stock_mrktcap = DivideNumber(Stock_mrktcap);
  desc = "Market Cap";
  addRow(desc, Stock_mrktcap);
  // console.log(Stock_mrktcap);

  // Company Revenue
  let stock_revenue=response.revenue;
  stock_revenue=DivideNumber(stock_revenue);
  desc = "Revenue";
  addRow(desc,stock_revenue);
  // console.log(stock_revenue);

  // Company gross profit
  let stock_grossProfit = response.grossProfit;
  stock_grossProfit = DivideNumber(stock_grossProfit);
  desc = "Gross Profit";
  addRow(desc, stock_grossProfit);

  // Company EBIDTA
  let stock_ebitda = response.EBITDA;
  stock_ebitda = DivideNumber(stock_ebitda);
  desc = "EBIDTA";
  addRow(desc, stock_ebitda);
  
  // priceToSales
  let stock_priceToSales = response.priceToSales;
  stock_priceToSales = stock_priceToSales.toFixed(2);
  desc = "Price to Sales";
  addRow(desc, stock_priceToSales);

  // priceToBook
  let stock_priceToBook = response.priceToBook;
  stock_priceToBook = stock_priceToBook.toFixed(2);
  desc = "Price to Book";
  addRow(desc, stock_priceToBook);

  // institutionPercent
  let stock_institutionPercent = response.institutionPercent
  desc = "Percentage of Shares Owned by Institutional Investors";
  addRow(desc,stock_institutionPercent);

  // latestEPS
  let stock_latestEPS = response.latestEPS
  desc = "Latest EPS";
  addRow(desc, stock_latestEPS);

  // dividendRate (%)
  let stock_dividentRate = response.dividendRate
  desc = "Divident Rate (%)";
  addRow(desc, stock_dividentRate);

  // dividendYield
  let stock_dividendYield = response.dividendYield
  stock_dividendYield = stock_dividendYield.toFixed(2)
  desc = "Dividend Yield"
  addRow(desc, stock_dividendYield);

  // sharesOutstanding
  let stock_sharesout = response.sharesOutstanding
  desc = "Shares Outstanding";
  addRow(desc, stock_sharesout);
  })
};