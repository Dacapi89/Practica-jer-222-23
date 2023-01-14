package com.example.demo.controller;

import org.springframework.stereotype.Service;

@Service
public class BD {

	private String user;
	private long id;

	public BD() {}
	

	public String getUser() {
		return user;
	}
	public long getId() {
		return id;
	}
	public void setUser(String name) {
		this.user = name;
	}
	public void setId(long identity) {
		this.id = identity;
	}
	
	
	@Override
	public String toString() {
		return "BD [id= " + id + ", user= " + user + "]";
	}
}
