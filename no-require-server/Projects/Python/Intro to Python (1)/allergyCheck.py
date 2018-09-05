def main_loop():
    input_test = input("type some of what you've eaten in the last 24hrs: ")

    if("seafood" in input_test): print("It's true that 'seafood, dairy, nuts, chocolate' contains 'seafood'")
    else:print("It's not true that 'seafood, dairy, nuts, chocolate' contains", "'" + input_test + "'")

    if("dairy" in input_test): print("It's true that 'seafood, dairy, nuts, chocolate' contains 'dairy'")
    else:print("It's not true that 'seafood, dairy, nuts, chocolate' contains", "'" + input_test + "'")

    if("nuts" in input_test): print("It's true that 'seafood, dairy, nuts, chocolate' contains 'nuts'")
    else:print("It's not true that 'seafood, dairy, nuts, chocolate' contains", "'" + input_test + "'")

    if("chocolate" in input_test): print("It's true that 'seafood, dairy, nuts, chocolate' contains 'chocolate'")
    else:print("It's not true that 'seafood, dairy, nuts, chocolate' contains", "'" + input_test + "'")

while True:main_loop();