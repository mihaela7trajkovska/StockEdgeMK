package mk.ukim.finki.stockedgemk.service;



import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.repository.StockRepository;
import mk.ukim.finki.stockedgemk.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    @Autowired
    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
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
        return stockRepository.findByTicker(ticker).orElse(null);
    }
}
