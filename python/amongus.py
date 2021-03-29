import os
import random
import time

os.system('cls' if os.name == 'nt' else 'clear')

players = 10
gamerun = 0
colors = ["red", "pink", "green", "yellow", "blue", "black", "purple", "brown", "cyan", "lime"]
tasks = ["navigation", "electical", "admin", "weapons"]
impostor = random.choice(colors)

print("There is one impostor among us")
time.sleep(5)

os.system('cls' if os.name == 'nt' else 'clear')

while True:
    players = len(colors)
    if len(colors) < 3:
        print("ha suckers! " + impostor + " was the imposter and they win")
        break
    responses = ["hi", "hi", "hi", random.choice(colors) + " is sus",
                 "how do I use the vents like " + random.choice(colors), "I was doing " + random.choice(tasks), "****",
                 "ok I am going to trail " + random.choice(colors), "**** *** *****"]
    if gamerun > 10:
        responses.remove("hi")
        responses.remove("hi")
    print(random.choice(colors) + " > " + random.choice(responses))
    if random.randint(1, 10) == 3:
        meetingtype = ["emergency meeting!", "body reported."]
        print(random.choice(meetingtype))
        time.sleep(3)
        for i in range(0, random.randrange(0, players)):
            print("I voted")
            time.sleep(0.3)
        time.sleep(3)

        if (x := random.choice(colors)) == impostor:
            print("Victory!", impostor, "was the impostor")
            break
        else:
            colors.remove(x)
            print(x, "was not the impostor")
    time.sleep(2)
    gamerun = gamerun + 1
