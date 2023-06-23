package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
	int empezar = 0;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		if (sessions.size() == 2)
		{
			usuarios = true;
		}
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("sessions", usuarios);
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
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("sessions", usuarios);
		for(WebSocketSession participant : sessions.values()) {
			
			participant.sendMessage(new TextMessage(newNode.toString()));
			
		}
		System.out.println("Cosa: " + newNode);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		//empezar = node.get("count").asInt();
		
		
		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("count", node.get("count").asText());
		newNode.put("x", node.get("x").asText());
		newNode.put("y", node.get("y").asText());
		newNode.put("velx", node.get("velx").asText());
		newNode.put("vely", node.get("vely").asText());
		
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
}
