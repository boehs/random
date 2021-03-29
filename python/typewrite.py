import time

def typewrite(text):
    for char in text:
        print(char, flush=True, end="")
        time.sleep(0.1)

if __name__ == "__main__":
    import os
    os.system('cls' if os.name == 'nt' else 'clear')
    typewrite(input("What to Write: "))