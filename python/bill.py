import os
import time
goodboy = 0
iambill = ("you")
goodboy = 0
print("Welcome to be like bill! this project is in pre alpha and may not work. currently only options 4 & 5 work, more are coming when bill has time to work on it. enjoy.")
time.sleep(8)
print("on line 86 there is a error, this is not bad coding, and is a issue on repls end see https://repl.it/bugs/p/python-3-multi-blank-new-lines-in-print-using-causes-int-error , we hope this will be fixed soon")
loop = True
time.sleep(7)
os.system('cls' if os.name == 'nt' else 'clear')
print("this")
time.sleep(.5)
print("is")
time.sleep(.7)
print("bill")
time.sleep(.5)
print("""          _
     ~0  (_|
    |(_~|^~~|
    TT/_ T"T
""")
gotit = input("""hello!, use numbers to control bill, ie.
  1: I understand
  2: I dont Understand
You Should Type 1 if you Understand or 2 if you Do not

Do you Understand?: """)
print("idc what you said here we go")
time.sleep(2)
os.system('cls' if os.name == 'nt' else 'clear')
billisu = input("""
Is bill you?
  1: Yes
  2: No
enter choice: """)
if billisu == ("1"):
  billisu = 1
else:
  billisu = 2
  iambill = ("Not You")
time.sleep(1)
print("""
bill is """ + iambill)
time.sleep(.5)
billsees = int(input("""
What action Does Bill The Boi Do?
  1: Bill Sees
  2: Bill Finds
  3: Bill Uses
  4: Bill Is
  5: Bill Does
  6: Bill Wants
Enter Choice: """))
if billsees == 1:
  billdoes = input("What does bill see?: ")
elif billsees == 2:
  billdoes = input("what does bill find?")
elif billsees == 3:
  billdoes = input("what does bill use")
elif billsees == 4:
  billdoes = input("What is bill? (ie. skinny, tall, ect)?: ")
  wholesome = input("""Is this a good thing?
  1: Yes
  2: No
  Ok whats up?:""")
  if wholesome == ("1"):
    billbrags = input("""Does bill brag about it?
  1: Yes
  2: No
  Well does he?: """)
    if billbrags == ("2"):
      goodboy = ["Does Not Brag", "Be"]
    else:
      goodboy = ["Brags ", "Don't be "]
    print("Bill is " + billdoes + """
    
  Bill """ + goodboy[0] + goodboy[1] + "like bill")
  elif wholesome == ("2"):
    better = input("""Does Bill want to inprove?
    1: Yes
    2: No
    Well?: """)
    if better == 1:
      goodboy = ["wants", "be like bill "]
    elif better == 2:
      goodboy = ["does not want", "dont be like bill "]
    print("Bill is " + billdoes + """
    
    He""" + goodboy[0] + (" ,") + goodboy[1])
elif billsees == 5:
  billdoes = input("what does bill do?: ")
  print("Bill Does " + billdoes + """
  
Be like bill""")