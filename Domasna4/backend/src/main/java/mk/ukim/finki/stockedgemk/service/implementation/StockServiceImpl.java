package mk.ukim.finki.stockedgemk.service.implementation;



import mk.ukim.finki.stockedgemk.bootstrap.DataHolder;
import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import mk.ukim.finki.stockedgemk.repository.StockRepository;
import mk.ukim.finki.stockedgemk.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;
    private final DataHolder dataHolder;

    public StockServiceImpl(StockRepository stockRepository, StockDataRepository stockDataRepository) {
        this.stockRepository = stockRepository;
        this.dataHolder = DataHolder.getInstance(stockRepository, stockDataRepository);

    }
    @Override
    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    @Override
    public Stock findById(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    @Override
    public Stock save(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public void deleteById(Long id) {
        stockRepository.deleteById(id);
    }

    @Override
    public Stock findByTicker(String ticker) {
        return stockRepository.findByTicker(ticker)  .orElseThrow(() -> new RuntimeException("Stock not found: " + ticker));
    }

    @Override
    public List<String> findAllTickers() {
        return stockRepository.findAllTickers();
    }
}
