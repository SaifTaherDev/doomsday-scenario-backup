function transformPawn(piecePar) {
    switch (promotionPrompt.toLowerCase()) {
        case "rook":
            pieceArr[selectedPiece].name = "rook"
            validChoice = true
            break;
        case "knight":
            pieceArr[selectedPiece].name = "knight"
            validChoice = true
            break;
        case "bishop":
            pieceArr[selectedPiece].name = "bishop"
            validChoice = true
            break;
        case "queen":
            pieceArr[selectedPiece].name = "queen"
            validChoice = true
            break;
        default:
            validChoice = false
            break;
    }
    for (let piece of pieceArr) {
        if (piece.name == pieceArr[selectedPiece].name && piece.player == pieceArr[selectedPiece].player) {
            pieceArr[selectedPiece].img = piece.img
            pieceArr[selectedPiece].imgWidth = piece.imgWidth
        }
    }
}

function promote(piecePar) {
    if (piecePar.name == "pawn") {
        if (piecePar.player == "playerOne") {
            if (piecePar.row == 7) {
                promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
                transformPawn()
            }
        } else {
            if (piecePar.row == 0) {
                promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
                transformPawn()
            }
        }
    }
    while (validChoice == false) {
        promotionPrompt = prompt("You've been promoted! Choose from the following ranks: 1. Queen, 2. Bishop, 3. Rook, 4. Knight")
        transformPawn()
    }
}