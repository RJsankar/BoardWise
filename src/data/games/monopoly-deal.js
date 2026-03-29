/**
 * Monopoly Deal — property-collection card game
 */
const monopolyDeal = {
  game_id: 'monopoly-deal',
  title: 'Monopoly Deal',
  family: 'property-collection',
  complexity: 'light',
  theme: 'Race to collect 3 complete property sets by playing cards, charging rent, and stealing from opponents — before they do it to you.',
  player_count: '2–5',
  time_estimate: '15–30 min',

  player_goal: 'Be the first player to collect 3 complete property sets in front of you.',

  setup_steps: [
    'Shuffle the deck thoroughly.',
    'Deal 5 cards to each player.',
    'Place the remaining cards face-down as the draw pile.',
    'Leave space in front of each player for their property area and bank.',
    'Choose a first player.',
  ],

  turn_loop: 'Draw 2 cards from the pile, then play up to 3 cards in any combination (properties, actions, or money to bank). End your turn — your hand has no maximum.',

  player_actions: [
    'Play a property card — place it face-up in your property area',
    'Play a money card to your bank (counts as 1 of your 3 plays)',
    'Play an action card — charge rent, steal, or use special effects',
    'Play a wild property card to any colour set you choose',
    'Say "Just Say No" to cancel any action played against you',
  ],

  end_trigger: 'The moment any player has 3 complete property sets in front of them, the game ends immediately — even mid-turn.',

  scoring: 'No points — the first player to complete 3 full colour property sets wins outright. Partial sets do not count.',

  beginner_mistakes: [
    'Forgetting you can only play up to 3 cards per turn — you must stop even if you have more.',
    'Putting money into your bank when you could win by playing a property instead.',
    'Forgetting that "Just Say No" can be countered by another "Just Say No".',
    'Not reading what each action card says — effects vary significantly.',
    'Ignoring opponents who are one property away from completing a set.',
  ],

  edge_cases_to_defer: [
    'House and Hotel cards can only be played on a complete set.',
    'Multi-colour wild cards can be moved between sets freely on your turn (not mid-action).',
    'If the draw pile runs out, shuffle the discard pile to form a new one.',
  ],

  example_first_turn: 'Player draws 2 cards (now has 7). They play a Blue property (1), a $2M money card to bank (2), and a Rent card charging all players for Blue/Green (3). Opponents must pay from their banks or give properties if they have no money.',

  components: [
    { id: 'property_card', label: 'Property Card', description: 'Belongs to a colour set. Collect a full set to win. Shows rental values and set size.' },
    { id: 'action_card', label: 'Action Card', description: 'Powerful one-use effects: Rent, Deal Breaker, Sly Deal, Forced Deal, Debt Collector, Birthday, Pass Go, Double the Rent.' },
    { id: 'money_card', label: 'Money Card', description: 'Played face-up to your bank to pay debts. Values range from $1M to $10M.' },
    { id: 'wild_card', label: 'Wild Property Card', description: 'Counts as any colour. Multi-colour wilds can be moved between sets on your turn.' },
    { id: 'just_say_no', label: 'Just Say No', description: 'Cancels any action card played against you. Can itself be countered by another Just Say No.' },
    { id: 'deal_breaker', label: 'Deal Breaker', description: 'Steals a complete property set from any opponent. The most powerful card in the game.' },
    { id: 'rent_card', label: 'Rent Card', description: 'Charges opponents rent for your matching colour set. Double the Rent can be stacked with it.' },
  ],

  scenes: [
    // ── Stage 1: Intro ────────────────────────────────────────────
    {
      scene_id: 'md_s01',
      lesson_stage: 'intro',
      title: 'Welcome to Monopoly Deal',
      narration_text: 'Monopoly Deal takes the classic property game and distills it into a fast card game. No board, no dice — just cards. Collect properties, charge rent, steal from rivals, and be the first to complete 3 colour sets. A full game takes 15–30 minutes.',
      board_focus: 'full-hand',
      components_involved: ['property_card', 'action_card', 'money_card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Monopoly Deal is a quick, cutthroat card game. First to 3 complete sets wins.',
      optional_quick_check: false,
    },

    // ── Stage 2: Objective ────────────────────────────────────────
    {
      scene_id: 'md_s02',
      lesson_stage: 'objective',
      title: 'The Goal: 3 Complete Sets',
      narration_text: 'Each colour group (Brown, Light Blue, Pink, Orange, Red, Yellow, Green, Dark Blue, Railroad, Utility) has a fixed number of properties. You win the moment you have 3 fully complete colour sets laid in front of you — no partial sets count.',
      board_focus: 'property-area',
      components_involved: ['property_card'],
      highlight_targets: ['property_card'],
      motion_primitive: 'count_up',
      user_takeaway: '3 complete colour sets = instant win. Partial sets count for nothing.',
      optional_quick_check: false,
    },
    {
      scene_id: 'md_s03',
      lesson_stage: 'objective',
      title: 'The Three Play Areas',
      narration_text: 'In front of each player are three zones: your Hand (private), your Property Area (face-up colour sets), and your Bank (face-up money pile). Your property area and bank are visible to everyone — plan around what opponents have.',
      board_focus: 'player-area',
      components_involved: ['property_card', 'money_card'],
      highlight_targets: ['property_card', 'money_card'],
      motion_primitive: 'highlight',
      user_takeaway: 'Properties and bank are public. Hand is private. Opponents can see your progress.',
      optional_quick_check: true,
    },

    // ── Stage 3: Setup ────────────────────────────────────────────
    {
      scene_id: 'md_s04',
      lesson_stage: 'setup',
      title: 'Deal & Draw Pile',
      narration_text: 'Shuffle the 110-card deck. Deal 5 cards to each player — these go into your hand. The remaining cards form the face-down draw pile. There is no discard pile at the start. Property areas and banks start empty.',
      board_focus: 'draw-pile',
      components_involved: ['property_card', 'action_card', 'money_card'],
      highlight_targets: [],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'Start with 5 cards. Everything else in the draw pile.',
      optional_quick_check: false,
    },

    // ── Stage 4: Turn Loop ────────────────────────────────────────
    {
      scene_id: 'md_s05',
      lesson_stage: 'turn-loop',
      title: 'Draw 2, Play Up to 3',
      narration_text: 'Every turn: first draw 2 cards from the pile (if the pile is empty, you draw 1). Then play up to 3 cards in any order — properties to your property area, money to your bank, or action cards. You may play fewer than 3. There is no hand limit.',
      board_focus: 'draw-pile',
      components_involved: ['property_card', 'action_card', 'money_card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Draw 2, play up to 3. Never more than 3 plays per turn.',
      optional_quick_check: true,
    },
    {
      scene_id: 'md_s06',
      lesson_stage: 'turn-loop',
      title: 'Paying Debts',
      narration_text: 'When someone charges you rent or plays a Debt Collector or Birthday card, you must pay. Pay from your bank first. If your bank runs dry, you may give property cards as payment. If you have nothing, you pay nothing — you cannot go into debt.',
      board_focus: 'bank-area',
      components_involved: ['money_card', 'property_card', 'rent_card'],
      highlight_targets: ['money_card'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Pay debts from bank, then properties. You can never owe more than you have.',
      optional_quick_check: false,
    },

    // ── Stage 5: Core Actions ─────────────────────────────────────
    {
      scene_id: 'md_s07',
      lesson_stage: 'core-actions',
      title: 'Rent Cards',
      narration_text: 'Rent cards charge all opponents (or one player) rent based on how many properties you have in that colour. Pair a "Double the Rent" card with any rent card to collect twice the amount — this counts as 2 of your 3 plays for the turn.',
      board_focus: 'property-area',
      components_involved: ['rent_card', 'property_card'],
      highlight_targets: ['rent_card'],
      motion_primitive: 'count_up',
      user_takeaway: 'More properties in a set = higher rent. Double the Rent stacks with any rent card.',
      optional_quick_check: false,
    },
    {
      scene_id: 'md_s08',
      lesson_stage: 'core-actions',
      title: 'Sly Deal & Forced Deal',
      narration_text: 'Sly Deal: steal any single property (not in a complete set) from any opponent. Forced Deal: swap one of your properties for any single property (not in a complete set) from an opponent. Both are blockable with Just Say No.',
      board_focus: 'property-area',
      components_involved: ['action_card', 'property_card', 'just_say_no'],
      highlight_targets: ['action_card'],
      motion_primitive: 'move_token',
      user_takeaway: 'Sly Deal steals. Forced Deal swaps. Neither works on complete sets.',
      optional_quick_check: false,
    },
    {
      scene_id: 'md_s09',
      lesson_stage: 'core-actions',
      title: 'Deal Breaker',
      narration_text: 'Deal Breaker steals an entire complete property set from any opponent. It is the most powerful card in the game. Your opponent can block it with Just Say No — and you can counter their Just Say No with your own Just Say No.',
      board_focus: 'property-area',
      components_involved: ['deal_breaker', 'just_say_no', 'property_card'],
      highlight_targets: ['deal_breaker'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Deal Breaker takes a full set. Always blockable — always blockable twice.',
      optional_quick_check: false,
    },
    {
      scene_id: 'md_s10',
      lesson_stage: 'core-actions',
      title: 'Just Say No',
      narration_text: 'Just Say No cancels any action card played against you — rent charges, steals, deal breakers, birthday, or debt collector. It does not count as one of your 3 plays; it is played instantly in response. Your opponent can respond with their own Just Say No to cancel yours.',
      board_focus: 'hand',
      components_involved: ['just_say_no', 'action_card'],
      highlight_targets: ['just_say_no'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Just Say No = instant counter. Save it for Deal Breakers and full-set rents.',
      optional_quick_check: true,
    },
    {
      scene_id: 'md_s11',
      lesson_stage: 'core-actions',
      title: 'Pass Go, Birthday & Debt Collector',
      narration_text: 'Pass Go: draw 2 extra cards from the pile. Birthday: collect $2M from every other player. Debt Collector: one opponent must pay you $5M. These count as 1 of your 3 plays each. Great for building your bank without spending properties.',
      board_focus: 'hand',
      components_involved: ['action_card', 'money_card'],
      highlight_targets: ['action_card'],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'Pass Go refills your hand. Birthday/Debt Collector fill your bank fast.',
      optional_quick_check: false,
    },

    // ── Stage 6: Example Round ────────────────────────────────────
    {
      scene_id: 'md_s12',
      lesson_stage: 'example-round',
      title: 'Example Turn: Build Toward a Win',
      narration_text: 'Priya draws 2 cards. She has a Red property, a Rent (Red/Yellow) card, and a $3M money. Play 1: places the Red property (now has 2 of 3 Reds). Play 2: plays Rent — Dev and Rohan each owe $3M. Play 3: adds $3M to her bank as insurance. End of turn.',
      board_focus: 'property-area',
      components_involved: ['property_card', 'rent_card', 'money_card'],
      highlight_targets: ['property_card'],
      motion_primitive: 'move_token',
      user_takeaway: 'Mix properties, rent, and bank plays each turn to build on every front.',
      optional_quick_check: false,
    },
    {
      scene_id: 'md_s13',
      lesson_stage: 'example-round',
      title: 'When to Just Say No',
      narration_text: 'Dev plays Deal Breaker targeting Priya\'s complete Red set. She has one Just Say No in hand — she plays it immediately. Dev counters with his own Just Say No. Priya has no second Just Say No, so the Deal Breaker goes through. Timing and saving your Just Say No matters.',
      board_focus: 'hand',
      components_involved: ['deal_breaker', 'just_say_no'],
      highlight_targets: ['just_say_no'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Save Just Say No for the most painful steal — especially complete sets.',
      optional_quick_check: false,
    },

    // ── Stage 7: Endgame ──────────────────────────────────────────
    {
      scene_id: 'md_s14',
      lesson_stage: 'endgame',
      title: 'Winning the Game',
      narration_text: 'The moment you complete your 3rd full colour set — whether by placing a property, receiving wild cards, or stealing a set — announce your win. The game ends immediately. It doesn\'t matter whose turn it is. No tallying, no final round.',
      board_focus: 'property-area',
      components_involved: ['property_card', 'wild_card'],
      highlight_targets: ['property_card'],
      motion_primitive: 'count_up',
      user_takeaway: 'Win triggers instantly on 3 complete sets. No end-of-round — the game stops mid-play.',
      optional_quick_check: false,
    },

    // ── Stage 8: Quick Reference ──────────────────────────────────
    {
      scene_id: 'md_qr1',
      lesson_stage: 'quick-reference',
      title: 'Action Cards at a Glance',
      narration_text: 'Pass Go: draw 2 cards. Birthday: collect $2M from all. Debt Collector: one player pays $5M. Sly Deal: steal 1 property (not complete set). Forced Deal: swap 1 property. Deal Breaker: steal full complete set. Rent: charge matching colour rent. Double the Rent: doubles next rent played.',
      board_focus: 'full-hand',
      components_involved: ['action_card', 'just_say_no', 'rent_card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Deal Breaker > Sly Deal > Rent. Just Say No stops all of them once.',
      optional_quick_check: false,
    },
  ],

  quick_reference: [
    { id: 'qr1', question: 'How many cards do I draw each turn?', answer: 'Always draw 2 at the start of your turn. If the deck is empty, draw 1. Then play up to 3 cards.' },
    { id: 'qr2', question: 'Can I steal a property from a complete set?', answer: 'Sly Deal and Forced Deal cannot target properties in a complete set. Only Deal Breaker can take a full set.' },
    { id: 'qr3', question: 'What happens if I can\'t pay a debt?', answer: 'Pay whatever you have — bank first, then properties. If you have nothing, you pay nothing. No debt carries over.' },
    { id: 'qr4', question: 'Can I use Just Say No on rent?', answer: 'Yes — Just Say No cancels any action card played against you, including rent, birthday, debt collector, sly deal, forced deal, and deal breaker.' },
    { id: 'qr5', question: 'Can I move a wild property card after playing it?', answer: 'Yes — at the start of your turn (before drawing) you may rearrange wild cards between your property sets freely.' },
  ],
}

export default monopolyDeal
