package surevil.lottery.dao.account;

import surevil.lottery.entity.account.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoDao extends JpaRepository<UserInfo, Integer> {
    UserInfo findUserInfoByUserId(int userId);
}
