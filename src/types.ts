export type MatchFormat = 'T20' | 'ODI' | 'TEST' | 'T10';
export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED' | 'INNINGS_BREAK' | 'STUMPS' | 'DELAYED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  flag: string; // emoji or SVG badge
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

export interface Player {
  id: string;
  name: string;
  shortName: string;
  fullName: string;
  teamId: string;
  teamName: string;
  role: 'Batter' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper Batter';
  battingStyle: 'Right-hand bat' | 'Left-hand bat';
  bowlingStyle: string;
  jerseyNumber: number;
  avatarUrl: string;
  heroImageUrl: string;
  country: string;
  iccRanking: {
    t20: number;
    odi: number;
    test: number;
  };
  bio: string;
  stats: {
    t20: PlayerFormatStats;
    odi: PlayerFormatStats;
    test: PlayerFormatStats;
  };
  radarMetrics: {
    boundaryPercentage: number;
    strikeRotation: number;
    paceHandling: number;
    spinMastery: number;
    clutchFactor: number;
    consistency: number;
  };
  recentForm: {
    opponent: string;
    scoreOrWickets: string;
    ballsOrOvers: string;
    date: string;
    matchType: string;
  }[];
}

export interface PlayerFormatStats {
  matches: number;
  innings: number;
  runs?: number;
  highestScore?: string;
  battingAverage?: number;
  strikeRate?: number;
  hundreds?: number;
  fifties?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  bestBowling?: string;
  bowlingAverage?: number;
  economyRate?: number;
  fiveWickets?: number;
  catches?: number;
  stumpings?: number;
}

export interface BattingScorecardItem {
  playerId: string;
  playerName: string;
  dismissal: string;
  bowlerName?: string;
  catcherName?: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isNotOut: boolean;
  isOnStrike?: boolean;
}

export interface BowlingScorecardItem {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
  foursConceded: number;
  sixesConceded: number;
  isBowlingNow?: boolean;
}

export interface FallOfWicket {
  wicketNumber: number;
  runs: number;
  over: number;
  playerName: string;
}

export interface Partnership {
  batter1Name: string;
  batter1Runs: number;
  batter1Balls: number;
  batter2Name: string;
  batter2Runs: number;
  batter2Balls: number;
  totalRuns: number;
  totalBalls: number;
  wicket: number;
}

export interface OverSummary {
  overNumber: number;
  bowlerName: string;
  runs: number;
  wickets: number;
  balls: {
    ballNumber: number;
    runs: number;
    isWicket: boolean;
    isBoundary: boolean;
    isSix: boolean;
    isExtra: boolean;
    extraType?: 'wide' | 'noBall' | 'legBye' | 'bye';
    commentary: string;
    shotType?: string;
    ballSpeed?: number;
    pitchZone?: 'Yorker' | 'Full' | 'Good Length' | 'Short';
    lineZone?: 'Outside Off' | 'Off Stump' | 'Middle' | 'Leg Stump' | 'Down Leg';
  }[];
}

export interface Inning {
  inningNumber: 1 | 2;
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  overs: number; // e.g. 18.2
  declared?: boolean;
  batting: BattingScorecardItem[];
  bowling: BowlingScorecardItem[];
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    total: number;
  };
  fallOfWickets: FallOfWicket[];
  partnerships: Partnership[];
  oversData: OverSummary[];
  runRateByOver: { over: number; runs: number; cumulativeRuns: number; wickets: number }[];
}

export interface Match {
  id: string;
  title: string;
  subtitle: string;
  format: MatchFormat;
  series: string;
  stage: string;
  status: MatchStatus;
  statusText: string;
  venue: {
    name: string;
    city: string;
    country: string;
    capacity: string;
    pitchType: string;
    avgFirstInnings: number;
  };
  startTime: string;
  team1: Team;
  team2: Team;
  toss: {
    winnerId: string;
    decision: 'bat' | 'bowl';
    text: string;
  };
  innings: Inning[];
  currentInningIndex: number;
  target?: number;
  requiredRunRate?: number;
  currentRunRate: number;
  ballsRemaining?: number;
  runsNeeded?: number;
  winProbability: {
    team1Percent: number;
    team2Percent: number;
  };
  manOfTheMatch?: {
    playerName: string;
    teamName: string;
    description: string;
    avatarUrl: string;
  };
  weather: {
    condition: string;
    temperature: string;
    humidity: string;
    windSpeed: string;
    rainChance: string;
  };
  pitchReport: {
    hardness: number; // 0 - 100
    grassCover: number; // 0 - 100
    bounce: string; // Low / True / High
    turn: string; // Minimal / Moderate / Heavy
    swing: string; // Early swing / Reverse / Dry
    verdict: string;
  };
}

export interface TournamentStanding {
  rank: number;
  team: Team;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  form: ('W' | 'L' | 'T' | 'NR')[];
  qualified?: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  season: string;
  edition: string;
  host: string;
  totalTeams: number;
  trophyImageUrl: string;
  currentStage: string;
  groups: {
    groupName: string;
    standings: TournamentStanding[];
  }[];
  statsLeaders: {
    mostRuns: {
      playerName: string;
      teamShort: string;
      runs: number;
      innings: number;
      average: number;
      strikeRate: number;
      avatarUrl: string;
    }[];
    mostWickets: {
      playerName: string;
      teamShort: string;
      wickets: number;
      innings: number;
      economy: number;
      bestBowling: string;
      avatarUrl: string;
    }[];
    highestStrikeRate: {
      playerName: string;
      teamShort: string;
      strikeRate: number;
      runs: number;
      balls: number;
      avatarUrl: string;
    }[];
    mostSixes: {
      playerName: string;
      teamShort: string;
      sixes: number;
      innings: number;
      avatarUrl: string;
    }[];
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Exclusive' | 'Analysis' | 'Match Report' | 'Tech & Equipment' | 'Interview';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  summary: string;
  content: string[];
  imageUrl: string;
  tags: string[];
  trendingScore: number;
}
