package mk.ukim.finki.stockedgemk.service;



import mk.ukim.finki.stockedgemk.model.User;

public interface UserService {
    User findByUsername(String username);
    User save(User user);
    void deleteById(Long id);
    boolean validatePassword(String username, String password);
}


