text = input("what should be UwUifyed? \n")
final_text = ""
for letter in text:
    if letter in ("r", "l"):
        final_text += "w"
    elif letter in ("R", "L"):
        final_text += "W"
    else:
        final_text += letter

print("owoified text:" + "\n" + final_text + "\n")
end = input("Press enter to exit" + "\n")
