package mk.ukim.finki.stockedgemk.web;
import mk.ukim.finki.stockedgemk.bootstrap.DataHolder;
import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import mk.ukim.finki.stockedgemk.repository.StockRepository;
import mk.ukim.finki.stockedgemk.service.implementation.StockServiceImpl;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stocks")
public class StockController {
    private final StockServiceImpl stockService;

    private final DataHolder dataHolder;

    public StockController(StockServiceImpl stockService, StockRepository stockRepository, StockDataRepository stockDataRepository) {
        this.stockService = stockService;
        this.dataHolder = DataHolder.getInstance(stockRepository, stockDataRepository);

    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.findAll();
    }

    @GetMapping("/tickers")
    public List<String> getAllTickers() {
        return stockService.findAllTickers();
    }

    // appi baranje


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
