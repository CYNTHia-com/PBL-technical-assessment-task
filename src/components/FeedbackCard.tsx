import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Feedback, CATEGORY_LABELS } from '@/types/feedback';
import { ChevronUp, Calendar, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackCardProps {
  feedback: Feedback;
  hasVoted: boolean;
  onUpvote: (id: string) => void;
}

export const FeedbackCard = ({ feedback, hasVoted, onUpvote }: FeedbackCardProps) => {
  const categoryColors = {
    bug: 'bg-destructive/10 text-destructive border-destructive/20',
    feature: 'bg-primary/10 text-primary border-primary/20',
    improvement: 'bg-accent/10 text-accent-foreground border-accent/20',
    other: 'bg-muted text-muted-foreground border-muted-foreground/20'
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/80 border-accent/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {feedback.title}
            </h3>
            <div className="flex items-center gap-3">
              <Badge 
                variant="secondary" 
                className={`${categoryColors[feedback.category]} font-medium`}
              >
                {CATEGORY_LABELS[feedback.category]}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
          
          <Button
            variant={hasVoted ? "default" : "outline"}
            size="sm"
            onClick={() => onUpvote(feedback.id)}
            disabled={hasVoted}
            className={`flex flex-col items-center gap-1 min-w-[60px] h-auto py-2 transition-all duration-300 ${
              hasVoted 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'hover:bg-primary/10 hover:border-primary hover:text-primary hover:scale-110'
            }`}
          >
            <ChevronUp className={`h-4 w-4 ${hasVoted ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold">{feedback.upvotes}</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed mb-4">
          {feedback.description}
        </p>
        
        {feedback.comments && feedback.comments.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{feedback.comments.length} comment{feedback.comments.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};