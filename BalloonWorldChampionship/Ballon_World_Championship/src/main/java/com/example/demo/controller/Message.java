package com.example.demo.controller;

public class Message {
	private long Id;
	private String Content;
	private int NameId;
	public String getContent() {
		return Content;
	}	
	public void setContent(String str) {
		Content = str;
	}
	public int getNameId() {
		return NameId;
	}
	public void setName(int n) {
		NameId = n;
	}
	public long getId() {
		return Id;
	}
	public void setId(long l) {
		Id = l;
	}
}
