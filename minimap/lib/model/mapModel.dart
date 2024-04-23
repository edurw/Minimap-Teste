// import 'package:flutter/material.dart';

class MapModel {
  final String nome;
  final double latitude;
  final double longitude;

  MapModel({
    required this.nome,
    required this.latitude,
    required this.longitude,
  });

  // Método para obter a localização do mapa como uma String
  String getLocation() {
    return 'Latitude: $latitude, Longitude: $longitude';
  }

  // Método para exibir o nome do mapa
  void showName() {
    print('Nome do mapa: $nome');
  }
}
