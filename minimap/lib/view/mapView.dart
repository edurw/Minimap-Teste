import 'package:flutter/material.dart';
import 'package:minimap/model/mapModel.dart';

class MapView extends StatelessWidget {
  final MapModel mapModel;

  const MapView({
    Key? key,
    required this.mapModel,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Text(
        'Mapa: ${mapModel.nome}',
        style: TextStyle(fontSize: 20),
      ),
    );
  }
}
