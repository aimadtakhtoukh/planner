package fr.iai.planner.beans;

import java.util.List;

public class UserWithEntries {

    private User user;
    private List<Entry> entries;

    public User getUser() {
        return user;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public static class Builder {
        private UserWithEntries result = new UserWithEntries();

        public Builder user(User user) {
            result.user = user;
            return this;
        }

        public Builder entries(List<Entry> entries) {
            result.entries = entries;
            return this;
        }

        public UserWithEntries build() {
            return result;
        }
    }
}
