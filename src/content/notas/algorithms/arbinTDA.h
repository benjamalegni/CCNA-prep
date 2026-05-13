//
// Created by luka on 4/21/26.
//

#ifndef UNTITLED_ARBINTDA_H
#define UNTITLED_ARBINTDA_H

#endif //UNTITLED_ARBINTDA_H

template <typename T>

class bint {
public:
    void build(bint<T> * right, bint<T> * left, const T & value);

    bool empty() const;

    const T & root() const;

    bint * leftBranch() const;
    bint * rightBranch() const;

    bool isLeaf() const;
};