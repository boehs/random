import os
import time
while True:
    os.system('cls' if os.name == 'nt' else 'clear') # clear the terminal
    width, height = os.get_terminal_size() # get terminal width and height
    text = "UwU"
    text2 = "OwO"
    termwidth = round(width / 2) - len(text) - 1
    termheight = round(height / 2) - 2
    result_str = ''.join(("\n" for i in range(termheight)))
    result_str2 = ''.join((" " for i in range(termwidth)))
    print(result_str)
    print(result_str2 + text, end="\r")
    time.sleep(1)
    print(result_str2 + text2, end="\r")
    time.sleep(1)