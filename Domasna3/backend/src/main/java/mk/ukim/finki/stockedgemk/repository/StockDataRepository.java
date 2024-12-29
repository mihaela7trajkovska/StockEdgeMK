package mk.ukim.finki.stockedgemk.repository;


import mk.ukim.finki.stockedgemk.model.StockData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StockDataRepository extends JpaRepository<StockData, Long> {
    List<StockData> findByStockIdAndDateBetween(Long id, LocalDate startDate, LocalDate endDate);

}