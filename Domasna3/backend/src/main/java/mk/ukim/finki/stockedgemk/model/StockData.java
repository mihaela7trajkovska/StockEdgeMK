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
//@NoArgsConstructor
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
        //this.stockDataList = stockDataList;
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

    public BigDecimal getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(BigDecimal lowPrice) {
        this.lowPrice = lowPrice;
    }

    public BigDecimal getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(BigDecimal highPrice) {
        this.highPrice = highPrice;
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

    public BigDecimal getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(BigDecimal openPrice) {
        this.openPrice = openPrice;
    }

    public BigDecimal getClosePrice() {
        return closePrice;
    }

    public void setClosePrice(BigDecimal closePrice) {
        this.closePrice = closePrice;
    }

    public Long getVolume() {
        return volume;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

    public BigDecimal getTurnover() {
        return turnover;
    }

    public void setTurnover(BigDecimal turnover) {
        this.turnover = turnover;
    }

    public BigDecimal getBest() {
        return best;
    }

    public void setBest(BigDecimal best) {
        this.best = best;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

//    public List<Stock> getStockDataList() {
//        return stockDataList;
//    }
//
//    public void setStockDataList(List<Stock> stockDataList) {
//        this.stockDataList = stockDataList;
//    }
}
