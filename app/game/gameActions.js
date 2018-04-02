const db = require('../../models');

async function addGame(params) {
  const game = await db.Game.create(params);
  return game;
}

async function getGames() {
  const games = await db.Game.findAll({
    include: [{ model: db.User }, { model: db.Goal }]
  });
  return games;
}

async function getGame(gameId) {
  const game = await db.Game.findById(gameId, {
    include: [
      {
        model: db.User,
        include: [
          {
            model: db.Goal,
            where: {
              gameId
            }
          }
        ]
      }
    ]
  });
  return game;
}

async function removeGame({ gameId }) {
  await db.Game.destroy({ where: { id: gameId } });
}

async function joinGame({ userId, gameId, team }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);

  if (game && user) {
    await game.addUser(user, { through: { team } });
  }
}

async function leftGame({ userId, gameId }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);
  if (game && user) {
    await game.removeUser(user);
  }
}

async function startGame({ gameId }) {
  const game = await db.Game.findById(gameId);
  if (game) {
    await game.update({ status: 'STARTED' });
  }
  return game;
}

async function addGoal({ gameId, userId, ownGoal = false }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);
  const goal = db.Goal.build({ ownGoal });
  goal.setUser(user, { save: false })
  goal.setGame(game, { save: false })
  await goal.save()
  return goal;
}

async function removeLastGoal({ gameId, userId }) {
  const goal = await db.Goal.findOne({
    where: {
      gameId,
      userId
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });
  await goal.destroy()
}

async function finishGame({ gameId }) {
  const game = await db.Game.findById(gameId);
  if (game) {
    await game.update({ status: 'FINISHED' });
  }
  return game;
}

module.exports = {
  getGames,
  getGame,
  addGame,
  removeGame,
  joinGame,
  leftGame,
  startGame,
  addGoal,
  removeLastGoal,
  finishGame,
}