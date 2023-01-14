package com.example.demo.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;

public class ArchivoTexto {

	public List<BD> baseDeDatos = new ArrayList<BD>();
	public long ultimoID;
	public ArchivoTexto( ) {}

	public List<BD> mostrar() {
		
		String path = "src\\main\\resources\\static\\dataBase\\usuarios.txt";
		File file = new File(path);

		try {
			Scanner scanner = new Scanner(file);
			
			while(scanner.hasNextLine()) {
				//System.out.println(scanner.nextLine());
				String linea = scanner.nextLine();
				StringTokenizer atributo = new StringTokenizer(linea, "\t");
				BD base = new BD();
				while(atributo.hasMoreElements()) {
					base.setId(Long.parseLong(atributo.nextElement().toString()));
					base.setUser(atributo.nextElement().toString());
				}
				baseDeDatos.add(base);
			}
			scanner.close();
			
			baseDeDatos.forEach(
					c->System.out.println(c)
					);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		ultimoID = baseDeDatos.get(2).getId();
		return baseDeDatos;
	}
	public long obtenerId() {
		
		return baseDeDatos.get(2).getId();
	}
	
	public boolean vacia() {
		
		return baseDeDatos.isEmpty();
	}
}
//Codigo base utilizado para leer el archivo de texto: https://www.youtube.com/watch?v=uqZEOO5MU_M