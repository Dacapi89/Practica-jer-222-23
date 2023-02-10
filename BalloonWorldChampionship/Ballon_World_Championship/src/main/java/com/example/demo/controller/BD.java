package com.example.demo.controller;

import org.springframework.stereotype.Service;

@Service
public class BD implements Comparable<BD> {

	private String user;
	private long id;
	private int score;

	public BD() {}
	

	public String getUser() {
		return user;
	}
	public long getId() {
		return id;
	}
	public int getScore() {
		return score;
	}
	public void setUser(String name) {
		this.user = name;
	}
	public void setId(long identity) {
		this.id = identity;
	}
	public void setScore(int _score) {
		this.score = _score;
	}
	
	@Override
	public String toString() {
		return "BD [id= " + id + ", user= " + user + ", score= " + score +"]";
	}
	 @Override
	    public int compareTo(BD o) {
	        if (this.score != o.getScore()) {
	            return o.getScore() - this.score;
	        }
	        return this.user.compareTo(o.getUser());
	    }
}
