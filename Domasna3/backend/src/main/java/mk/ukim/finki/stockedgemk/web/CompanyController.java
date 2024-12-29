/*
package mk.ukim.finki.stockedgemk.web;


import mk.ukim.finki.stockedgemk.model.Company;
import mk.ukim.finki.stockedgemk.service.CompanyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    @Autowired
    private CompanyServiceImpl companyService;

    @GetMapping("/{ticker}")
    public List<Company> getCompaniesByTicker(@PathVariable String ticker) {
        return companyService.findByTicker(ticker);
    }
}
*/