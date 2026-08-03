#include "24-4-26.h"

#include <set>

ListaOrdenadaRegistros::ListaOrdenadaRegistros() : registros() {}

void ListaOrdenadaRegistros::insertar(const Registro& r){
  registros.insert(r);
}

void ListaOrdenadaRegistros::eliminar(const Registro& r){
  registros.erase(r);
}

Registro ListaOrdenadaRegistros::mejorTiempo() const{
  return *registros.begin();
}

Registro ListaOrdenadaRegistros::peorTiempo() const {
  return *std::prev(registros.end());
}

bool ListaOrdenadaRegistros::pertenece(unsigned int tiempo) const{
  Registro buscar{0, tiempo};
  auto it = registros.lower_bound(buscar);
  return it != registros.end() && it->tiempo==tiempo;
}

bool ListaOrdenadaRegistros::vacia() const{
  return registros.empty();
}

int main(){

}
