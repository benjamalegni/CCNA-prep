#include <bits/stdc++.h>

//
// Created by luka on 4/16/26.
//

using namespace std;

int matrixMultiplication(vector<int>& arr) {
    int n = arr.size();

    // vector 2D para almacenar los costos minimos de multiplicacion
    vector<vector<int>> dp(n, vector<int>(n, 0));

    for (int len=2; len<n; len++) {
        for (int i=0; i<n-len; i++) {
            /*
             * i es el inicio del intervalo
             * j es el final del intervalo
             * y como la longitud es len entonces
             * j se calcula como la suma del inicio + la longitud
             *
             * el limite de este array es justamente proporcional a j
             * y se le resta len al limite de loop porque luego se le va a sumar len
             */


            int j = i + len;
            dp[i][j] = INT_MAX;

            for (int k=i+1; k<j; k++) {
                int cost = dp[i][k] + dp[k][j] + arr[i] * arr[k] * arr[j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }

    }
    return dp[0][n-1];
}
