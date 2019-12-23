package surevil.lottery.dao.account;

import surevil.lottery.entity.account.User;
import surevil.lottery.publicdatas.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDao extends JpaRepository<User, String> {
    User findUserByUsername(String username);

    List<User> findAllByRole(Role role);
}
