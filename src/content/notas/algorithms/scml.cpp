//
// Created by luka on 4/23/26.
//

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int scml_n2(vector<int> seq) {
    if (seq.size()==0) return 0;

    vector<int> L(seq.size());
    for (int i = 0; i < seq.size(); i++) {
        L[i] = 1;
    }

    for (int i = 0; i<seq.size(); i++) {
        for (int j=0; j<i; j++) {
            if (e[j]<e[i]) {
                L[i] = max(L[i], L[j]+1);
            }
        }
    }

    int res = 1;
    for (int elem: L) {
        if (elem>res) res = elem;
    }
    return res;
}



int scml_nlogn(const vector<int>& seq) {
    vector<int> finales;

    for (int x : seq) {
        // lower_bound = O(nlogn)
        auto pos = lower_bound(finales.begin(), finales.end(), x);
        if (pos == finales.end()) {
            finales.push_back(x);
        } else {
            *pos = x;
        }
    }
    return static_cast<int>(finales.size());
}

int main() {
    int n;
    cin >> n;

    vector<int> secuencia(n);
    for (int i = 0; i < n; i++) {
        cin >> secuencia[i];
    }

    cout << scml(secuencia) << endl;
    return 0;
}
