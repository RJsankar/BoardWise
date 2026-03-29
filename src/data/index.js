import catan from './games/catan.js'
import ticketToRide from './games/ticket-to-ride.js'
import sequence from './games/sequence.js'
import monopolyDeal from './games/monopoly-deal.js'
import uno from './games/uno.js'

const games = {
  catan,
  'ticket-to-ride': ticketToRide,
  sequence,
  'monopoly-deal': monopolyDeal,
  uno,
}

export default games
