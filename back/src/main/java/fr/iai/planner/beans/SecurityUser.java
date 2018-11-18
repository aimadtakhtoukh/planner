package fr.iai.planner.beans;

import javax.persistence.*;

@Entity
public class SecurityUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToOne
    private User user;
    private String type;
    @Column(name = "security_id")
    private String securityId;

    public SecurityUser() {}

    public SecurityUser(String securityId) {
        this.securityId = securityId;
    }

    public SecurityUser(Long userId, String type, String securityId) {
        this.user = new User.Builder().id(userId).build();
        this.type = type;
        this.securityId = securityId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSecurityId() {
        return securityId;
    }

    public void setSecurityId(String securityId) {
        this.securityId = securityId;
    }

    @Override
    public String toString() {
        return "SecurityUser{" +
                "id=" + id +
                ", user=" + user +
                ", type='" + type + '\'' +
                ", securityId='" + securityId + '\'' +
                '}';
    }
}
