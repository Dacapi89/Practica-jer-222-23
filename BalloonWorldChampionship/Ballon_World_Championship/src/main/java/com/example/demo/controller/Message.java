package com.example.demo.controller;

public class Message {
	private long Id;
	private String Content;
	private String Name;
	public String getContent() {
		return Content;
	}	
	public void setContent(String str) {
		Content = str;
	}
	public String getName() {
		return Name;
	}
	public void setName(String str) {
		Name = str;
	}
	public long getId() {
		return Id;
	}
	public void setId(long l) {
		Id = l;
	}
}
