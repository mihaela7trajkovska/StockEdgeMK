package mk.ukim.finki.stockedgemk.web;

import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.service.StockDataServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/stock-data")
public class StockDataController {
    private final StockDataServiceImpl stockDataService;

    public StockDataController(StockDataServiceImpl stockDataService) {
        this.stockDataService = stockDataService;
    }

    @GetMapping
    public List<StockData> getStockData(
            @RequestParam String ticker,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        return stockDataService.findByStockIdAndDateRange(
                ticker, LocalDate.parse(startDate), LocalDate.parse(endDate)
        );
    }

    @PostMapping
    public StockData createStockData(@RequestBody StockData stockData) {
        return stockDataService.save(stockData);
    }
}
