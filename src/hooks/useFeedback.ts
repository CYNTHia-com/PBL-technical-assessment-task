import { useState, useEffect } from 'react';
import { Feedback, FeedbackCategory, SortOption } from '@/types/feedback';

const STORAGE_KEY = 'feedback-board-data';
const VOTES_KEY = 'feedback-board-votes';

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load feedback data
    const savedFeedbacks = localStorage.getItem(STORAGE_KEY);
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    } else {
      // Initialize with sample data
      const sampleData: Feedback[] = [
        {
          id: '1',
          title: 'Add dark mode support',
          description: 'It would be great to have a dark mode option for better user experience during night time.',
          category: 'feature',
          upvotes: 12,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          title: 'Fix mobile navigation bug',
          description: 'The navigation menu doesn\'t work properly on mobile devices. The dropdown closes immediately after opening.',
          category: 'bug',
          upvotes: 8,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          title: 'Improve loading performance',
          description: 'The app takes too long to load on slower connections. Consider implementing lazy loading and code splitting.',
          category: 'improvement',
          upvotes: 5,
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        }
      ];
      setFeedbacks(sampleData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }

    // Load voted items
    const savedVotes = localStorage.getItem(VOTES_KEY);
    if (savedVotes) {
      setVotedItems(new Set(JSON.parse(savedVotes)));
    }
  }, []);

  const saveFeedbacks = (newFeedbacks: Feedback[]) => {
    setFeedbacks(newFeedbacks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFeedbacks));
  };

  const saveVotes = (newVotes: Set<string>) => {
    setVotedItems(newVotes);
    localStorage.setItem(VOTES_KEY, JSON.stringify([...newVotes]));
  };

  const addFeedback = (feedback: Omit<Feedback, 'id' | 'upvotes' | 'createdAt'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };
    const updatedFeedbacks = [newFeedback, ...feedbacks];
    saveFeedbacks(updatedFeedbacks);
  };

  const upvoteFeedback = (id: string) => {
    if (votedItems.has(id)) return;

    const updatedFeedbacks = feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, upvotes: feedback.upvotes + 1 } : feedback
    );
    saveFeedbacks(updatedFeedbacks);

    const newVotes = new Set(votedItems);
    newVotes.add(id);
    saveVotes(newVotes);
  };

  const sortFeedbacks = (feedbacks: Feedback[], sortBy: SortOption): Feedback[] => {
    const sorted = [...feedbacks];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'mostUpvoted':
        return sorted.sort((a, b) => b.upvotes - a.upvotes);
      case 'leastUpvoted':
        return sorted.sort((a, b) => a.upvotes - b.upvotes);
      default:
        return sorted;
    }
  };

  const filterFeedbacks = (
    feedbacks: Feedback[],
    category?: FeedbackCategory,
    searchTerm?: string
  ): Feedback[] => {
    let filtered = feedbacks;

    if (category) {
      filtered = filtered.filter(feedback => feedback.category === category);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        feedback =>
          feedback.title.toLowerCase().includes(term) ||
          feedback.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  return {
    feedbacks,
    votedItems,
    addFeedback,
    upvoteFeedback,
    sortFeedbacks,
    filterFeedbacks,
  };
};