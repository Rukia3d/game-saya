type IPlayerEvent = {
  playerId: number;
  eventId: number;
  event: "CREATEPLAYER" | "STARTLEVEL" | "WINLEVEL";
};
export const player1Events: IPlayerEvent[] = [
  { playerId: 1, eventId: 0, event: "CREATEPLAYER" },
  { playerId: 1, eventId: 0, event: "STARTLEVEL" },
  { playerId: 1, eventId: 0, event: "WINLEVEL" },
];

export const player2Events: IPlayerEvent[] = [
  { playerId: 2, eventId: 0, event: "CREATEPLAYER" },
];
