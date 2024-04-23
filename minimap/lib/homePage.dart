import 'package:flutter/material.dart';
import 'package:minimap/components/appbar.dart';
import 'package:minimap/components/menu.dart';
import 'package:minimap/model/mapModel.dart';
import 'package:minimap/view/mapView.dart';

class HomePage extends StatelessWidget {
  // final MapModel mapModel;

  // const HomePage({
  //   Key? key,
  //   required this.mapModel,
  // }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var mapModel = MapModel(
        nome: '',
        latitude: 0.0,
        longitude: 0.0); // Inicialize um MapModel vazio
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Minimap',
        onMenuPressed: () {
          Scaffold.of(context).openDrawer();
        },
      ),
      drawer: CustomMenu(),
      body: MapView(mapModel: mapModel),
    );
  }
}
