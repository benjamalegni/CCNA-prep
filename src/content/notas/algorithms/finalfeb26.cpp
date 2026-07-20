//
// Created by luka on 7/7/26.
//

#import <vector>

using namespace std;

int buscarRotadoRec(vector<int>& secuencia, const int& k, int inicio, int fin) {
    if (inicio>fin){return -1;};
    int medio = inicio + (inicio-fin)/2;
    if (secuencia[medio]==k) {
        return medio;
    }

    if (secuencia[inicio]<secuencia[medio]) {
        bool estaEnElMedio = secuencia[inicio]<=k && k<=secuencia[medio];

        if (estaEnElMedio) {
            return buscarRotadoRec(secuencia, k, inicio, medio-1);
        }else {
            return buscarRotadoRec(secuencia, k, medio+1, fin);
        }
    }

    if (secuencia[medio]<secuencia[fin]) {
        bool estaEnElMedio = secuencia[medio]<=k && k<=secuencia[fin];

        if (estaEnElMedio) {
            return buscarRotadoRec(secuencia, k, medio+1, fin);
        }else {
            return buscarRotadoRec(secuencia, k, inicio, medio-1);
        }
    }

}

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int inicio = 0;
        int final = nums.size() - 1;

        while (inicio <= final) {
            int medio = inicio + (final - inicio) / 2;

            if (nums[medio] == target) {
                return medio;
            }

            if (nums[inicio] <= nums[medio]) {
                if (nums[inicio] <= target && target <= nums[medio]) {
                    final = medio - 1;
                } else {
                    inicio = medio + 1;
                }
            } else {
                if (nums[medio] <= target && target <= nums[final]) {
                    inicio = medio + 1;
                } else {
                    final = medio - 1;
                }
            }
        }
        return -1;
    }
};

int main() {
    return 0;
}