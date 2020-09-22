import string
import time
import random
import os
sleep = 0.2
t = 150


# endregion
# region: generator
shouldRpt = True
while shouldRpt == True:
    width, height = os.get_terminal_size()
    width = width - 1
    letters_and_digits = string.ascii_uppercase + string.digits + " " + "{" + "}" + "[" + "]" + "<" + "." + "," + ">"
    letter = random.choice(letters_and_digits)
    inc = t
    numchar = 1
    while inc > 0:
        letters_and_digits = string.ascii_uppercase + string.digits + " "
        letter = random.choice(letters_and_digits)
        result_str = ''.join((random.choice(letters_and_digits) for i in range(width)))
        numchar = numchar + 1
        inc = inc - 1
        print(result_str)
        time.sleep(sleep)
# endregion