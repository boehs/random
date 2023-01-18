import os
import random
import string
import time

sleep = 0.2
t = 150
print("\033[32m")

while True:
    width, height = os.get_terminal_size()
    width = width - 1
    letters_and_digits = string.ascii_uppercase + string.digits + " " + "{" + "}" + "[" + "]" + "<" + "." + "," + ">" + ""
    letter = random.choice(letters_and_digits)
    result_str = ''.join((random.choice(letters_and_digits) for i in range(width)))
    print(result_str)
    time.sleep(sleep)
