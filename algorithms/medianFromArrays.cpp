#include "../../../../usr/lib/gcc/x86_64-pc-linux-gnu/15.2.1/include/limits.h"
#include <iostream>
#include <vector>
//
// Created by luka on 4/16/26.
//
using namespace std;

double getMedian(vector<int> &a, vector<int> &b) {
    int n = a.size();

    int low=0, high=n;

    while (low<=high) {
        int mid1 = (low+high)/2;
        int mid2 = n-mid1;

        int l1 = (mid1==0?INT_MIN:a[mid1-1]);
        int r1 = (mid1==n?INT_MAX:a[mid1]);

        int l2 = (mid2==0?INT_MIN:b[mid2-1]);
        int r2 = (mid2==n?INT_MAX:b[mid2]);

        if (l1<=r2 && l2<=r1) {
            return (max(l1,l2) + min(r1,r2))/2;
        }

        if (l1>r2) {
            high = mid1-1;
        }else {
            low= mid1+1;
        }
    }
    return 0;
}



int main() {
    vector<int> a = { 1, 12, 15, 26, 38 };
    vector<int> b = { 2, 13, 17, 30, 45 };

    cout << getMedian(a, b) << endl;

    return 0;
}

/*
 * tecnica de diseno divide y conquista
 *
 * explicacion costo temporal O(log(n))
 * en cada iteracion del bucle, el intervalo de busqueda se reduce
 * aproximadamente a la mitad
 *
 * n es la cantidad de cortes que se le pueden hacer al intervalo
 * k es el nro de iteraciones
 *
 * queda maximo una sola posicion por eso es <=1
 *  T(n) = (n+1)/2^k <= 1
 *
 * aplicando logaritmos:
 *
 * log2(n+1)<=k
 * O(log2(n))
 */
