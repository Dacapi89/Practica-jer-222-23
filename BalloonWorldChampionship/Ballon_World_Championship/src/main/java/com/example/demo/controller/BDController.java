package com.example.demo.controller;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.util.Collection;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;





@RestController
@RequestMapping("/users")
public class BDController {
	

	Map<Long, BD> baseDeDatos = new ConcurrentHashMap<>(); 
	public ArchivoTexto at = new ArchivoTexto();
	Map<Long, BD> items = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	long id;
	static final String ip = "http://192.168.68.106:8080";

	String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
	@CrossOrigin(origins = ip)
	@GetMapping
	public Collection<BD> users() {
		System.out.println("LISTA ."+items);
		cargar();
		//return at.mostrar();
		return baseDeDatos.values();
		
	}
	@CrossOrigin(origins = ip)
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BD nuevoUser(@RequestBody BD user) {
		

		long id = nextId.incrementAndGet();
		user.setId(id);
		baseDeDatos.put(id, user);
		FileWriter fw = null;
		BufferedWriter bw = null;
		try {
			  fw = new FileWriter(path, true);
			  bw = new BufferedWriter(fw);
		      bw.write(Long.toString(id)+ "\t"+user.getUser() + "\n");
		      bw.close();
		      fw.close();
		      System.out.println("Successfully wrote to the file.");
		      System.out.println("LISTA NUEVA  ."+items);
			
		} catch(Exception e) {
			e.printStackTrace();
		}

		return user;
	}
	//Escribir en archivos: https://www.youtube.com/watch?v=wUucJvsdL3c,
	//https://es.stackoverflow.com/questions/68526/agregar-contenido-a-un-archivo-sin-sobrescribir-el-contenido
	@GetMapping("/{id}")
	public ResponseEntity<BD> getItem(@PathVariable long id) {
		System.out.println("Estoy en GET.");
		BD savedUser = baseDeDatos.get(id);

		if (savedUser != null) {
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = ip)
	@DeleteMapping("/{id}")
	public ResponseEntity<BD> borraItem(@PathVariable long id) {
		System.out.println("Estoy en borrado.");
		BD savedUser = baseDeDatos.get(id);

		if (savedUser != null) {
			items.remove(savedUser.getId());
			System.out.println("Borrado existoso."+items);
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			System.out.println("No se ha podido borrar.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	public void cargar() {

		String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
		File file = new File(path);

		try {
			Scanner scanner = new Scanner(file);
			
			while(scanner.hasNextLine()) {
				String linea = scanner.nextLine();
				StringTokenizer atributo = new StringTokenizer(linea, "\t");
				BD base = new BD();
				while(atributo.hasMoreElements()) {
					base.setId(Long.parseLong(atributo.nextElement().toString()));
					base.setUser(atributo.nextElement().toString());
					baseDeDatos.put(base.getId(),base);
				}
				
			}
			scanner.close();
			

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		//Codigo base utilizado para leer el archivo de texto: https://www.youtube.com/watch?v=uqZEOO5MU_M	
	}
}
