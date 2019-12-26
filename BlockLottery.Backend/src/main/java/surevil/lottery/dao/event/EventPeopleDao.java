package surevil.lottery.dao.event;

import org.springframework.data.jpa.repository.JpaRepository;
import surevil.lottery.entity.event.Event;
import surevil.lottery.entity.event.EventPeople;

import java.util.List;

public interface EventPeopleDao extends JpaRepository<EventPeople, Integer> {
    List<EventPeople> findAllByEventId(int eventId);
}
