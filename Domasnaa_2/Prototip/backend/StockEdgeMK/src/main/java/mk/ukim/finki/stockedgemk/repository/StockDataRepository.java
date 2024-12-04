package mk.ukim.finki.stockedgemk.repository;

import mk.ukim.finki.stockedgemk.model.StockData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface StockDataRepository extends JpaRepository<StockData, Long> {
    List<StockData> findByStockTickerAndDateBetween(String ticker, LocalDate startDate, LocalDate endDate);
}
