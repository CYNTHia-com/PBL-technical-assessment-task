import { useState } from 'react';
import { useFeedback } from '@/hooks/useFeedback';
import { FeedbackForm } from '@/components/FeedbackForm';
import { FeedbackCard } from '@/components/FeedbackCard';
import { FeedbackFilters } from '@/components/FeedbackFilters';
import { FeedbackCategory, SortOption } from '@/types/feedback';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { feedbacks, votedItems, addFeedback, upvoteFeedback, sortFeedbacks, filterFeedbacks } = useFeedback();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory>();
  const [sortBy, setSortBy] = useState<SortOption>('mostUpvoted');
  const { toast } = useToast();

  const handleAddFeedback = (feedback: { title: string; description: string; category: FeedbackCategory }) => {
    addFeedback(feedback);
    toast({
      title: "Feedback submitted!",
      description: "Thank you for your feedback. It has been added to the board.",
    });
  };

  const handleUpvote = (id: string) => {
    if (votedItems.has(id)) {
      toast({
        title: "Already voted",
        description: "You've already upvoted this feedback.",
        variant: "destructive",
      });
      return;
    }
    
    upvoteFeedback(id);
    toast({
      title: "Vote recorded!",
      description: "Thank you for your vote!",
    });
  };

  // Filter and sort feedbacks
  const filteredFeedbacks = filterFeedbacks(feedbacks, selectedCategory, searchTerm);
  const sortedFeedbacks = sortFeedbacks(filteredFeedbacks, sortBy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Feedback Board
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your ideas, report bugs, and help us improve. Every voice matters!
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold">{feedbacks.length} Feedback{feedbacks.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">{feedbacks.reduce((sum, f) => sum + f.upvotes, 0)} Total Votes</span>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <FeedbackForm onSubmit={handleAddFeedback} />

        {/* Filters */}
        <FeedbackFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={feedbacks.length}
          filteredCount={filteredFeedbacks.length}
        />

        {/* Feedback List */}
        <div className="space-y-4">
          {sortedFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No feedback found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory
                  ? "Try adjusting your filters to see more results."
                  : "Be the first to share your feedback!"}
              </p>
            </div>
          ) : (
            sortedFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                hasVoted={votedItems.has(feedback.id)}
                onUpvote={handleUpvote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
