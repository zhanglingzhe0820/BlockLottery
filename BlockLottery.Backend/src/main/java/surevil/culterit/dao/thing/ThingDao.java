package surevil.culterit.dao.thing;

import surevil.culterit.entity.thing.Thing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThingDao extends JpaRepository<Thing, Integer> {
    List<Thing> findThingsByUserUsername(String username);
}
