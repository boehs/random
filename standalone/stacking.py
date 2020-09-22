import string
import time
import random
while True:
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

    numCorrect = False
    while numCorrect == False:
        rpt = input("Should it repeat?")
        if rpt == "True" or rpt == "yes" or rpt == "Yes" or rpt == "YES" or rpt == "true":
            print("repeating")
            rpt = True
            numCorrect = True
        elif rpt == "False" or rpt == "no" or rpt == "No" or rpt == "NO" or rpt == "false":
            print("not repeating")
            rpt = False
            numCorrect = True
        else:
            print("""Hmm, try writing "yes" or "no"!""")
    # endregion
    # region: generator
    shouldRpt = True
    while shouldRpt == True:
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
        if rpt == False:
            print("done. loop repeating.")
            shouldRpt = False

    # endregion