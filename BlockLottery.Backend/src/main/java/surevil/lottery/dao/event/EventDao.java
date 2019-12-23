package surevil.lottery.dao.event;

import org.springframework.data.jpa.repository.JpaRepository;
import surevil.lottery.entity.event.Event;

public interface EventDao extends JpaRepository<Event, Integer> {
}
