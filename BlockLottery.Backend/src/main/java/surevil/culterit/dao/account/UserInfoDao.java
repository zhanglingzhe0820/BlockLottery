package surevil.culterit.dao.account;

import surevil.culterit.entity.account.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoDao extends JpaRepository<UserInfo, Integer> {
    UserInfo findUserInfoByUserId(int userId);
}
