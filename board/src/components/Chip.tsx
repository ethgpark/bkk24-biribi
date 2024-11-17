interface ChipProps {
  value: 50 | 100 | 500 | 1000
}

function Chip({ value }: ChipProps) {
  return <img src={`/images/chips/${value}.png`} alt={`Bet ${value}`} />
}

export default Chip
