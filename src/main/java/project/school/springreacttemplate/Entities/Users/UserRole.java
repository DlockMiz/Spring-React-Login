package project.school.springreacttemplate.Entities.Users;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users_roles")
public class UserRole {
    @Id
    private Integer id;
    private Integer role_id;
}
