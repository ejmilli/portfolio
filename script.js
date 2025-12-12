// Wait for DOM to load before initializing
$(document).ready(function() {
    // Initialize chess.js game
    var game = new Chess();

    // Set up a Mate-in-One puzzle
    // Black King on g8, trapped by White King on g6 and White Queen on f7
    // Solution: Qf7-f8# is checkmate (back rank mate)
    game.load('6k1/5Q2/6K1/8/8/8/8/8 w - - 0 1');

    // Initialize chessboard.js
    var board = Chessboard('myBoard', {
        position: game.fen(),
        draggable: true,
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    });

    // Only allow White pieces to be dragged
    function onDragStart(source, piece, position, orientation) {
        // Only allow moves when game is not over
        if (game.game_over()) return false;
        
        // Only allow White pieces to move (player is White)
        if (piece.search(/^b/) !== -1) return false;
    }

    // Validate and process the move
    function onDrop(source, target) {
        // Try to make the move
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // Always promote to queen for simplicity
        });
        
        // If the move is illegal, snap back
        if (move === null) return 'snapback';
        
        // Check if this move results in checkmate
        checkForCheckmate();
    }

    // Update board position after piece snap
    function onSnapEnd() {
        board.position(game.fen());
    }

    // Check if the puzzle is solved (checkmate)
    function checkForCheckmate() {
        if (game.in_checkmate()) {
            // Puzzle solved! Unlock the portfolio
            setTimeout(function() {
                unlockPortfolio();
            }, 500);
        } else if (game.game_over()) {
            // Game over but not checkmate (shouldn't happen in this puzzle)
            alert('Game over, but that\'s not checkmate. Try again!');
            game.reset();
            game.load('6k1/5Q2/6K1/8/8/8/8/8 w - - 0 1');
            board.position(game.fen());
        }
    }

    // Unlock the portfolio with enhanced animation
    function unlockPortfolio() {
        var puzzleScreen = document.getElementById('puzzle-screen');
        var portfolioContent = document.getElementById('portfolio-content');
        
        // Step 1: Instant feedback - Change hint text and color
        document.getElementById('puzzle-hint').textContent = '✓ Checkmate! Connection Established...';
        document.getElementById('puzzle-hint').style.color = '#4ade80';
        
        // Step 2: Fade and move the puzzle screen upward
        setTimeout(function() {
            puzzleScreen.classList.add('fade-out-move');
            
            // Step 3: Remove puzzle screen and reveal portfolio
            setTimeout(function() {
                puzzleScreen.style.display = 'none';
                portfolioContent.classList.remove('hidden');
                
                // Step 4: Fade in portfolio content with slight delay for smooth transition
                setTimeout(function() {
                    portfolioContent.classList.add('fade-in');
                }, 50);
            }, 1500); // Match the CSS transition duration
        }, 800); // Brief pause after checkmate message
    }
});
