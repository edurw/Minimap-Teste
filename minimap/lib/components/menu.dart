import 'package:flutter/material.dart';

class CustomMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Menu',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            title: Text('Opção 1'),
            onTap: () {
              // Implemente a ação da opção 1 aqui
            },
          ),
          ListTile(
            title: Text('Opção 2'),
            onTap: () {
              // Implemente a ação da opção 2 aqui
            },
          ),
          ListTile(
            title: Text('Opção 3'),
            onTap: () {
              // Implemente a ação da opção 3 aqui
            },
          ),
        ],
      ),
    );
  }
}
