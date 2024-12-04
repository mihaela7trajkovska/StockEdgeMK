package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.Stock;
import java.util.List;

public interface StockService {
    List<Stock> findAll(); // Наоѓа сите акции
    Stock findById(Long id); // Наоѓа акција по ID
    Stock save(Stock stock); // Зачувува/ажурира акција
    void deleteById(Long id); // Брише акција по ID
    Stock findByTicker(String ticker);
}
