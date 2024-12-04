package mk.ukim.finki.stockedgemk.service;



import mk.ukim.finki.stockedgemk.model.User;

public interface UserService {
    User findByUsername(String username); // Наоѓа корисник според корисничко име
    User save(User user); // Зачувува/ажурира корисник
    void deleteById(Long id); // Брише корисник по ID
    boolean validatePassword(String username, String password); // Проверува дали е валидна лозинка
}
