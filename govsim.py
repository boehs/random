import time
import random
import os

#region: copypasta
flag = \
"""
  |* * * * * * * * * * OOOOOOOOOOOOOOOOOOOOOOOOO|
  | * * * * * * * * *  :::::::::::::::::::::::::|
  |* * * * * * * * * * OOOOOOOOOOOOOOOOOOOOOOOOO|
  | * * * * * * * * *  :::::::::::::::::::::::::|
  |* * * * * * * * * * OOOOOOOOOOOOOOOOOOOOOOOOO|
  | * * * * * * * * *  ::::::::::::::::::::;::::|
  |* * * * * * * * * * OOOOOOOOOOOOOOOOOOOOOOOOO|
  |:::::::::::::::::::::::::::::::::::::::::::::|
  |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|
  |:::::::::::::::::::::::::::::::::::::::::::::|
  |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|
  |:::::::::::::::::::::::::::::::::::::::::::::|
  |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|
"""
america = \
"""
                                                                       ___  
                                              .-.                     (   ) 
  .---.   ___ .-. .-.     .--.    ___ .-.    ( __)   .--.      .---.   | |  
 / .-, \ (   )   '   \   /    \  (   )   \   (''")  /    \    / .-, \  | |  
(__) ; |  |  .-.  .-. ; |  .-. ;  | ' .-. ;   | |  |  .-. ;  (__) ; |  | |  
  .'`  |  | |  | |  | | |  | | |  |  / (___)  | |  |  |(___)   .'`  |  | |  
 / .'| |  | |  | |  | | |  |/  |  | |         | |  |  |       / .'| |  | |  
| /  | |  | |  | |  | | |  ' _.'  | |         | |  |  | ___  | /  | |  | |  
; |  ; |  | |  | |  | | |  .'.-.  | |         | |  |  '(   ) ; |  ; |  |_|  
' `-'  |  | |  | |  | | '  `-' /  | |         | |  '  `-' |  ' `-'  |  .-.  
`.__.'_. (___)(___)(___) `.__.'  (___)       (___)  `.__,'   `.__.'_. (   ) 
                                                                       '-'  

"""

whatnexttemplate = \
"""\
What to do?
Step a year [1]
Senario [2]
"""
#endregion


# region: defs

def printlbl(speed, txtvar):
  import time 
  zero = 0
  num = txtvar.count("\n")
  samarica = txtvar.splitlines()
  while zero < num:
    print(samarica[zero])
    zero += 1
    time.sleep(speed)

def reelect():
  global year
  global president
  global senate
  global senatedtl
  global senateround
  global house
  global scort
  if year % 4 == 0: # presedent elect
    president = random.randrange(0, 100)
    if president > 50:
      president = 0
    else:
      president = 1
  if year % 2 == 0: # senate elect, house elect
    # senate
    senatedtl[senateround] = random.randrange(0,33)
    senateround =+ 1
    if senateround == 2:
      senateround = 0
    senate = senatedtl[0] + senatedtl[1] + senatedtl[2]
    # house
    house = random.randrange(0,435)
  # suprime court
  if random.randrange(0, 10) == 5:
    if president == 0:
      scort -= 1
    else:
      scort += 1

def init():
  global president
  global senate
  global senatedtl
  global house
  global scort
  president = random.randint(0,1)
  # senate
  senatedtl = [random.randrange(0,33), random.randrange(0,33), random.randrange(0,33)]
  senate = senatedtl[0] + senatedtl[1] + senatedtl[2]
  # house
  house = random.randrange(0,435)
  scort = random.randrange(0,9)
  

def genstats():
  global year
  global president
  global senate
  global house
  global scort
  
  if president == 0:
    prace = "democrate"
  else:
    prace = "republican"
  return "year is: " + str(year) + \
    "\npresident is a: " + prace + \
    "\nsenate standings are: " + str(senate) + "/" + str(99 - senate) + " (d/r)" + \
    "\nhouse standings are: " + str(house) + "/" + str(435 - house) + " (d/r)" + \
    "\nsupreme court standings are: " + str(scort) + "/" + str(9 - scort) + str(" (d/r)") + \
    "\n"

if __name__ == "__main__":
  president = senate = house = scort = 2
  senatedtl = []
  senateround = 0
  year = 0
  init()
  while True:
    os.system('cls' if os.name == 'nt' else 'clear')
    if year == 0:
      printlbl(0.05, america)
    width, height = os.get_terminal_size()
    dashes = ''.join(("-" for i in range(width//2)))
    printlbl(0.05, dashes + "\n\n\n")
    printlbl(1, genstats())
    while True:
      dashes = ''.join(("-" for i in range(width//2)))
      printlbl(0.05, "\n\n" + dashes + "\n\n\n")
      printlbl(0.05, whatnexttemplate)
      whatnext = input("Chose A Option: ")
      if int(whatnext) == 1:
        os.system('cls' if os.name == 'nt' else 'clear')
        year += 1
        reelect()
        break
      elif int(whatnext) == 3:
        os.system('cls' if os.name == 'nt' else 'clear')
        print(genstats())