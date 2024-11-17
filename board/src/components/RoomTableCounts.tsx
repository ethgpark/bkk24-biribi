import { Table, Game, Room } from '../models/Room'

interface RoomTableCountsProps {
  room: Room
}

type RoomTableTotals = Record<Game, number>

function RoomTableCounts({ room }: RoomTableCountsProps) {
  const totals = room.tables.reduce<RoomTableTotals>(
    (gameTotals: RoomTableTotals, game: Table) => ({
      ...(gameTotals ?? {}),
      [game.game]: (gameTotals[game.game] ?? 0) + 1,
    }),
    {} as RoomTableTotals
  )

  return (
    <>
      {Object.entries(totals).map(
        ([gameType, gameTotal]) => (
          <label>{gameType}: {`${gameTotal}`}</label>
        )
      )}
    </>
  )
}

export default RoomTableCounts
