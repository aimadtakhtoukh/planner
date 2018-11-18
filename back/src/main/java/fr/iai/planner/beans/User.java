package fr.iai.planner.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    public static class Builder {
        private User user;

        public Builder() {
            user = new User();
        }

        public User build() {
            return user;
        }

        public Builder id(Long id) {
            user.id = id;
            return this;
        }

        public Builder name(String name) {
            user.name = name;
            return this;
        }
    }
}
