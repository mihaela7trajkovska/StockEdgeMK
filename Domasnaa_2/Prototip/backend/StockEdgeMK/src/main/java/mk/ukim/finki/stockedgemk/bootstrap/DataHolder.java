package mk.ukim.finki.stockedgemk.bootstrap;

import jakarta.annotation.PostConstruct;
import mk.ukim.finki.stockedgemk.model.Stock;
import mk.ukim.finki.stockedgemk.model.StockData;
import mk.ukim.finki.stockedgemk.repository.StockDataRepository;
import mk.ukim.finki.stockedgemk.repository.StockRepository;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataHolder {
    private final StockRepository stockRepository;
    private final StockDataRepository stockDataRepository;

    public DataHolder(StockRepository stockRepository, StockDataRepository stockDataRepository) {
        this.stockRepository = stockRepository;
        this.stockDataRepository = stockDataRepository;
    }

    @PostConstruct
    public void init() {
        try {

            List<StockData> stockDataList = new ArrayList<>();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    getClass().getClassLoader().getResourceAsStream("stocks.csv")));

            String line;
            boolean isHeader = true;
            while ((line = reader.readLine()) != null) {
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                String[] parts = line.split("\t");
                if (parts.length < 11) continue;


                Long id = parseLong(parts[0]);
                String ticker = parts[1];
                LocalDate date = parseDate(parts[2]);
                BigDecimal openPrice = parseBigDecimal(parts[3]);
                BigDecimal highPrice = parseBigDecimal(parts[4]);
                BigDecimal lowPrice = parseBigDecimal(parts[5]);
                BigDecimal closePrice = parseBigDecimal(parts[6]);
                Long volume = parseLong(parts[8]);
                BigDecimal turnover = parseBigDecimal(parts[9]);
                BigDecimal best = parseBigDecimal(parts[10]);
                BigDecimal total = parseBigDecimal(parts[11]);

                Stock stock = stockRepository.findByTicker(ticker).orElseGet(() -> {
                    Stock newStock = new Stock();
                    newStock.setCompanyName("Default Company");
                    newStock.setSector("Unknown");
                    stockRepository.save(newStock);
                    return newStock;
                });

                StockData stockData = new StockData();
                stockData.setId(id);
                stockData.setStock(stock);
                stockData.setDate(date);
                stockData.setOpenPrice(openPrice);
                stockData.setClosePrice(closePrice);
                stockData.setVolume(volume);
                stockData.setTurnover(turnover);
                stockData.setBest(best);
                stockData.setTotal(total);

                stockDataList.add(stockData);
            }

            stockDataRepository.saveAll(stockDataList);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private BigDecimal parseBigDecimal(String value) {
        try {
            return (value == null || value.isBlank()) ? null : new BigDecimal(value.replace(",", ""));
        } catch (Exception e) {
            return null;
        }
    }

    private Long parseLong(String value) {
        try {
            return (value == null || value.isBlank()) ? null : Long.parseLong(value.replace(",", ""));
        } catch (Exception e) {
            return null;
        }
    }

    private LocalDate parseDate(String value) {
        try {
            return (value == null || value.isBlank()) ? null : LocalDate.parse(value);
        } catch (Exception e) {
            return null;
        }
    }
}
