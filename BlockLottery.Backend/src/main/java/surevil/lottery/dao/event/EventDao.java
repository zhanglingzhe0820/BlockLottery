package surevil.lottery.dao.event;

import org.springframework.data.jpa.repository.JpaRepository;
import surevil.lottery.entity.event.Event;

import java.util.List;

public interface EventDao extends JpaRepository<Event, Integer> {
    List<Event> findAllByUsername(String username);
}
