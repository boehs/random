import time
import os

lyrics = []
with open("lyrics.txt", "r") as lyricstxt:
    for line in lyricstxt.readlines():
        lyrics.append(line.rstrip('\n'))
print(lyrics)
while True:
    print("*blink*", end='\r')
    time.sleep(1)
    print("       ", end='\r')
    time.sleep(1)