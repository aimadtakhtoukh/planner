package fr.iai.planner.security;

import fr.iai.planner.beans.SecurityUser;

public enum SecurityLevel {
    ANY_TOKEN {
        public boolean isAllowed(DiscordUser user, SecurityUser securityUser) {
            return user != null && user.getId() != null;
        }
    },
    ANY_USER {
        @Override
        public boolean isAllowed(DiscordUser user, SecurityUser securityUser) {
            return user != null && user.getId() != null && securityUser != null && securityUser.getUser() != null;
        }
    };

    public boolean isAllowed(DiscordUser user, SecurityUser securityUser) {
        throw new IllegalStateException();
    }
}
