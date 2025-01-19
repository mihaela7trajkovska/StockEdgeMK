package mk.ukim.finki.stockedgemk.web;


import mk.ukim.finki.stockedgemk.bootstrap.DataHolder;
import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import mk.ukim.finki.stockedgemk.repository.StockRepository;
import mk.ukim.finki.stockedgemk.service.implementation.StockDataServiceImpl;
import mk.ukim.finki.stockedgemk.service.implementation.StockServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/stock-data")
public class StockDataController {
    private final StockDataServiceImpl stockDataService;
    private final StockServiceImpl stockService;
    private final DataHolder dataHolder;


    public StockDataController(StockDataServiceImpl stockDataService, StockServiceImpl stockService, StockRepository stockRepository, StockDataRepository stockDataRepository) {
        this.stockDataService = stockDataService;
        this.stockService = stockService;
        this.dataHolder = DataHolder.getInstance(stockRepository, stockDataRepository);

    }
    @GetMapping
    public ResponseEntity<?> getStockData(
            @RequestParam String ticker,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        try {
            System.out.println("Ticker: " + ticker + ", Start Date: " + startDate + ", End Date: " + endDate);


            Stock stock = stockService.findByTicker(ticker);
            if (stock == null) {
                System.out.println("Stock not found for ticker: " + ticker);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Stock not found for ticker: " + ticker));
            }

            System.out.println("Found stock with ID: " + stock.getId());


            List<StockData> stockDataList = stockDataService.findByStockIdAndDateRange(
                    stock.getId(), LocalDate.parse(startDate), LocalDate.parse(endDate)
            );

            if (stockDataList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("message", "No stock data available for the given criteria."));
            }

            return ResponseEntity.ok(stockDataList);

        } catch (Exception e) {
            System.err.println("Error while fetching stock data: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public StockData createStockData(@RequestBody StockData stockData) {
        return stockDataService.save(stockData);
    }



}
