"use client"

import { useMemo } from "react"
import PropTypes from "prop-types"
import "../../styles/SeatLayout.css"

const SeatLayout = ({ seats, onSeatClick, selectedSeats }) => {
  
  const layoutByType = useMemo(() => {
    const flat = seats.flat()
    const byType = {}

    flat.forEach((seat) => {
      const { type, row } = seat
      if (!byType[type]) byType[type] = {}
      if (!byType[type][row]) byType[type][row] = []
      byType[type][row].push(seat)
    })

    // Sort seats numerically in each row
    Object.values(byType).forEach((rows) => {
      Object.values(rows).forEach((rowSeats) => {
        rowSeats.sort((a, b) => a.number - b.number)
      })
    })

    return byType
  }, [seats])

  // Detect consecutive blocks/gaps
  const getSections = (rowSeats) => {
    const sections = []
    let start = rowSeats[0].number
    let prev = start

    for (let i = 1; i < rowSeats.length; i++) {
      const num = rowSeats[i].number
      if (num === prev + 1) {
        prev = num
      } else {
        sections.push({ startSeat: start, endSeat: prev, gap: true })
        start = num
        prev = num
      }
    }
    sections.push({ startSeat: start, endSeat: prev, gap: false })
    return sections
  }

  const renderSeatSection = (rowSeats) => {
    const sections = getSections(rowSeats)

    return (
      <div className="seat-row-sections">
        {sections.map((sec, idx) => (
          <div key={idx} className="seat-section">
            <div className="seats-group">
              {Array.from({ length: sec.endSeat - sec.startSeat + 1 }, (_, i) => {
                const num = sec.startSeat + i
                const seat = rowSeats.find((s) => s.number === num)
                if (!seat) {
                  return (
                    <div key={num} className="seat-placeholder">
                      <span className="seat-number-placeholder">{num}</span>
                    </div>
                  )
                }
                const { id, status, price, type } = seat
                return (
                  <button
                    key={id}
                    className={`cinema-seat ${status}`}  // supports reserved
                    onClick={() => onSeatClick(seat)}
                    disabled={
                      status === "booked" ||
                      status === "unavailable" ||
                      status === "reserved"
                    }
                    title={`${seat.row}${seat.number} - ₹${price} (${type})`}
                  >
                    <span className="seat-number">{seat.number}</span>
                  </button>
                )
              })}
            </div>
            {sec.gap && <div className="aisle-gap"></div>}
          </div>
        ))}
      </div>
    )
  }

  const renderTier = (tierName, rowsObj) => {
    const sampleRow = rowsObj[Object.keys(rowsObj)[0]] || []
    const price = sampleRow.length > 0 ? sampleRow[0].price : 0

    return (
      <div key={tierName} className="pricing-tier">
        <div className="tier-header">
          <h6 className="tier-name">
            {tierName.toUpperCase()} (₹{price}.00)
          </h6>
        </div>
        <div className="tier-rows">
          {Object.keys(rowsObj)
            .sort()
            .map((row) => (
              <div key={row} className="cinema-row">
                <div className="row-label left">{row}</div>
                {renderSeatSection(rowsObj[row])}
                <div className="row-label right">{row}</div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="cinema-seat-layout">
      <div className="screen-indicator">
        <div className="screen-bar">
          <small className="screen-text">SCREEN</small>
        </div>
      </div>

      <div className="seating-area">
      {["EXECUTIVE", "PREMIUM", "VIP"].map((type) =>
  layoutByType[type] ? renderTier(type, layoutByType[type]) : null
)}

      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="cinema-seat available"></div>
          <small>Available</small>
        </div>
        <div className="legend-item">
          <div className="cinema-seat reserved"></div>
          <small>Reserved</small>
        </div>
        <div className="legend-item">
          <div className="cinema-seat selected"></div>
          <small>Selected</small>
        </div>
        <div className="legend-item">
          <div className="cinema-seat booked"></div>
          <small>Booked</small>
        </div>
        <div className="legend-item">
          <div className="cinema-seat unavailable"></div>
          <small>Unavailable</small>
        </div>
      </div>
    </div>
  )
}

SeatLayout.propTypes = {
  seats: PropTypes.array.isRequired,
  onSeatClick: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array,
}

export default SeatLayout
