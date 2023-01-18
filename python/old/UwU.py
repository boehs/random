import os

def create(text):
    os.system('cls' if os.name == 'nt' else 'clear')  # clear the terminal
    width, height = os.get_terminal_size()  # get terminal width and height
    termwidth = round(width / 2 - len(text) / 2) - 1
    termheight = round(height / 2) - 2
    height = ''.join(("\n" for i in range(termheight)))
    width = ''.join((" " for i in range(termwidth)))
    print(height)
    print(width + text, end="\r")

if __name__ == "__main__":
    import time
    os.system('cls' if os.name == 'nt' else 'clear')
    while True:
        create("UwU")
        time.sleep(1)
        create("OwO")
        time.sleep(1)