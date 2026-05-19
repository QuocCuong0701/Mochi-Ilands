interface Props {
  count: number
}

export default function StarBadge({ count }: Props) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: '#FFF3D6',
      border: '2px solid #FFB347',
      borderRadius: '50px',
      padding: '5px 14px 5px 8px',
      fontWeight: 800,
      fontSize: '14px',
      color: '#B85C00',
      fontFamily: 'var(--font-body)',
    }}>
      ⭐ {count} Star Fruits
    </span>
  )
}
