package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<StockData> findByStockIdAndDateRange(Long id, LocalDate startDate, LocalDate endDate) {
        return stockDataRepository.findByStockIdAndDateBetween(id,startDate,endDate);
    }




    @Override
    public StockData save(StockData stockData) {
        return stockDataRepository.save(stockData);
    }

    @Override
    public void deleteById(Long id) {
        stockDataRepository.deleteById(id);
    }


}



