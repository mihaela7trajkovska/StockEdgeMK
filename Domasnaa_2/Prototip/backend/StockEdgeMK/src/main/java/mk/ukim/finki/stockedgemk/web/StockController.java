package mk.ukim.finki.stockedgemk.web;
import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.service.StockServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    private final StockServiceImpl stockService;

    public StockController(StockServiceImpl stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.findAll();
    }

    @GetMapping("/{ticker}")
    public Stock getStockByTicker(@PathVariable String ticker) {
        return stockService.findByTicker(ticker);
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockService.save(stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteById(id);
    }
}
