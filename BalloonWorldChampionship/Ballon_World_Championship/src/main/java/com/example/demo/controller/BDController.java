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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.TreeMap;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;






@RestController
//@RequestMapping("/users")
public class BDController {
	

	Map<Long, BD> baseDeDatos = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	long id;
	static final String ip = "http://192.168.68.107:8080";
	String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
	@CrossOrigin(origins = ip)
	@GetMapping("/ranking")
	public Object[] ranking() throws IOException {

		List<BD> usuariosOrdenados = new ArrayList<>(baseDeDatos.values());
		Collections.sort(usuariosOrdenados);
		return usuariosOrdenados.toArray();
		
	}
	@CrossOrigin(origins = ip)
	@GetMapping("/users")
	public Collection<BD> users() throws IOException {
		
		cargar();
		//return at.mostrar();
		
		return baseDeDatos.values();
		
	}
	@CrossOrigin(origins = ip)
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public BD nuevoUser(@RequestBody BD user) {
		

		long id = nextId.incrementAndGet();
		if(baseDeDatos.containsKey(id)) {
			//System.out.println("YA ESTA EN LA BASE DE DATOS");
			id = baseDeDatos.size()+1;
		}
		user.setId(id);
		baseDeDatos.put(id, user);
		
		
		//System.out.println(r.toString());
		//long aux = 1;
		//for(long i = 1; i < baseDeDatos.size();i++)
		//{
			//if(user.getUser().equals(baseDeDatos.get(i).getUser()))
			//{
				//aux = baseDeDatos.get(i).getId();
			//}
		//}
		//System.out.println(baseDeDatos.get(aux).getUser());
		FileWriter fw = null;
		BufferedWriter bw = null;
		try {
			  fw = new FileWriter(path, true);
			  bw = new BufferedWriter(fw);
		      bw.write(Long.toString(id)+ "\t"+user.getUser() +"\t"+ user.getScore()+ "\n");
		      bw.close();
		      fw.close();
		      System.out.println("Successfully wrote to the file.");
		      System.out.println("LISTA NUEVA  ."+baseDeDatos);
			
		} catch(Exception e) {
			e.printStackTrace();
		}

		return user;
	}
	//Escribir en archivos: https://www.youtube.com/watch?v=wUucJvsdL3c,
	//https://es.stackoverflow.com/questions/68526/agregar-contenido-a-un-archivo-sin-sobrescribir-el-contenido
	@GetMapping("/users/{id}")
	public ResponseEntity<BD> getItem(@PathVariable long id) {

		BD savedUser = baseDeDatos.get(id);

		if (savedUser != null) {
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = ip)
	@DeleteMapping("/users/{id}")
	public ResponseEntity<BD> borraItem(@PathVariable long id) throws IOException {
		System.out.println("Estoy en borrado.");
		BD savedUser = baseDeDatos.get(id);
		if (savedUser != null) {
			baseDeDatos.remove(savedUser.getId());
			System.out.println("Borrado existoso."+baseDeDatos);
			eliminarFilas(buscarUsuario(savedUser.getUser()));
			return new ResponseEntity<>(savedUser, HttpStatus.OK);
		} else {
			System.out.println("No se ha podido borrar.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = ip)
	@PutMapping("/users/{id}")
	public ResponseEntity<BD> actulizaScore(@RequestBody BD userActualizado) throws IOException {
		
		System.out.println(userActualizado);
		BD savedUser = baseDeDatos.get(userActualizado.getId());
		System.out.println(savedUser);

		if (savedUser != null) {

			baseDeDatos.put(userActualizado.getId(), userActualizado);
			System.out.println(baseDeDatos);
			modificarScore(buscarUsuario(userActualizado.getUser()), userActualizado);
			return new ResponseEntity<>(userActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	public void modificarScore(String cadena, BD ua) throws IOException
	{
		FileWriter fw = null;
		BufferedWriter bw = null;
	    fw = new FileWriter(path, true);
		bw = new BufferedWriter(fw);
		Path pathe = Paths.get(path);
	    List<String> lineas = Files.readAllLines(pathe);
	    lineas = lineas.stream()
	                    .filter(linea->!linea.contains(cadena))
	                    .collect(Collectors.toList());
	    Files.write(pathe, lineas);
	    bw.write(Long.toString(ua.getId())+ "\t"+ua.getUser() +"\t"+ ua.getScore()+ "\n");
	      bw.close();
	      fw.close();
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
					base.setScore(Integer.parseInt(atributo.nextElement().toString()));
					baseDeDatos.put(base.getId(),base);
				}
				
			}
			scanner.close();
			

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		//Codigo base utilizado para leer el archivo de texto: https://www.youtube.com/watch?v=uqZEOO5MU_M	
	}

	

	
	public String buscarUsuario(String request) {
		String li ="";
		 	try {
		 		String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
				
				final BufferedReader reader = new BufferedReader(new FileReader(path));
				String line = "";
				
				while((line = reader.readLine())!= null){
					if(line.indexOf(request)!= -1){
						li = line;
						System.out.println(""+line);
					}
				}reader.close();
				
		 	} catch (FileNotFoundException e) {e.printStackTrace();
			} catch (IOException           e) {e.printStackTrace();
			}
		 	return li;
	}

} //Código base utilizado para buscar el nombre de usuario en el archivo de texto: https://foro.elhacker.net/java/buscar_texto_de_un_fichero-t283733.0.html
