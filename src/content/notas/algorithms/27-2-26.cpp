#include <vector>

int lengthOfLIS(std::vector<int> &nums) {
    int n = nums.size();
    std::vector<int> dp(n, 1);

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = std::max(dp[i], dp[j]+1);
          }
      }
    }
    int res = dp[0];
    for (int i = 1; i < n; i++) {
        res = std::max(res, dp[i]);
    }
    return res;
}


int main() {
    return 0;
}
