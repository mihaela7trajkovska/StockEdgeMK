package mk.ukim.finki.stockedgemk.web;


import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.service.StockDataServiceImpl;
import mk.ukim.finki.stockedgemk.service.StockServiceImpl;
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
    private final StockServiceImpl stockService; // Inject StockService


    public StockDataController(StockDataServiceImpl stockDataService, StockServiceImpl stockService) {
        this.stockDataService = stockDataService;
        this.stockService = stockService;
    }
    @GetMapping
    public ResponseEntity<?> getStockData(
            @RequestParam String ticker,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        try {
            System.out.println("Ticker: " + ticker + ", Start Date: " + startDate + ", End Date: " + endDate);

            // Пронаоѓање на Stock според тикер
            Stock stock = stockService.findByTicker(ticker);
            if (stock == null) {
                System.out.println("Stock not found for ticker: " + ticker);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Stock not found for ticker: " + ticker));
            }

            System.out.println("Found stock with ID: " + stock.getId());

            // Пребарување на StockData според stockId и временски период
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

//
//    @GetMapping
//    public List<StockData> getStockData(
//            @RequestParam String ticker, // Менуваме id во ticker
//            @RequestParam String startDate,
//            @RequestParam String endDate
//    ) {
//        // Пронајдете го ID од тикер
//        System.out.println("Ticker: " + ticker + ", Start: " + startDate + ", End: " + endDate);
//        Stock stock = stockService.findByTicker(ticker);
//        if (stock == null) {
//            System.out.println("Stock not found for ticker: " + ticker);
//            throw new RuntimeException("Stock not found for ticker: " + ticker);
//        }
//        System.out.println("Found stock: " + stock.getId());
//
//        return stockDataService.findByStockIdAndDateRange(
//                stock.getId(), LocalDate.parse(startDate), LocalDate.parse(endDate)
//        );
//    }


    @PostMapping
    public StockData createStockData(@RequestBody StockData stockData) {
        return stockDataService.save(stockData);
    }



}
