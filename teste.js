function endGame(scene) {

    // Pausa toda a física (para tudo: inimigo, player, projéteis)
    scene.physics.pause();

    // Cancela o timer de disparo do inimigo
    if (scene.enemyShootTimer) {
        scene.enemyShootTimer.remove(false);
    }

    // Zera velocidade de tudo manualmente (caso algo já esteja em movimento)
    if (player && player.body) {
        player.setVelocity(0, 0);
    }

    if (enemy && enemy.body) {
        enemy.setVelocity(0, 0);
    }

    fireballs.getChildren().forEach(fb => {
        if (fb.body) fb.setVelocity(0, 0);
    });

    // Evita input do jogador após fim
    scene.input.keyboard.enabled = false;

    // Efeito visual opcional de congelamento
    scene.cameras.main.setAlpha(0.9);
}
