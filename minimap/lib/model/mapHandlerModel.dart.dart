// import 'package:flutter/material.dart';

// Onde cria a classe mapa, através deste agrupar os dados necessários de um mapa
class Mapa {
  final String nome;
  final String blueprint;
  final String imagens;
  final int andares;
  final int setores;
  final int salas;
  final double latitude;
  final double longitude;

  Mapa({
    required this.nome,
    required this.blueprint,
    required this.imagens,
    required this.andares,
    required this.setores,
    required this.salas,
    required this.latitude,
    required this.longitude,
  });

  // Função para obter a localização do mapa como uma String
  String getLocation() {
    return 'Latitude: $latitude, Longitude: $longitude';
  }

  // Função para exibir o nome do mapa
  void showName() {
    print('Nome do mapa: $nome');
  }
}
