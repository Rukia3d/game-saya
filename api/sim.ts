import * as readers from "./engine/readers";
const weaponChargePrice = 100;
const energyChargePrice = 50;
const numOfWeponUsedPerLevel = 3;
const storyTokenRewardIfCharged = 1;
const questTokenRewardIfCharged = 1;
const storyTokenRewardIfEmpty = 0;
const questTokenRewardIfEmpty = 0;
const storyEnergyPrice = 5;
const questEnergyPrice = 10;
const questGenPrice = 50;
const arenaBetSize = 5;
const maxWeaponCharge = 100;
const maxEnergy = 100;
let rewardPoolSize = 30;

interface TestPlayer {
  tokens: number;
  energy: number;
  weaponCharge: number;
  questsGenerated: number;
}

const playOneStory = (player: TestPlayer, win: boolean) => {
  if (win && player.weaponCharge > 0 && player.energy > 0) {
    return {
      ...player,
      tokens: player.tokens + storyTokenRewardIfCharged,
      weaponCharge: player.weaponCharge - numOfWeponUsedPerLevel,
      energy: player.energy - storyEnergyPrice,
    };
  }
  if (win && player.energy > 0) {
    return {
      ...player,
      tokens: player.tokens + storyTokenRewardIfEmpty,
      energy: player.energy - storyEnergyPrice,
    };
  } else {
    return player;
  }
};

const playOneQuest = (player: TestPlayer, win: boolean) => {
  if (win && player.weaponCharge > 0 && player.energy > 0) {
    return {
      ...player,
      tokens: player.tokens + questTokenRewardIfCharged,
      weaponCharge: player.weaponCharge - numOfWeponUsedPerLevel,
      energy: player.energy - questEnergyPrice,
    };
  }
  if (win && player.energy > 0) {
    return {
      ...player,
      tokens: player.tokens + questTokenRewardIfEmpty,
      energy: player.energy - questEnergyPrice,
    };
  } else {
    return player;
  }
};

const playArena = (player: TestPlayer) => {
  rewardPoolSize = rewardPoolSize + arenaBetSize;
  return {
    ...player,
    tokens: player.tokens - arenaBetSize,
  };
};

const rewardArena = (player: TestPlayer, win: number) => {
  if (win === 1) {
    return {
      ...player,
      tokens: player.tokens + Math.floor(rewardPoolSize / 2),
    };
  }
  if (win === 2) {
    return {
      ...player,
      tokens: player.tokens + Math.floor((rewardPoolSize * 30) / 100),
    };
  }
  if (win === 3) {
    return {
      ...player,
      tokens: player.tokens + Math.floor((rewardPoolSize * 20) / 100),
    };
  } else {
    return player;
  }
};

const chargeWeapon = (player: TestPlayer) => {
  if (player.weaponCharge <= 0 && player.tokens >= weaponChargePrice) {
    return {
      ...player,
      tokens: player.tokens - weaponChargePrice,
      weaponCharge: maxWeaponCharge,
    };
  } else {
    return player;
  }
};

const chargeEnergy = (player: TestPlayer, manual: boolean) => {
  if (player.energy <= 0 && manual) {
    return {
      ...player,
      tokens: player.tokens - energyChargePrice,
      energy: maxEnergy,
    };
  }
  if (player.energy <= 0) {
    return {
      ...player,
      energy: maxEnergy,
    };
  } else {
    return player;
  }
};

const generateQuest = (player: TestPlayer) => {
  if (player.tokens >= questGenPrice) {
    return {
      ...player,
      tokens: player.tokens - questGenPrice,
      questsGenerated: player.questsGenerated + 1,
    };
  } else {
    return player;
  }
};

const play = (
  player: TestPlayer,
  stories: number,
  quests: number,
  arena: number,
  arenaPlace: number
) => {
  let newPlayer = player;
  // play story
  console.log("------Day1------");
  console.log("Day1: beginning", newPlayer);
  for (let i = 0; i < stories; i++) {
    newPlayer = playOneStory(newPlayer, true);
  }
  console.log("Day1: after stories", newPlayer);
  // play quests
  for (let i = 0; i < quests; i++) {
    newPlayer = playOneQuest(newPlayer, true);
  }
  console.log("Day1: after quests", newPlayer);
  // play arena
  for (let i = 0; i < arena; i++) {
    newPlayer = playArena(newPlayer);
  }
  console.log("Day1: after arena", newPlayer);
  // take place in arena
  newPlayer = rewardArena(newPlayer, arenaPlace);
  console.log("Day1: after arena rewards", newPlayer);

  console.log("------Day2------");
  newPlayer = chargeEnergy(newPlayer, false);
  console.log("Day2: beginning", newPlayer);

  return newPlayer;
};

let player1: TestPlayer = {
  tokens: 0,
  energy: 100,
  weaponCharge: 100,
  questsGenerated: 0,
};

play(player1, 10, 5, 2, 1);
