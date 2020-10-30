import pyotp
import os
import time
totp = pyotp.TOTP(input("enter your TOTP key WITHOUT spaces: \n"))
while True:
 time.sleep(2)
 os.system('cls' if os.name == 'nt' else 'clear')
 print(totp.now(), end="\r") # => '492039'
