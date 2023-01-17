package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class PlayerController {
	@CrossOrigin(origins = "http://192.168.68.106:8080")
	@GetMapping("")
	public String index() {
		return "index";
	}
	

}
