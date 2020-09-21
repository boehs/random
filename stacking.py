import string
import time
import random
# region: config
numCorrect = False
while numCorrect == False:
    t = input("Max Stack Length?: ")
    try:
        int(t)
    except:
        #is not int
        print("Hmm, thats not right!")
    else:
        # is a int
        t = int(t)
        numCorrect = True

numCorrect = False
while numCorrect == False:
    sleep = input("How Long Between Lines? (Leave blank for default): ")
    if sleep == "" or sleep == " ":
        sleep = 0.03
        print("Set as default: " + str(sleep))
        numCorrect = True
    else:
        try:
            int(sleep)
        except:
            #is not int
            print("Hmm, thats not right!")
        else:
            # is a int
            sleep = int(sleep)
            numCorrect = True

numCorrect = False
while numCorrect == False:
    letter = input("What letter do you want? (Leave blank for random): ")
    if letter == "" or letter == " ":
        print("Set as random")
        numCorrect = True
        RanLetter = True
    else:
        numCorrect = True
        RanLetter = False
# endregion
# region: generator
while True:
    if RanLetter == True:
        letters_and_digits = string.ascii_uppercase + string.digits
        letter = random.choice(letters_and_digits)
    inc = t
    numchar = 1
    numchar2 = t
    while inc > 0:
        result_str = ''.join((letter for i in range(numchar)))
        numchar = numchar + 1
        inc = inc - 1
        print(result_str)
        time.sleep(sleep)
    while numchar2 > 0:
        result_str = ''.join((letter for i in range(numchar2)))
        numchar2 = numchar2 - 1
        print(result_str)
        time.sleep(sleep)
# endregion