package mk.ukim.finki.stockedgemk.repository;
import mk.ukim.finki.stockedgemk.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByTicker(String ticker);
    @Query("SELECT s.ticker FROM Stock s")
    List<String> findAllTickers();
}