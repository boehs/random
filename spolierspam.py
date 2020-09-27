while True:
    while True:
        stack = input("stack or not (0 for stacking, 1 for no):")
        try:
            int(stack)
        except ValueError:
            print("that aint it cheif")
        else:
            stack = int(stack)
            if stack == 0:
                stack = False
                break
            elif stack == 1:
                stack = True
                break
            else:
                print("that aint it cheif")
    sentence = input("Enter your text: ")
    spoiledSentence = ""
    if stack == False:
        for letter in sentence:
            spoiledSentence = spoiledSentence + "||" + letter + "||"
            print(spoiledSentence)
    elif stack == True:
        for letter in sentence:
            spoiledSentence = spoiledSentence + "||" + letter + "||"
        print(spoiledSentence)