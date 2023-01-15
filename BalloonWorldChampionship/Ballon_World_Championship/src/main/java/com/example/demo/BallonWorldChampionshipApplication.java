package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class BallonWorldChampionshipApplication implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(posHandler(), "/pos")
			.setAllowedOrigins("*");
	}
	@Bean
	public PositionHandler posHandler() {
		return new PositionHandler();
	}
	public static void main(String[] args) {
		SpringApplication.run(BallonWorldChampionshipApplication.class, args);
		
		System.out.print("Lanzando videojuego...");
	}

}
