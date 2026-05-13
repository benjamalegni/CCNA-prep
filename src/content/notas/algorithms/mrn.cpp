//
// Created by luka on 4/22/26.
//

#include <vector>
#include <cassert>
#include <iostream>

using namespace std;

struct Result {
    int value;
    int freq;
};

int findFirst(vector<int>& arr, int start, int end, int value) {
    int res = -1;

    while (start<=end) {
        int mid = start + (end-start)/2;
        if (arr[mid]==value) {
            res=mid;
            end=mid-1;
        }else if (arr[mid]>value) {
            end=mid-1;
        }else {
            start=mid+1;
        }
    }
    return res;
}

int findLast(vector<int>& arr, int start, int end, int value) {
    int res = -1;

    while (start<=end) {
        int mid = start + (end-start)/2;
        if (arr[mid]==value) {
            res=mid;
            start=mid+1;
        }else if (arr[mid]>value) {
            end=mid-1;
        }else {
            start=mid+1;
        }
    }
    return res;
}

Result findMostRepeated(vector<int>& arr, int start, int end) {
    if (start==end) {
        return {arr[start], 1};
    }

    if (start>end) {
        return {0,0};
    }

    int mid = start + (end-start)/2;

    int firstPos = findFirst(arr, start, end, arr[mid]);
    int lastPos = findLast(arr, start, end, arr[mid]);
    int freqMid = lastPos - firstPos + 1;

    Result mostRepeated = {arr[mid], freqMid};

    Result leftMostRepeated = findMostRepeated(arr, start, firstPos-1);
    if (leftMostRepeated.freq>mostRepeated.freq) {
        mostRepeated = leftMostRepeated;
    }

    Result rightMostRepeated = findMostRepeated(arr, lastPos+1, end);
    if (rightMostRepeated.freq>mostRepeated.freq) {
        mostRepeated = rightMostRepeated;
    }
    return mostRepeated;
}


int main() {
    return 0;
}