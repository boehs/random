import random as r
import time as t
import os as o

colors = ["\033[39m", "\033[30m", "\033[31m", "\033[32m", "\033[33m", "\033[34m", "\033[35m", "\033[36m", "\033[37m", "\033[90m", "\033[91m", "\033[92m", "\033[93m", "\033[94m", "\033[95m", "\033[96m", "\033[97m"] # pylint: disable=line-too-long
backgrounds = ["\033[49m", "\033[40m", "\033[41m", "\033[42m", "\033[43m", "\033[44m", "\033[45m", "\033[46m", "\033[47m", "\033[100m", "\033[101m", "\033[102m", "\033[103m", "\033[104m", "\033[105m", "\033[106m", "\033[107m"] # pylint: disable=line-too-long

# https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
# https://godoc.org/github.com/whitedevops/colors

invalid = True
while invalid:
    bg = input("ya want to go blind?: ")
    try:
        int(bg)
    except ValueError:
        if bg.upper() == "YES":
            bg = True
            invalid = False
        elif bg.upper() == "NO":
            bg = False
            invalid = False
    else:
        if int(bg) == 0:
            bg = False
            invalid = False
        elif int(bg) == 1:
            bg = True
            invalid = False

o.system('cls' if o.name == 'nt' else 'clear')

while True:
    if bg:
        print(r.choice(colors) + r.choice(backgrounds) + "Colors!", end="\r")
    elif not bg:
        print(r.choice(colors) + "Colors!", end="\r")
    t.sleep(0.1)
