ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz'
ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ascii_letters = ascii_lowercase + ascii_uppercase
digits = '0123456789'
punctuation = r"""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""
printable = digits + ascii_letters + punctuation

import random

def genpass(length):
  result_str = ''.join((random.choice(printable) for i in range(length)))
  return result_str

if __name__ == "__main__":
    print("THIS IS NOT SECURE DON'T DO THIS")
    num = input("Enter Password Length: ")
    print(genpass((int(num))))