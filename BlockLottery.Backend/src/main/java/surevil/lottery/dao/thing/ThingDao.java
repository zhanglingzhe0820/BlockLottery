package surevil.lottery.dao.thing;

import surevil.lottery.entity.thing.Thing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThingDao extends JpaRepository<Thing, Integer> {
    List<Thing> findThingsByUserUsername(String username);
}
