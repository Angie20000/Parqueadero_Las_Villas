package com.lasvillas.lasvillas.services;

import java.util.List;

import org.apache.catalina.User;

import com.lasvillas.lasvillas.models.user;


public interface IuserService {

   public List<user> findAll();
   public user findById(Long id);
   public user save(user User);
   public void Delete(Long id);

}
