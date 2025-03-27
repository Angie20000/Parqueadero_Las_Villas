package com.lasvillas.lasvillas.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lasvillas.lasvillas.models.user;

@Repository

public interface IUserRepository extends CrudRepository<user,Long> {




}
