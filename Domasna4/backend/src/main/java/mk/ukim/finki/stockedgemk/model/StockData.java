package mk.ukim.finki.stockedgemk.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@Entity
public class StockData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    public StockData() {
    }


    public String getStockTicker() {
        return stockTicker;
    }

    public void setStockTicker(String stockTicker) {
        this.stockTicker = stockTicker;
    }

    public StockData(Stock stock, String stockTicker, LocalDate date, BigDecimal openPrice, BigDecimal closePrice, Long volume, BigDecimal lowPrice, BigDecimal highPrice, BigDecimal turnover, BigDecimal best, BigDecimal total) {
        this.stock = stock;
        this.stockTicker = stockTicker;
        this.date = date;
        this.openPrice = openPrice;
        this.closePrice = closePrice;
        this.volume = volume;
        this.lowPrice = lowPrice;
        this.highPrice = highPrice;
        this.turnover = turnover;
        this.best = best;
        this.total = total;

    }

    @Formula("(SELECT s.ticker FROM stock s WHERE s.id = stock_id)")
    @Column(name = "stock_ticker", insertable = false, updatable = false)
    private String stockTicker;

    @Column(nullable = false)
    private LocalDate date;

    private BigDecimal openPrice;

    private BigDecimal closePrice;
    private Long volume;
    private BigDecimal lowPrice;
    private BigDecimal highPrice;

    private BigDecimal turnover;
    private BigDecimal best;
    private BigDecimal total;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stock> stockDataList = new ArrayList<>();

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
