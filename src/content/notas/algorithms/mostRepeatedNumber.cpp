//
// Created by luka on 4/20/26.
//

#include <iostream>
#include <vector>

struct Result {
  int value;
  int freq;
};

using namespace std;

int findFirst(vector<int>& arr, int start, int end, int value) {
  int res = -1;

  while (start<=end) {
    int mid = start + (end-start)/2;

    if (arr[mid]==value) {
      res = mid;
      end = mid-1;
    }else if (arr[mid]>value){
      end = mid-1;
    }else {
      start = mid+1;
    }
  }
  return res;
}

int findEnd(vector<int>& arr, int start, int end, int value) {
  int res = -1;

  while (start<=end) {
    int mid = start + (end-start)/2;
    if (arr[mid]==value) {
      res = mid;
      start = mid+1;
    }else if (arr[mid]>value) {
      end = mid-1;
    }else {
      start = mid+1;
    }
  }
  return res;
}

Result mostRepeated(vector<int>& arr, int start, int end) {

  if (start>end) {return {0,0};}
  if (start>=end){return {arr[start], 1};}

  int mid = start + (end - start)/2;

  int firstPos = findFirst(arr, start, end, arr[mid]);
  int lastPos = findEnd(arr, start, end , arr[mid]);
  int freqMid = lastPos - firstPos + 1;

  Result currMax = {arr[mid], freqMid};

  if (firstPos - start > currMax.freq) {
    Result left = mostRepeated(arr, start, firstPos-1);
    if (left.freq>currMax.freq) {
      currMax = left;
    }
  }

  if (end - lastPos > currMax.freq) {
    Result right = mostRepeated(arr, lastPos+1, end);
    if (right.freq>currMax.freq) {
      currMax = right;
    }
  }

  return currMax;
}

int main() {
  vector<int> ex = {1, 2, 3, 5, 5, 5, 5, 5};

  cout<<"value: "<<mostRepeated(ex, 0, ex.size() - 1).value<<endl;
  cout<<"freq: "<<mostRepeated(ex, 0, ex.size() - 1).freq<<endl;

  return 0;
}
