import sys
import math

if len(sys.argv) != 2:
    print('Usage: python calculate_sqrt.py <number>')
    sys.exit(1)

try:
    number = float(sys.argv[1])
    result = math.sqrt(number)
    print(result)
except ValueError:
    print('Invalid input. Please enter a valid number.')
    sys.exit(1)
