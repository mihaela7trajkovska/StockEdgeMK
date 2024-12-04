package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.Company;

import java.util.List;

public interface CompanyService {
    List<Company> findAll(); // Наоѓа сите компании
    Company findById(Long id); // Наоѓа компанија по ID
    Company save(Company company); // Зачувува/ажурира компанија
    void deleteById(Long id); // Брише компанија по ID
    List<Company> findByTicker(String ticker);
}
