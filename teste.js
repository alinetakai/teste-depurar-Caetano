function hitPlayer(player, fireball) {

    if (playerInvulnerable) return;
    if (!fireball.active || !fireball.body.enable) return;

    // Impede o mesmo projétil de causar múltiplos hits
    if (fireball.hasHit) return;  
    fireball.hasHit = true;

    // Agora sim desativa só o projétil que bateu
    fireball.disableBody(true, true);
    fireball.setActive(false);
    fireball.setVisible(false);

    console.log("Player atingido por fireball.");

    playerLives = Math.max(0, playerLives - 1);
    score -= 50;
    scoreText.setText("Pontuação: " + score);
    livesText.setText("Player Lives: " + playerLives);

    // Invulnerabilidade do jogador
    playerInvulnerable = true;
    player.setAlpha(0.5);

    this.time.delayedCall(1000, () => {
        playerInvulnerable = false;
        player.setAlpha(1);
    });

    // Game over
    if (playerLives <= 0) {
        victoryText.setDepth(9999)
        victoryText.setText("Você perdeu!");
        endGame(this);
    }
}
