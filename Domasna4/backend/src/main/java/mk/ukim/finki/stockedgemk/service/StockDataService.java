package mk.ukim.finki.stockedgemk.service;



import mk.ukim.finki.stockedgemk.model.StockData;

import java.time.LocalDate;
import java.util.List;

public interface StockDataService {
    List<StockData> findAll();
    StockData findById(Long id);
    List<StockData> findByStockIdAndDateRange(Long id, LocalDate startDate, LocalDate endDate);
    StockData save(StockData stockData);
    void deleteById(Long id);

}
