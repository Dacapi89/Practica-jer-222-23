package com.example.demo.controller;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

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
	AtomicLong nextId = new AtomicLong(0);
	long id;
	static final String ip = "http://192.168.68.106:8080";
	String linea;
	String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
	@CrossOrigin(origins = ip)
	@GetMapping
	public Collection<BD> users() throws IOException {
		
		cargar();
		//return at.mostrar();
		System.out.println(baseDeDatos);
		System.out.println("Enseñando la última linea...");
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
		      System.out.println("LISTA NUEVA  ."+baseDeDatos);
		      linea = leerUltimaLinea();
			
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
	public ResponseEntity<BD> borraItem(@PathVariable long id) throws IOException {
		System.out.println("Estoy en borrado.");
		System.out.println("Número de id: " + id);
		BD savedUser = baseDeDatos.get(id);

		if (savedUser != null) {
			baseDeDatos.remove(savedUser.getId());
			System.out.println("Borrado existoso."+baseDeDatos);
			eliminarFilas(linea);
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			System.out.println("No se ha podido borrar.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	//Codigo sacado de https://es.stackoverflow.com/questions/163537/eliminar-fila-segun-texto-en-un-txt-java para eliminar la última linea de un fichero de texto
	public void eliminarFilas( String cadena) throws IOException{
	    Path pathe = Paths.get(path);
	    List<String> lineas = Files.readAllLines(pathe);
	    lineas = lineas.stream()
	                    .filter(linea->!linea.contains(cadena))
	                    .collect(Collectors.toList());
	    Files.write(pathe, lineas);
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
	
	public String leerUltimaLinea() throws IOException {
		
		String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
		File file = new File(path);
		String lastLine = null;
		
		if (file.exists()) {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String last = null;
			
				last = br.readLine();
			
			while (last != null) {
			lastLine = last;
			last = br.readLine();
			}
			System.out.println(lastLine);
			} else {
			System.out.println("No found file");
			System.exit(1);
			}
		return lastLine;
	}
}
