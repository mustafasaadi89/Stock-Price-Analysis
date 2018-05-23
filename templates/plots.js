/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
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
  }
  
  function buildPlot(stock) {
  
    var url = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=2y&last=5`;
    var urlSP = `https://api.iextrading.com/1.0/stock/spy/batch?types=quote,news,chart&range=2y&last=1`
  
    Plotly.d3.json(url, function(error, response) {
  
      if (error) return console.warn(error);
  
      // Grab values from the response json object to build the plots
      var name = response.quote.companyName;
      let date = [];
      let close =[];
      for (let i = 0; i < response.chart.length; i++) { 
        var dates = response.chart[i].date;
        date.push(dates);
        var closingPrices = response.chart[i].close;
        close.push(closingPrices);}

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: date,
        y: close,
        line: {
            color: "#17BECF"
        }
        };

    var data = [trace1];

    var layout = {
        title: `${stock} closing prices`,
        xaxis: {
          range: [date[0], date[-1]],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);
    });
  }
  
  // Add event listener for submit button
  Plotly.d3.select("#submit").on("click", handleSubmit);