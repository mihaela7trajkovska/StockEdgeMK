package mk.ukim.finki.stockedgemk.service;



import mk.ukim.finki.stockedgemk.model.StockData;
import java.time.LocalDate;
import java.util.List;

public interface StockDataService {
    List<StockData> findAll(); // Наоѓа сите записи за податоци на акции
    StockData findById(Long id); // Наоѓа запис по ID
    List<StockData> findByStockIdAndDateRange(String ticker, LocalDate startDate, LocalDate endDate); // Пребарува според акција и временски период
    StockData save(StockData stockData); // Зачувува/ажурира запис
    void deleteById(Long id); // Брише запис по ID
}
