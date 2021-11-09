import random
import string
import time

while True:
    # region: config
    numCorrect = False
    while not numCorrect:
        t = input("Max Stack Length?: ")
        try:
            int(t)
        except ValueError:
            # is not int
            print("Hmm, thats not right!")
        else:
            # is a int
            t = int(t)
            numCorrect = True

    numCorrect = False
    while not numCorrect:
        sleep = input("How Long Between Lines? (Leave blank for default): ")
        if sleep == "" or sleep == " ":
            sleep = 0.03
            print("Set as default: " + str(sleep))
            numCorrect = True
        else:
            try:
                int(sleep)
            except ValueError:
                # is not int
                print("Hmm, thats not right!")
            else:
                # is a int
                sleep = int(sleep)
                numCorrect = True

    numCorrect = False
    while not numCorrect:
        letter = input("What letter do you want? (Leave blank for random): ")
        if letter == "" or letter == " ":
            print("Set as random")
            numCorrect = True
            RanLetter = True
        else:
            numCorrect = True
            RanLetter = False

    numCorrect = False
    while not numCorrect:
        rpt = input("Should it repeat?")
        if rpt.lower() == "true" or rpt.lower() == "yes":
            print("repeating")
            rpt = True
            numCorrect = True
        elif rpt.lower() == "false" or rpt.lower() == "no":
            print("not repeating")
            rpt = False
            numCorrect = True
        else:
            print("""Hmm, try writing "yes" or "no"!""")
    # endregion
    # region: generator
    shouldRpt = True
    while shouldRpt:
        if RanLetter:
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
        if not rpt:
            print("done. loop repeating.")
            shouldRpt = False

    # endregion
