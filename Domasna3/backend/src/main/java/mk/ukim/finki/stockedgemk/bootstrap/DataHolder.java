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
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataHolder {
    private final StockRepository stockRepository;
    private final StockDataRepository stockDataRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("M/d/yyyy");

    public DataHolder(StockRepository stockRepository, StockDataRepository stockDataRepository) {
        this.stockRepository = stockRepository;
        this.stockDataRepository = stockDataRepository;
    }

    @PostConstruct
    public void init() {
        try {
            System.out.println("Starting data loading...");
            List<StockData> stockDataList = new ArrayList<>();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    getClass().getClassLoader().getResourceAsStream("stocks.csv")));

            String line;
            boolean isHeader = true;
            while ((line = reader.readLine()) != null) {
                System.out.println("Reading line: " + line); // Log each line
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                String[] parts = line.split(",");
                if (parts.length < 11) continue;

                Long id = parseLong(parts[0]);
                String ticker = parts[1];
                LocalDate date = parseDate(parts[2]);
                BigDecimal openPrice = parseBigDecimal(parts[3]);
                BigDecimal highPrice = parseBigDecimal(parts[4]);
                BigDecimal lowPrice = parseBigDecimal(parts[5]);
                BigDecimal closePrice = parseBigDecimal(parts[6]);
                Long volume = parseLong(parts[7]);
                BigDecimal turnover = parseBigDecimal(parts[8]);
                BigDecimal best = parseBigDecimal(parts[9]);
                BigDecimal total = parseBigDecimal(parts[10]);

                Stock stock = stockRepository.findByTicker(ticker).orElse(null);
                if (stock == null) {
                    stock = new Stock(ticker);
                    stockRepository.save(stock);
                }
                stockDataList.add(new StockData(stock, stock.getTicker(), date, openPrice, closePrice, volume,
                        lowPrice, highPrice, turnover, best, total));

//
            }


                stockDataRepository.saveAll(stockDataList);
            System.out.println("Data loading complete!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private BigDecimal parseBigDecimal(String value) {
        try {
            return (value == null || value.isBlank()) ? null : new BigDecimal(value.replace(".", "").replace(",", "."));
        } catch (Exception e) {
            System.out.println("Failed to parse BigDecimal: " + value);
            return null;
        }
    }
    private Long parseLong(String value) {
        try {
            return (value == null || value.isBlank()) ? null : Long.parseLong(value.replace(".", "").replace(",", ""));
        } catch (Exception e) {
            return null;
        }
    }

    private LocalDate parseDate(String value) {
        try {
            return (value == null || value.isBlank())
                    ? null
                    : LocalDate.parse(value, DateTimeFormatter.ofPattern("M/d/yyyy"));
        } catch (Exception e) {
            System.out.println("Failed to parse LocalDate: " + value);
            return null;
        }
    }

}




