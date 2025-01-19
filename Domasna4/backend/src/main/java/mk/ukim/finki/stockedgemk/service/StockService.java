package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.Stock;

import java.util.List;

public interface StockService {
    List<Stock> findAll();
    Stock findById(Long id);
    Stock save(Stock stock);
    void deleteById(Long id);
    Stock findByTicker(String ticker);
    List<String> findAllTickers();

}
