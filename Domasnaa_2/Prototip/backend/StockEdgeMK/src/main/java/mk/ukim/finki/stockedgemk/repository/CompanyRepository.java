package mk.ukim.finki.stockedgemk.repository;

import mk.ukim.finki.stockedgemk.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByTicker(String ticker);
}
