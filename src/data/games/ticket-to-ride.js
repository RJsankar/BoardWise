/**
 * Ticket to Ride — route-tableau family
 * Scene data will be filled in Step 5.
 */
const ticketToRide = {
  game_id: 'ticket-to-ride',
  title: 'Ticket to Ride',
  family: 'route-tableau',
  complexity: 'light',
  theme: 'Claim railway routes across the country to complete secret destination tickets before your opponents cut you off.',
  player_count: '2–5',
  time_estimate: '45–75 min',

  player_goal: 'Score the most points by claiming routes, completing destination tickets, and earning the Longest Continuous Path bonus.',

  setup_steps: [
    'Lay out the board in the centre of the table.',
    'Each player picks a colour and takes matching train cars (45) and scoring marker.',
    'Shuffle and deal 4 Train Car cards to each player.',
    'Flip 5 Train Car cards face-up next to the draw deck.',
    'Deal 3 Destination Tickets to each player; each player keeps at least 2.',
    'Randomly choose the first player.',
  ],

  turn_loop: 'On your turn do exactly ONE of three actions: draw Train Car cards, claim a route, or draw Destination Tickets.',

  player_actions: [
    'Draw Train Car cards — take 2 cards from the face-up display or draw blind; a Locomotive (wild) from the face-up counts as both draws.',
    'Claim a route — play matching coloured cards equal to the route length; place your train pieces on the route.',
    'Draw Destination Tickets — draw 3 tickets, keep at least 1.',
  ],

  end_trigger: 'When any player has 2 or fewer train cars remaining at the end of their turn, every other player gets one final turn. Then scores are tallied.',

  scoring: 'Routes score 1/2/4/7/10/15 points for length 1/2/3/4/5/6. Completed tickets add their point value. Incomplete tickets deduct their point value. Longest Continuous Path earns 10 bonus points.',

  beginner_mistakes: [
    'Hoarding cards instead of claiming routes — you can run out of trains.',
    'Forgetting that incomplete tickets subtract points at end of game.',
    'Taking a Locomotive from the face-up row and thinking you still get a second draw.',
    'Blocking yourself by not planning an alternate route for a ticket.',
  ],

  edge_cases_to_defer: [
    'Double routes (only usable in 4–5 player games)',
    'Tunnel rules (Europe variant)',
    'Ferry routes requiring Locomotives (Europe variant)',
  ],

  example_first_turn: 'Player draws 2 Train Car cards — a Red and a Wild. They now have 5 cards in hand and are working toward claiming a 3-segment red route on their ticket.',

  components: [
    { id: 'train_car_card', label: 'Train Car Card', description: 'Coloured (or wild Locomotive) cards used to claim routes.' },
    { id: 'destination_ticket', label: 'Destination Ticket', description: 'Secret goal: connect two cities for bonus points. Incomplete = deducted.' },
    { id: 'train_piece', label: 'Train Piece', description: 'Your physical trains placed on claimed routes. You have 45.' },
    { id: 'route', label: 'Route', description: 'A coloured segment between two adjacent cities. Claimed by playing matching cards.' },
    { id: 'locomotive', label: 'Locomotive (Wild)', description: 'Acts as any colour. Taking one face-up uses both card draws for the turn.' },
    { id: 'scoring_marker', label: 'Scoring Marker', description: 'Tracks your score on the border track throughout the game.' },
  ],

  scenes: [
    // ── Stage 1: Intro ────────────────────────────────────────────
    {
      scene_id: 'ttr_s01',
      lesson_stage: 'intro',
      title: 'Welcome to Ticket to Ride',
      narration_text: 'You are a railway tycoon racing to connect cities across the continent. Collect coloured train cards, claim routes on the map, and complete your secret destination tickets before opponents block the tracks you need.',
      board_focus: 'full-board',
      image: '/assets/ttr-intro.png',
      components_involved: ['train_piece', 'route', 'destination_ticket'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Ticket to Ride is a route-claiming race with secret destination goals.',
      optional_quick_check: false,
    },

    // ── Stage 2: Objective ────────────────────────────────────────
    {
      scene_id: 'ttr_s02',
      lesson_stage: 'objective',
      title: 'How Do You Win?',
      narration_text: 'Score the most points. Points come from three sources: claiming routes (the longer the route, the more it scores), completing destination tickets (bonus points), and earning the Longest Continuous Path bonus (10 points). Incomplete tickets subtract their value.',
      board_focus: 'score-track',
      image: '/assets/ttr-cards.png',
      components_involved: ['destination_ticket', 'train_piece', 'scoring_marker'],
      highlight_targets: ['destination_ticket'],
      motion_primitive: 'count_up',
      user_takeaway: 'Routes + completed tickets + longest path = your score. Incomplete tickets hurt.',
      optional_quick_check: true,
    },

    // ── Stage 3: Setup ────────────────────────────────────────────
    {
      scene_id: 'ttr_s03',
      lesson_stage: 'setup',
      title: 'The Map, Routes & Your Trains',
      narration_text: 'The board shows a map covered in coloured routes between cities. Each player starts with 45 plastic train pieces and a scoring marker on zero. You also receive 4 Train Car cards dealt face-down to begin your hand.',
      board_focus: 'full-board',
      image: '/assets/ttr-board-map.png',
      components_involved: ['train_piece', 'route', 'scoring_marker'],
      highlight_targets: ['route', 'train_piece'],
      motion_primitive: 'highlight',
      user_takeaway: 'You have 45 trains — once they run low, the game is almost over.',
      optional_quick_check: false,
    },
    {
      scene_id: 'ttr_s04',
      lesson_stage: 'setup',
      title: 'Destination Tickets: Your Secret Goals',
      narration_text: 'Each player draws 3 Destination Tickets and must keep at least 2. Each ticket names two cities and a point value. Complete the connection by the end of the game to earn those points. Fail to connect them and those points are deducted. Keep tickets secret all game.',
      board_focus: 'destination-deck',
      image: '/assets/ttr-destination-tickets.png',
      components_involved: ['destination_ticket'],
      highlight_targets: ['destination_ticket'],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'Tickets are your hidden agenda — they guide every route decision you make.',
      optional_quick_check: false,
    },

    // ── Stage 4: Turn Loop ────────────────────────────────────────
    {
      scene_id: 'ttr_s05',
      lesson_stage: 'turn-loop',
      title: 'One Action Per Turn — No More, No Less',
      narration_text: 'On your turn, do exactly ONE of these three actions: draw 2 Train Car cards from the deck or face-up display, OR claim a route on the map by playing matching cards, OR draw 3 new Destination Tickets and keep at least 1.',
      board_focus: 'full-board',
      image: '/assets/ttr-turn-loop.png',
      components_involved: ['train_car_card', 'route', 'destination_ticket'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'One and only one action each turn: draw cards, claim route, or draw tickets.',
      optional_quick_check: true,
    },
    {
      scene_id: 'ttr_s06',
      lesson_stage: 'turn-loop',
      title: 'The Tension: Trains Are Finite',
      narration_text: 'You only have 45 train pieces. Every route you claim uses some up permanently. When any player drops to 2 or fewer trains at the end of their turn, every other player gets exactly one final turn — then the game ends. Manage your trains carefully.',
      board_focus: 'train-supply',
      image: '/assets/ttr-trains-finite.png',
      components_involved: ['train_piece'],
      highlight_targets: ['train_piece'],
      motion_primitive: 'count_up',
      user_takeaway: 'Running low on trains triggers the endgame. Don\'t waste them on low-value routes.',
      optional_quick_check: false,
    },

    // ── Stage 5: Core Actions ─────────────────────────────────────
    {
      scene_id: 'ttr_s07',
      lesson_stage: 'core-actions',
      title: 'Action 1: Draw Train Car Cards',
      narration_text: 'Draw 2 cards total — from the face-up display or the blind deck. Exception: if you take a face-up Locomotive (wild), that counts as both draws and your turn ends. Five face-up cards are always refreshed. If 3 or more face-up cards are Locomotives, discard all 5 and flip fresh ones.',
      board_focus: 'card-display',
      image: '/assets/ttr-draw-cards.png',
      components_involved: ['train_car_card', 'locomotive'],
      highlight_targets: ['train_car_card'],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'Taking a face-up Locomotive uses your entire draw action — choose wisely.',
      optional_quick_check: false,
    },
    {
      scene_id: 'ttr_s08',
      lesson_stage: 'core-actions',
      title: 'Action 2: Claim a Route',
      narration_text: 'Play a set of matching-coloured cards equal to the route\'s length and place your trains on it. Grey routes accept any single colour. Locomotives (wilds) substitute for any colour. Once claimed, no other player can take that route (in 2–3 player games).',
      board_focus: 'route-segments',
      image: '/assets/ttr-claim-route.png',
      components_involved: ['train_car_card', 'train_piece', 'locomotive', 'route'],
      highlight_targets: ['route', 'train_piece'],
      motion_primitive: 'move_token',
      user_takeaway: 'Match the route colour and length. Grey routes = any consistent colour.',
      optional_quick_check: true,
    },
    {
      scene_id: 'ttr_s09',
      lesson_stage: 'core-actions',
      title: 'Action 3: Draw Destination Tickets',
      narration_text: 'Draw 3 Destination Tickets from the deck and keep at least 1 (you may keep 2 or all 3). New tickets add risk — but the point bonuses can be huge. Only draw more tickets if your current routes already serve several destinations or if you\'re confident you can complete them.',
      board_focus: 'destination-deck',
      image: '/assets/ttr-europe-play.png',
      components_involved: ['destination_ticket'],
      highlight_targets: ['destination_ticket'],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'More tickets = more upside but more risk. Don\'t overdraw late game.',
      optional_quick_check: false,
    },

    // ── Stage 6: Example Round ────────────────────────────────────
    {
      scene_id: 'ttr_s10',
      lesson_stage: 'example-round',
      title: 'Example Turn: Build Toward a Ticket',
      narration_text: 'Priya\'s ticket connects Chicago to New Orleans. Turn 1: she draws 2 Red cards. Turn 2: she claims a 3-segment red route from Chicago south (plays 3 Red cards, places 3 trains, scores 4 points). Turn 3: she draws 2 more cards to prepare her next claim.',
      board_focus: 'route-segments',
      image: '/assets/ttr-example-turn.png',
      components_involved: ['train_car_card', 'train_piece', 'destination_ticket'],
      highlight_targets: ['route', 'destination_ticket'],
      motion_primitive: 'move_token',
      user_takeaway: 'Build a hand first, then claim routes — don\'t rush with too few cards.',
      optional_quick_check: false,
    },
    {
      scene_id: 'ttr_s11',
      lesson_stage: 'example-round',
      title: 'The Blocking Moment',
      narration_text: 'Priya needs one specific route to complete her ticket. On their turn, opponent Dev claims that exact route first. Now Priya must find an alternate path — or accept the point deduction. This is the central tension of every game.',
      board_focus: 'route-segments',
      image: '/assets/ttr-blocking.png',
      components_involved: ['route', 'train_piece'],
      highlight_targets: ['route'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Watch opponents\' routes — claim critical segments before they do.',
      optional_quick_check: false,
    },

    // ── Stage 7: Endgame ──────────────────────────────────────────
    {
      scene_id: 'ttr_s12',
      lesson_stage: 'endgame',
      title: 'Final Scoring',
      narration_text: 'After the last round: reveal all Destination Tickets. Add points for completed connections; subtract for incomplete ones. The player with the single longest continuous chain of trains (any path, can branch) earns 10 bonus points. Highest total wins.',
      board_focus: 'score-track',
      image: '/assets/ttr-final-scoring.png',
      components_involved: ['destination_ticket', 'scoring_marker', 'train_piece'],
      highlight_targets: ['destination_ticket'],
      motion_primitive: 'count_up',
      user_takeaway: 'Incomplete tickets can flip a win into a loss. Finish what you start.',
      optional_quick_check: true,
    },

    // ── Stage 8: Quick Reference (skippable) ─────────────────────
    {
      scene_id: 'ttr_qr1',
      lesson_stage: 'quick-reference',
      title: 'Route Scoring & Key Rules',
      narration_text: 'Route lengths → points: 1=1, 2=2, 3=4, 4=7, 5=10, 6=15. Taking a face-up Locomotive = both draws used. 3+ face-up Locomotives = discard all 5, flip new ones. In 2–3 players, each route can only be claimed once.',
      board_focus: 'full-board',
      image: '/assets/ttr-setup-complete.png',
      components_involved: ['route', 'locomotive'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Longer routes are exponentially more valuable. Prioritise 4–6 segment routes.',
      optional_quick_check: false,
    },
  ],

  quick_reference: [
    { id: 'qr1', question: 'Can I claim a grey route with any colour?', answer: 'Yes — play any one consistent colour (all the same) equal to the route length.' },
    { id: 'qr2', question: 'What if the face-up row has 3 or more Locomotives?', answer: 'Immediately discard all 5 face-up cards and flip 5 new ones.' },
    { id: 'qr3', question: 'Can two players share a route?', answer: 'In a 2–3 player game, no. Each route can only be claimed once.' },
    { id: 'qr4', question: 'When do I reveal my tickets?', answer: 'At end of game only. Keep them secret the entire game.' },
  ],
}

export default ticketToRide
