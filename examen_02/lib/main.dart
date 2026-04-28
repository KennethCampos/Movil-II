import 'dart:math';
import 'package:flame/collisions.dart';
import 'package:flame/events.dart';
import 'package:flame/flame.dart';
import 'package:flame/game.dart';
import 'package:flame/components.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flame_audio/flame_audio.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Flame.device.setPortrait();
  final shapeGame = GameTemplate();
  runApp(GameWidget(game: shapeGame));
}

class GameTemplate extends FlameGame
    with HasKeyboardHandlerComponents, HasCollisionDetection {
  late Ship shipPlayer;
  late List<Square> squareEnemies;

  int totalHits = 0;
  int playerPoints = 100;
  int totalAttempts = 30; // 10 por cuadrado x 3
  bool gameOver = false;

  @override
  Future<void> onLoad() async {
    super.onLoad();
    add(HeaderTitle());

    add(shipPlayer = Ship(await loadSprite('triangle.png')));

    squareEnemies = [];
    for (int i = 0; i < 3; i++) {
      final sq = Square(await loadSprite('square.png'), i);
      squareEnemies.add(sq);
      add(sq);
    }

    await FlameAudio.audioCache.load('ball.wav');
    await FlameAudio.audioCache.load('explosion.wav');
  }

  void registerHit() {
    if (gameOver) return;
    totalHits++;
    playerPoints -= 20;
    if (playerPoints < 0) playerPoints = 0;
    if (totalHits > 5 || totalAttempts <= 0) {
      triggerGameOver();
    }
  }

  void registerCycleReset() {
    if (gameOver) return;
    totalAttempts--;
    if (totalAttempts <= 0) {
      triggerGameOver();
    }
  }

  void triggerGameOver() {
    gameOver = true;
    pauseEngine();
    overlays.add('gameOver');
  }
}

class Ship extends SpriteComponent
    with HasGameReference<GameTemplate>, CollisionCallbacks {

  final double spriteVelocity = 500;
  bool leftPressed  = false;
  bool rightPressed = false;
  bool upPressed    = false;
  bool downPressed  = false;

  // Cooldown para evitar múltiples golpes en un mismo frame
  double hitCooldown = 0.0;

  Ship(Sprite sprite) {
    debugMode = true;
    this.sprite = sprite;
    size = Vector2(50.0, 50.0);
    anchor = Anchor.center;
    // Aparece en la mitad de la pantalla (se ajusta en onGameResize)
    position = Vector2(200.0, 400.0);
    add(RectangleHitbox());
    add(KeyboardListenerComponent(
      keyDown: {
        LogicalKeyboardKey.keyA: (keysPressed) => leftPressed  = true,
        LogicalKeyboardKey.keyD: (keysPressed) => rightPressed = true,
        LogicalKeyboardKey.keyW: (keysPressed) => upPressed    = true,
        LogicalKeyboardKey.keyS: (keysPressed) => downPressed  = true,
      },
    ));
  }

  @override
  void onGameResize(Vector2 size) {
    super.onGameResize(size);
    // Posición inicial: mitad de pantalla
    position = Vector2(size.x / 2, size.y / 2);
  }

  @override
  void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
    super.onCollision(intersectionPoints, other);
    if (other is Square && hitCooldown <= 0) {
      game.registerHit();
      hitCooldown = 1.0; // 1 segundo de cooldown
    }
  }

  @override
  void update(double dt) {
    super.update(dt);

    if (hitCooldown > 0) hitCooldown -= dt;

    if (leftPressed) {
      double nx = position.x - spriteVelocity * dt;
      if (nx > width / 2) {
        position.x = nx;
        FlameAudio.play('ball.wav');
      }
      leftPressed = false;
    }
    if (rightPressed) {
      double nx = position.x + spriteVelocity * dt;
      if (nx < game.size.x - width / 2) {
        position.x = nx;
        FlameAudio.play('ball.wav');
      }
      rightPressed = false;
    }
    if (upPressed) {
      double ny = position.y - spriteVelocity * dt;
      if (ny > height / 2) {
        position.y = ny;
        FlameAudio.play('ball.wav');
      }
      upPressed = false;
    }
    if (downPressed) {
      double ny = position.y + spriteVelocity * dt;
      if (ny < game.size.y - height / 2) {
        position.y = ny;
        FlameAudio.play('ball.wav');
      }
      downPressed = false;
    }
  }
}

class Square extends SpriteComponent
    with HasGameReference<GameTemplate>, CollisionCallbacks {

  final Random _random = Random();
  double spriteVelocity = 100;
  bool isCollision = false;
  final int index;

  Square(Sprite sprite, this.index) {
    debugMode = true;
    this.sprite = sprite;
    size = Vector2(50.0, 50.0);
    anchor = Anchor.center;
    add(RectangleHitbox());
  }

  @override
  void onGameResize(Vector2 size) {
    super.onGameResize(size);
    // Posición inicial escalonada para cada cuadrado
    position = Vector2(
      80.0 + index * (size.x / 3),
      -50.0 - index * 60,
    );
    _randomizeSpeed();
  }

  void _randomizeSpeed() {
    spriteVelocity = 100 + _random.nextDouble() * 200; // 100–300
  }

  @override
  void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
    super.onCollision(intersectionPoints, other);
    isCollision = true;
  }

  @override
  void update(double dt) {
    super.update(dt);

    double ny = position.y + spriteVelocity * dt;
    if (ny < game.size.y + height) {
      position.y = ny;
    } else {
      // Reinicia ciclo
      if (!game.gameOver) {
        game.registerCycleReset();
        position.y = -height;
        position.x = 80.0 + index * (game.size.x / 3);
        _randomizeSpeed(); // Nueva velocidad aleatoria
      }
    }

    if (isCollision) {
      FlameAudio.play('explosion.wav');
      isCollision = false;
    }
  }
}

class HeaderTitle extends TextBoxComponent {

  final double xHeaderPosition = 100.0;
  final double yHeaderPosition = 20.0;

  final textPaint = TextPaint(
      style: const TextStyle(
          color: Colors.white,
          fontSize: 22.0,
          fontFamily: 'Awesome Font'));

  HeaderTitle() {
    position = Vector2(xHeaderPosition, yHeaderPosition);
  }

  @override
  void render(Canvas canvas) {
    textPaint.render(canvas, "Super Square Attack", position);
  }
}