package fr.iai.planner.security;

import java.util.Objects;

public class DiscordUser {

    private String id;
    private String username;
    private String discriminator;
    private String avatar;
    private Boolean bot;
    private Boolean mfaEnabled;
    private String locale;
    private Boolean verified;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDiscriminator() {
        return discriminator;
    }

    public void setDiscriminator(String discriminator) {
        this.discriminator = discriminator;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getBot() {
        return bot;
    }

    public void setBot(Boolean bot) {
        this.bot = bot;
    }

    public Boolean getMfaEnabled() {
        return mfaEnabled;
    }

    public void setMfaEnabled(Boolean mfaEnabled) {
        this.mfaEnabled = mfaEnabled;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiscordUser that = (DiscordUser) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(username, that.username) &&
                Objects.equals(discriminator, that.discriminator) &&
                Objects.equals(avatar, that.avatar) &&
                Objects.equals(bot, that.bot) &&
                Objects.equals(mfaEnabled, that.mfaEnabled) &&
                Objects.equals(locale, that.locale) &&
                Objects.equals(verified, that.verified);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, username, discriminator, avatar, bot, mfaEnabled, locale, verified);
    }

    @Override
    public String toString() {
        return "DiscordUser{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", discriminator='" + discriminator + '\'' +
                ", avatar='" + avatar + '\'' +
                ", bot=" + bot +
                ", mfaEnabled=" + mfaEnabled +
                ", locale='" + locale + '\'' +
                ", verified=" + verified +
                '}';
    }
}
