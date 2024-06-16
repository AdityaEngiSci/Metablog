package com.group3.metaBlog.User.Repository;

import com.group3.metaBlog.Enum.Role;
import com.group3.metaBlog.User.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
}