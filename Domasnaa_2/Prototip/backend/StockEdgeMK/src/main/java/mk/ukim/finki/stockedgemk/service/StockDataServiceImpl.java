package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import mk.ukim.finki.stockedgemk.service.StockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StockDataServiceImpl implements StockDataService {

    private final StockDataRepository stockDataRepository;

    @Autowired
    public StockDataServiceImpl(StockDataRepository stockDataRepository) {
        this.stockDataRepository = stockDataRepository;
    }

    @Override
    public List<StockData> findAll() {
        return stockDataRepository.findAll();
    }

    @Override
    public StockData findById(Long id) {
        return stockDataRepository.findById(id).orElseThrow(() -> new RuntimeException("StockData not found"));
    }

    @Override
    public List<StockData> findByStockIdAndDateRange(String ticker, LocalDate startDate, LocalDate endDate) {
        return stockDataRepository.findByStockTickerAndDateBetween(ticker,startDate,endDate);
    }

   /* @Override
    public List<StockData> findByStockIdAndDateRange(Long stockId, LocalDate startDate, LocalDate endDate) {
        return stockDataRepository.findByStockIdAndDateBetween(stockId, startDate, endDate);
    }*/

    @Override
    public StockData save(StockData stockData) {
        return stockDataRepository.save(stockData);
    }

    @Override
    public void deleteById(Long id) {
        stockDataRepository.deleteById(id);
    }
}

/*import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class StockDataServiceImpl {
    private final StockDataRepository stockDataRepository;

    public StockDataServiceImpl(StockDataRepository stockDataRepository) {
        this.stockDataRepository = stockDataRepository;
    }

    public List<StockData> getStockData(String ticker, LocalDate startDate, LocalDate endDate) {
        return stockDataRepository.findByStockTickerAndDateBetween(ticker, startDate, endDate);
    }

    public StockData saveStockData(StockData stockData) {
        return stockDataRepository.save(stockData);
    }
}*/
