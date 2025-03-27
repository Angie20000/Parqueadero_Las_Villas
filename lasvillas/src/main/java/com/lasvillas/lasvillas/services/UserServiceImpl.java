package com.lasvillas.lasvillas.services;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lasvillas.lasvillas.models.user;
import com.lasvillas.lasvillas.repositories.IUserRepository;

@Service
public class UserServiceImpl implements IuserService{

    @Autowired
    public IUserRepository repository;

    @Override
    public List<user> findAll() {
        return  (List<user>)repository.findAll();
    
    }

    @Override
    public user findById(Long id) {
      return repository.findById(id).orElse(null);
        }

    @Override
    public user save(user User) {
            return repository.save(User);
    
    }

    @Override
    public void Delete(Long id) {
       repository.deleteById(id);   }

    @Override
    public String hashContrasenia(String contrasenia) {
    try {
      MessageDigest instancia = MessageDigest.getInstance("SHA-256");
      byte[] hash = instancia.digest(contrasenia.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hash);
    } catch (Exception e) {
      throw new RuntimeException("Error al incriptar");
    } 
    }

    

}
