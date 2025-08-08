const clashRoyaleApi = require("./baseService.js");
const BattleLog = require("../models/battleLog.js");

exports.fetchAndSaveBattlelog = async (playerTag) => {
  try {
    const response = await clashRoyaleApi.get(
      `/players/%23${playerTag}/battlelog`
    );
    const battlelogsToSave = response.data.map((battle) => ({
      playerTag: playerTag,
      battle: battle,
    }));

    await BattleLog.deleteMany({ playerTag: playerTag });
    await BattleLog.insertMany(battlelogsToSave);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error on Clash Royale API: ${error.response.status} - ${error.response.data.reason}`
      );
    } else if (error.request) {
      throw new Error("Not possible to connect with Clash Royale API");
    } else {
      throw new Error(`Unknown error: ${error.message}`);
    }
  }
};

exports.getPlayerStats = async (playerTag) => {
  try {
    const battles = await BattleLog.find({ playerTag: playerTag });
    if (!battles || battles.length === 0) {
      throw new Error("No battles has been found for this player");
    }

    const stats = {
      totalBattles: battles.length,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0,
      favoriteDeck: {},
      decks: [],
    };

    const deckStats = {};

    battles.forEach((doc) => {
      const battle = doc.battle;

      const playerCrowns = battle.team[0].crowns;
      const opponentCrowns = battle.opponent[0].crowns;

      const deckCards = battle.team[0].cards.map((cards) => cards.name).sort();
      const uniqueDeckKey = deckCards.sort().join(",");

      if (!deckStats[uniqueDeckKey]) {
        deckStats[uniqueDeckKey] = {
          cards: deckCards,
          wins: 0,
          losses: 0,
          draws: 0,
          total: 0,
        };
      }

      deckStats[uniqueDeckKey].total++;
      if (playerCrowns > opponentCrowns) {
        stats.wins++;
        deckStats[uniqueDeckKey].wins++;
      } else if (playerCrowns < opponentCrowns) {
        stats.losses++;
        deckStats[uniqueDeckKey].losses++;
      } else {
        stats.draws++;
        deckStats[uniqueDeckKey].draws++;
      }
    });

    for (const key in deckStats) {
      const deck = deckStats[key];
      if (deck.total > 0) {
        deck.winRate = (deck.wins / deck.total) * 100;
      } else {
        deck.winRate = 0;
      }
      stats.decks.push(deck);
    }

    let mostUsedDeck = null;
    if (stats.decks.length > 0) {
      mostUsedDeck = stats.decks.reduce((prev, current) =>
        prev.total > current.total ? prev : current
      );
    }
    if (mostUsedDeck) {
      stats.favoriteDeck = {
        cards: mostUsedDeck.cards,
        usageCount: mostUsedDeck.total,
        winRate: mostUsedDeck.winRate,
      };
    }

    stats.winRate = (stats.wins / stats.totalBattles) * 100;

    return stats;
  } catch (error) {
    throw new Error(`Error to calculate your stats: ${error.message}`);
  }
};
