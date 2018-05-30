
function unpack(rows, index) {  
  return rows.map(function(row) {
    return row[index];
  });
}

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  Plotly.d3.event.preventDefault();

  // Select the input value from the form
  var stock = Plotly.d3.select("#stockInput").node().value;
  console.log(stock);

  // clear the input value
  Plotly.d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
  News(stock);
  stockTable(stock)
  clearTable();
  stockHistory(stock);
  console.log('stock',stock);
      urlhistory = `http://localhost:5000/stocks/${stock}`;

}

function buildPlot(stock) {

  var url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
  var urlSP = `https://api.iextrading.com/1.0/stock/spy/batch?types=quote,news,chart&range=2y&last=1`;
  console.log(url)
   //Graph 1  
   Plotly.d3.json(url, function(error, response) {
    if (error) return console.warn(error);
    var name = response.quote.companyName;
    let date = [];
    let close =[];
    let initialprice1 = [];
    for (let i = 0; i < response.chart.length; i++) { 
      var dates = response.chart[i].date;
      date.push(dates);
      var closingPrices = response.chart[i].close;
      close.push(closingPrices);
      var change1 =  closingPrices/response.chart[0].close;
      initialprice1.push(change1*100);};
    
 //Graph 2

  Plotly.d3.json(urlSP, function(error, response){
    
    if (error) return console.warn(error);
    
    var nameSP = response.quote.companyName;
    let dateSP = [];
    let closeSP =[];
    let initialprice2 = [];
    for (let i = 0; i < response.chart.length; i++) { 
      var datesSP = response.chart[i].date;
      dateSP.push(datesSP);
      var closingPricesSP = response.chart[i].close;
      closeSP.push(closingPricesSP);
      var change2 = closingPricesSP/response.chart[0].close;
      initialprice2.push(change2*100);};
    
  //Graph 3
  Plotly.d3.json(url, function(error, response){
    
    if (error) return console.warn(error);

    var name = response.quote.companyName;
    let dateStock = [];
    let closeStockPrices =[];
    for (let i = 0; i < response.chart.length; i++) { 
      var datesStock = response.chart[i].date;
      dateStock.push(datesStock);
      var closingStockPrices = response.chart[i].close;
      closeStockPrices.push(closingStockPrices);};
  
  //Tracing Graphs    
    data1 = [trace1];
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: date,
      y: initialprice1,
      line: {
        color: "#17BECF"
      }
    };

    var trace2 = {
      type:"scatter",
      mode:"lines",
      name: nameSP,
      x:dateSP,
      y:initialprice2,
      line:{
        color:"green"
      }
    
    };

    var trace3 = {
      type:"scatter",
      mode:"lines",
      name: name,
      x:dateStock,
      y:closeStockPrices,
      fill:'tozeroy',
    };
    var data = [trace1, trace2];
    var data1 = [trace3];

    var layout1 = {
      title: `${name} Closing Prices Compared to S&P`,
      xaxis: {
        range: [date[0], date[-1]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };
    var layout2 = {
      title: `${name} Closing Prices`,
      xaxis: {
        range: [date[0], date[-1]],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };
    Plotly.newPlot("spCompare", data, layout1);
    Plotly.newPlot("daily_stock_chart",data1,layout2);
  });

  
})})};

function News(stock) {

  var url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
  Plotly.d3.json(url, function(error, response) {
    if (error) return console.warn(error);
    //News 1 Info   
    let news1= response.news[0].headline;
    let summary1= response.news[0].summary;
    let newsURL1=response.news[0].url;
    let newsdate1=response.news[0].datetime;

    
    document.getElementById("News1").innerHTML = news1;
    document.getElementById("NewsSummary1").innerHTML = summary1;
    document.getElementById("NewsURL1").href = newsURL1;
    document.getElementById("NewsDate").innerHTML = "Posted On "+ newsdate1;

    //News 2 Info 
    let news2= response.news[1].headline;
    let summary2= response.news[1].summary;
    let newsURL2=response.news[1].url;
    let newsdate2=response.news[1].datetime;

    document.getElementById("News2").innerHTML = news2;
    document.getElementById("NewsSummary2").innerHTML = summary2;
    document.getElementById("NewsURL2").href = newsURL2;
    document.getElementById("NewsDate2").innerHTML = "Posted On "+ newsdate2;

    //News 3 Info 
    let news3= response.news[2].headline;
    let summary3= response.news[2].summary;
    let newsURL3=response.news[2].url;
    let newsdate3=response.news[2].datetime;

    document.getElementById("News3").innerHTML = news3;
    document.getElementById("NewsSummary3").innerHTML = summary3;
    document.getElementById("NewsURL3").href = newsURL3;
    document.getElementById("NewsDate3").innerHTML = "Posted On "+ newsdate3;



  })};

 // Currency formatter Function. turns number into $
function CurrencyFormat(number){
  return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2}).format(number)
};

// Function to determine if number is in millions or billions and divide accordingly
function DivideNumber(number){
 if ( number /1000000000 <1){
  anumber = number /  1000000
  return fnumber = CurrencyFormat(anumber.toFixed(2)) + " million"
 } else {
   anumber = number /  1000000000
   return fnumber = CurrencyFormat(anumber.toFixed(2)) + " billion"
 }
};

 
function addRow(desc, output) {
    var table = document.getElementById("table");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = desc;
    cell2.innerHTML = output;
}

function clearTable(){
let tableHeaderRowCount = 0;
var table = document.getElementById('table');
var rowCount = table.rows.length;
for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
}
}

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

function stockHistory(stock){
  var url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
  Plotly.d3.json(url, function(error, response){
    if (error) return console.warn(error);

    let close = response.quote.close;
    let open = response.quote.open;
    console.log(close);
    console.log(open);

    urlhistory = `http://localhost:5000/stocks/${stock}`
    
    data = {
      "open":open,
      "close":close,
      "stock":stock
    }

    Plotly.d3.json(urlhistory, function(error, data){
        if (error) return console.warn(error);
        
         console.log(data.response);
    });

  });
 }
// Add event listener for submit button
Plotly.d3.select("#submit").on("click", handleSubmit);
