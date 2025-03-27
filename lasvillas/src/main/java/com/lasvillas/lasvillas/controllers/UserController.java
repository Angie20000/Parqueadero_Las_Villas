package com.lasvillas.lasvillas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lasvillas.lasvillas.models.user;
import com.lasvillas.lasvillas.services.IuserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private IuserService service;

    @GetMapping("/all")
    public List<user> findAll() {
        return service.findAll();
    }

    @GetMapping("/lasVillas/{id}")
    public user findById(@PathVariable Long id) {
        return service.findById(id);

    }

    @PostMapping("/save")
    public user save(@RequestBody user User) {
        return service.save(User);   
     }

     @DeleteMapping("/Delete/{id}")
    public void deleteById(@PathVariable Long id){
        service.Delete(id);
    }
    
    

}
