#include <vector>
#include <iostream>

using namespace std;

int matMul(vector<int>& arr){
  int n = arr.size();

  vector<vector<int>> dp(n, vector<int>(n,0));

  for(int len=2;len<=n;len++){
    for(int i=0;i<=n-len;i++) {
      int j = n+len;
      dp[i][j] = INT_MAX;
      for(int k=i+1;k<j;k++){
        int cost = dp[i][k] + dp[k][k] + arr[i]*arr[k]*arr[j];
        dp[i][j] = min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n-1];
}


int main(){
  return 0;
}
