budget = 11347
cut = "Oval"
preferred_cuts = ["Heart", "Emerald", "Marquise", "Round"]
color = "P"
clarity = "F"
carat = 4.7

colorRating = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
clarityRating = ['I', 'SI', 'VS', 'VVS', 'IF', 'F']

def calcPrice(clarityPar, colorPar, weight):
    colorPercent = 1.00
    clarityMultiplier = 1
    total = 100;
    colorPercent = 1.00
    for rating in colorRating[:colorRating.index(colorPar)]:
        colorPercent -= 0.02
    colorPercent = round(colorPercent, 2)
    for rating in clarityRating[:clarityRating.index(clarityPar)]:
        clarityMultiplier = clarityMultiplier * 2
    total *= colorPercent * clarityMultiplier * weight
    return total

if calcPrice(clarity, color, carat) < budget and cut in preferred_cuts:
    print("I'll take it!")
else:
    print("No thanks")