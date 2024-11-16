async function getStockData(stockSymbol) {
        try {
          
          const apiKey = 'E1LWVJIJFLRA9VWJ';
          const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=${apiKey}`);
          const data = await response.json();
    
          
          if (data['Time Series (1min)']) {
            const timeSeries = data['Time Series (1min)'];
            const latestTimestamp = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestTimestamp];
    
            
            const stockPrice = latestData['4. close'];
            const stockChange = (latestData['4. close'] - latestData['1. open']).toFixed(2); // Calculate change based on open price
    
            
            document.getElementById('stock-symbol').innerText = `Symbol: ${stockSymbol}`;
            document.getElementById('stock-price').innerText = `Price: $${stockPrice}`;
            document.getElementById('stock-change').innerText = `Change: $${stockChange}`;
          } else {
            console.error('No data available for the specified stock symbol.');
          }
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
    }
    

    getStockData('AAPL');    