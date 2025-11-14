function hitEnemy(objA, objB) {
    // DEBUG: ver quem chegou
    console.log("hitEnemy called - keys:", objA?.texture?.key, objB?.texture?.key, 
                "active:", objA?.active, objB?.active);

    // tenta detectar qual dos dois é o projétil (sword)
    const aIsSword = objA && objA.texture && objA.texture.key === 'sword';
    const bIsSword = objB && objB.texture && objB.texture.key === 'sword';

    let projectile = null;
    let target = null;

    if (aIsSword && !bIsSword) {
        projectile = objA;
        target = objB;
    } else if (bIsSword && !aIsSword) {
        projectile = objB;
        target = objA;
    } else {
        // caso incomum: nenhum é sword ou ambos são swords -> aborta
        console.warn("hitEnemy: não foi possível identificar projétil/target.", {aIsSword, bIsSword});
        return;
    }

    // garante que o alvo é mesmo o inimigo da cena
    if (target !== enemy) {
        console.warn("hitEnemy: alvo não é o inimigo esperado.", target);
        return;
    }

    // validações de segurança
    if (!projectile || !target) return;
    if (!projectile.active || !target.active || target.isInvulnerable) return;

    // remove/desativa o projétil com segurança
    if (projectile.disableBody) projectile.disableBody(true, true);
    // não é estritamente necessário destruir, mas garante que não vire confusão no pool
    if (projectile.destroy) projectile.destroy();

    // aplica dano ao alvo usando 'target' (evita confundir com a global)
    target.isInvulnerable = true;
    target.setAlpha(0.5);

    enemyLives = Math.max(0, enemyLives - 1);
    score += 100;
    scoreText.setText("Pontuação: " + score);
    enemyLivesText.setText("Enemy Lives: " + enemyLives);

    if (enemyLives > 0) {
        this.time.delayedCall(200, () => {
            if (target && target.setAlpha) target.setAlpha(1);
            if (target) target.isInvulnerable = false;
            if (target && target.body && target.body.velocity.y === 0) {
                const direction = Phaser.Math.Between(0, 1) === 0 ? -250 : 250;
                target.setVelocityY(direction);
            }
        }, [], this);
        return;
    }

    // inimigo morreu (use 'target' para operar)
    target.setTint(0x555555);
    target.setVelocity(0, 0);
    target.isInvulnerable = true;
    victoryText.setText("Você venceu!");
}
