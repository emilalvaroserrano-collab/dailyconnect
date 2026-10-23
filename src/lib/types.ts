export type MembershipStatus = "inactive" | "active";

export type Session = {
  idToken: string;
  refreshToken: string;
  uid: string;
  email: string;
  expiresAt: number;
};

export type UserPublic = {
  uid: string;
  name: string;
  email: string;
  phone: string;
  facebook?: string;
  whatsapp?: string;
  membershipStatus: MembershipStatus;
  referralCode: string | null;
  sponsorId: string | null;
  placementParentId: string | null;
  walletBalance: number;
  payoutMethod?: {
    method: "gcash" | "maya";
    account: string;
    phone: string;
    accountName: string;
  };
  joinDate: number | null;
  createdAt: number;
};

export type Chapter = { id: string; title: string; minutes: number; body: string };
export type Exercise = { id: string; prompt: string; hint: string };
export type Lesson = { chapters: Chapter[]; exercises: Exercise[] };

export type TutorialCard = {
  id: string;
  title: string;
  description: string;
  difficulty: "Start" | "Intermediate" | "Advanced";
  durationMin: number;
  thumbnail: string;
  reel: string;
  muxPlaybackId: string;
  tags: string[];
  sortOrder: number;
};

export type TutorialDetail = TutorialCard & { lesson: Lesson };

export type Progress = {
  tutorialId: string;
  progressPercent: number;
  completed: boolean;
  lastPositionSec: number;
  exercises: string[];
  updatedAt: number;
};

export type Notice = {
  id: string;
  kind: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: number;
};

export type WalletTx = {
  id: string;
  userId: string;
  type: "referral_bonus" | "unilevel" | "payout" | "creator_share" | "affiliate_commission" | "adjustment";
  amount: number;
  status: "posted" | "scheduled" | "requested" | "paid";
  period: string;
  note: string;
  sourceUserId: string | null;
  createdAt: number;
};

export type Desk = {
  profile: UserPublic;
  todayId: string;
  tutorials: TutorialCard[];
  progress: Progress[];
  notifications: Notice[];
  unread: number;
};

export type WalletView = {
  profile: UserPublic;
  transactions: WalletTx[];
  directPaid: number;
  directPending: number;
  directBonus: number;
  accruing: number;
  teamSize: number;
  accumulated: number;
  available: number;
  pendingPayout: number;
};

export type Recruit = {
  uid: string;
  name: string;
  membershipStatus: MembershipStatus;
  placed: boolean;
};

export type TreeNode = {
  uid: string;
  name: string;
  level: number;
  children: TreeNode[];
};

export type NetworkView = {
  profile: UserPublic;
  recruits: Recruit[];
  tree: TreeNode;
};
