package com.example.demo;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.swing.Timer;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class PositionHandler extends TextWebSocketHandler {
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	boolean usuarios = false;
	int count = 0;
	Timer timer;
	int seconds = 60;
	String host = "";
	int score1;
	int score2;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		//Hay actualmente dos jugadores en la sala de espera
		if (sessions.size() == 2)
		{
			usuarios = true;
		}
		ObjectNode newNode = mapper.createObjectNode();
		//newNode.put("sessions", usuarios);
		newNode.put("sessions", usuarios);
		newNode.put("count", 0);
		newNode.put("x", 0);
		newNode.put("y", 0);
		newNode.put("velx", 0);
		newNode.put("vely", 0);
		newNode.put("ballx", 0);
		newNode.put("bally", 0);
		newNode.put("ballvelx", 0);
		newNode.put("ballvely", 0);
		for(WebSocketSession participant : sessions.values()) {
			
			participant.sendMessage(new TextMessage(newNode.toString()));
			
		}
		System.out.println("Cosa: " + newNode);
		
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		if (sessions.size() < 2)
		{
			usuarios = false;
		}
		timer.stop();
		seconds = 60;
		ObjectNode newNode = mapper.createObjectNode();
		//newNode.put("sessions", usuarios);
		newNode.put("sessions", usuarios);
		newNode.put("count", 0);
		newNode.put("x", 0);
		newNode.put("y", 0);
		newNode.put("velx", 0);
		newNode.put("vely", 0);
		newNode.put("ballx", 0);
		newNode.put("bally", 0);
		newNode.put("ballvelx", 0);
		newNode.put("ballvely", 0);
		for(WebSocketSession participant : sessions.values()) {
			
			participant.sendMessage(new TextMessage(newNode.toString()));
			
		}
		System.out.println("Cosa: " + newNode);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		//System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		count += node.get("count").asInt();
		//System.out.println("Count: " + count);
		if(count == 2)
		{
			host = node.get("host").asText();
			sendReady(session);
			count = 0;
			simpleTimer();
			timer.start();
		}
		sendOtherParticipants(session, node);

	}
	private void sendReady(WebSocketSession session) throws IOException
	{
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("count", count);
		for(WebSocketSession participant : sessions.values()) {
			
			participant.sendMessage(new TextMessage(newNode.toString()));
			
		}
	}
	private void simpleTimer() 
	{
		timer = new Timer(1000, new ActionListener()
		{
			@Override
			public void actionPerformed(ActionEvent e)
			{
				seconds--;
				//System.out.println("Segundos"+seconds);
				
			}
		});
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("sessions", usuarios);
		newNode.put("count", count);
		newNode.put("time", seconds);
		newNode.put("x", node.get("x").asText());
		newNode.put("y", node.get("y").asText());
		newNode.put("velx", node.get("velx").asText());
		newNode.put("vely", node.get("vely").asText());
		newNode.put("ballx", node.get("ballx").asText());
		newNode.put("bally", node.get("bally").asText());
		newNode.put("ballvelx", node.get("ballvelx").asText());
		newNode.put("ballvely", node.get("ballvely").asText());
		newNode.put("host", host);
		newNode.put("score1", node.get("score1").asText());
		newNode.put("score2", node.get("score2").asText());
		//System.out.println("Message sent: " + newNode.toString());
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
}
