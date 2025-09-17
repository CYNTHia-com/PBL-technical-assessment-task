import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FeedbackCategory, CATEGORY_LABELS } from '@/types/feedback';
import { Plus } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (feedback: { title: string; description: string; category: FeedbackCategory }) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FeedbackCategory>('feature');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
    });

    setTitle('');
    setDescription('');
    setCategory('feature');
    setIsSubmitting(false);
  };

  return (
    <Card className="mb-8 bg-gradient-to-br from-card to-card/80 border-accent/20 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          <Plus className="h-6 w-6 text-primary" />
          Share Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of your feedback..."
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details about your feedback..."
              className="min-h-[120px] resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-semibold">
              Category
            </Label>
            <Select value={category} onValueChange={(value: FeedbackCategory) => setCategory(value)}>
              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-muted-foreground/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !title.trim() || !description.trim()}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transform transition-all duration-300 hover:scale-[1.02] disabled:transform-none shadow-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};