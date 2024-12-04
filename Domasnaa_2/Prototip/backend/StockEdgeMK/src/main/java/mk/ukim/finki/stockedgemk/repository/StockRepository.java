package mk.ukim.finki.stockedgemk.repository;
import mk.ukim.finki.stockedgemk.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByTicker(String ticker);
}
