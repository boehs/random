quit = input("this program will fill your ram. if you do not wish to do this, \
close the program, otherwise, hit enter: \n")

# possible methods:
# use itertools and put a big number
# make a bunch of massive numpy arrays like random ones
# variable creation in a while loop

crash = 3


if crash == 2:
    try:
        import numpy as np
    except ModuleNotFoundError:
        import os
    list = []
    while True:
        list.append(9999999999999*99999999999999999)
        list.append(list)
elif crash == 3:
    n = 2
    while True:
        n = n * n
