package mk.ukim.finki.stockedgemk.service;


import mk.ukim.finki.stockedgemk.model.Company;
import mk.ukim.finki.stockedgemk.repository.CompanyRepository;
import mk.ukim.finki.stockedgemk.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public Company findById(Long id) {
        return companyRepository.findById(id).orElseThrow(() -> new RuntimeException("Company not found"));
    }

    @Override
    public Company save(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public void deleteById(Long id) {
        companyRepository.deleteById(id);
    }

    @Override
    public List<Company> findByTicker(String ticker) {
        return companyRepository.findByTicker(ticker);
    }
}



/*@Service
public class CompanyServiceImpl {
    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getCompanies(String ticker) {
        return companyRepository.findByTicker(ticker);
    }
}*/
