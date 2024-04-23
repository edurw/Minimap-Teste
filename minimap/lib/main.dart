import 'package:flutter/material.dart';
import 'package:minimap/homePage.dart';
// import 'package:minimap/view/mapView.dart'; // Importe a página do mapa

void main() {
  runApp(Minimap());
}

class Minimap extends StatelessWidget {
  const Minimap({super.key});

  @override
  Widget build(BuildContext context) {
    // var mapModel;
    return MaterialApp(
      title: 'Flutter Azure Map Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(), // Redirecione para a página do mapa
    );
  }
}
