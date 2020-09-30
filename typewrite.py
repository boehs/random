import os
import time

os.system('cls' if os.name == 'nt' else 'clear')


def typewrite(text):
    for char in text:
        print(char, flush=True, end="")
        time.sleep(0.1)


typewrite(input("What to Write: "))
