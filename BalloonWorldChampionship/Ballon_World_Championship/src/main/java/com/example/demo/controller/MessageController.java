package com.example.demo.controller;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
public class MessageController {
	static final String ip = "http://192.168.68.104:8080";
	Map<Long, Message> messages = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	@CrossOrigin(origins = ip)
	@GetMapping
	public Collection<Message> getMSGs() {
		return messages.values();
	}
	@GetMapping("/{id}")
	public ResponseEntity<Message> getMSG(@PathVariable long id) {

		Message savedMessage = messages.get(id);

		if (savedMessage != null) {
			return new ResponseEntity<>(savedMessage, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = ip)
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Message postMSG(@RequestBody Message message) {

		long id = nextId.incrementAndGet();
		message.setId(id);
		messages.put(id, message);

		return message;
	}
	@CrossOrigin(origins = ip)
	@PutMapping("/{id}")
	public ResponseEntity<Message> updateMSG(@PathVariable long id, @RequestBody Message updatedMSG) {

		Message savedItem = messages.get(updatedMSG.getId());

		if (savedItem != null) {

			messages.put(id, updatedMSG);

			return new ResponseEntity<>(updatedMSG, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = ip)
	@DeleteMapping("/{id}")
	public ResponseEntity<Message> deleteMSG(@PathVariable long id) {

		Message savedMessage = messages.get(id);

		if (savedMessage != null) {
			messages.remove(savedMessage.getId());
			return new ResponseEntity<>(savedMessage, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


}
