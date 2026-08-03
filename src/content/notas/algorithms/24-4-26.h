#ifndef _24_4_26_H_
#define _24_4_26_H_

#include <set>

struct Registro{
  unsigned int id;
  unsigned int tiempo;
};

struct Comparator{
  bool operator()(const Registro& a, const Registro& b){
    if(a.tiempo != b.tiempo){
      return a.tiempo<b.tiempo;
    }
    return a.id<b.id;
  }
};

class ListaOrdenadaRegistros{
  private:
  std::set<Registro, Comparator> registros;

  public:
  ListaOrdenadaRegistros();

  void insertar(const Registro& r);
  void eliminar(const Registro& r);
  Registro mejorTiempo() const;
  Registro peorTiempo() const;
  bool pertenece(unsigned int tiempo) const;
  bool vacia() const;
};


#endif // _24_4_26_H_
