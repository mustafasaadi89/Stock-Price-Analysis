function buildPLot(stock){
    var url =  `https://api.iextrading.com/1.0/stock/ge/batch?types=quote,news,chart&range=5y&last=5`;

    Plotly.d3.json(url,function(error,response){
        if (error) return console.warn(error);

        let stockName = response["quote"]["companyName"];
        let stock = response["quote"]["symbol"];
        console.log(stockName);
        console.log(stock);
    })
}