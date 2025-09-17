export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  upvotes: number;
  createdAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  feedbackId: string;
  content: string;
  createdAt: string;
}

export type FeedbackCategory = 'bug' | 'feature' | 'improvement' | 'other';

export type SortOption = 'newest' | 'oldest' | 'mostUpvoted' | 'leastUpvoted';

export const CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  bug: 'Bug Report',
  feature: 'Feature Request',
  improvement: 'Improvement',
  other: 'Other'
};