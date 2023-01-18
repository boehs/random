import os
import time

width, height = os.get_terminal_size()
width = width - 10
lyrics = []
try:
    with open("lyrics.txt", "r") as lyricstxt:
        for line in lyricstxt.readlines():
            lyrics.append(line.rstrip('\n'))
except FileNotFoundError:
    print("did not find lyrics.txt. making and filling with a epic rick roll.")
    lyrics = ["We're no strangers to love", 'You know the rules and so do I',
              "A full commitment's what I'm thinking of", "You wouldn't get this from any other guy", '',
              "I just wanna tell you how I'm feeling", 'Gotta make you understand', '', 'Never gonna give you up',
              'Never gonna let you down', 'Never gonna run around and desert you', 'Never gonna make you cry',
              'Never gonna say goodbye', 'Never gonna tell a lie and hurt you', '',
              "We've known each other for so long", "Your heart's been aching, but", "You're too shy to say it",
              "Inside, we both know what's been going on", "We know the game and we're gonna play it", '',
              "And if you ask me how I'm feeling", "Don't tell me you're too blind to see", '',
              'Never gonna give you up', 'Never gonna let you down', 'Never gonna run around and desert you',
              'Never gonna make you cry', 'Never gonna say goodbye', 'Never gonna tell a lie and hurt you', '',
              'Never gonna give you up', 'Never gonna let you down', 'Never gonna run around and desert you',
              'Never gonna make you cry', 'Never gonna say goodbye', 'Never gonna tell a lie and hurt you', '',
              '(Ooh, give you up)', '(Ooh, give you up)', 'Never gonna give, never gonna give', '(Give you up)',
              'Never gonna give, never gonna give', '(Give you up)', '', "We've known each other for so long",
              "Your heart's been aching, but", "You're too shy to say it", "Inside, we both know what's been going on",
              "We know the game and we're gonna play it", '', "I just wanna tell you how I'm feeling",
              'Gotta make you understand', '', 'Never gonna give you up', 'Never gonna let you down',
              'Never gonna run around and desert you', 'Never gonna make you cry', 'Never gonna say goodbye',
              'Never gonna tell a lie and hurt you', '', 'Never gonna give you up', 'Never gonna let you down',
              'Never gonna run around and desert you', 'Never gonna make you cry', 'Never gonna say goodbye',
              'Never gonna tell a lie and hurt you', '', 'Never gonna give you up', 'Never gonna let you down',
              'Never gonna run around and desert you', 'Never gonna make you cry', 'Never gonna say goodbye',
              'Never gonna tell a lie and hurt you']
    with open("lyrics.txt", 'w') as output:
        for row in lyrics:
            output.write(str(row) + '\n')

SleepTime = int(input("How long, on average, does a single line last (seconds)?: "))
time.sleep(SleepTime)
os.system('cls' if os.name == 'nt' else 'clear')

onLine = 0
LyricCount = int(len(lyrics))

while LyricCount > onLine:
    result_str = ''.join((" " for i in range(width)))

    print(lyrics[onLine], end="\r")
    onLine = onLine + 1
    time.sleep(SleepTime)
    print(result_str, end="\r")
print(result_str, end="\r")
print("That's it. Goodbye.")
time.sleep(5)
