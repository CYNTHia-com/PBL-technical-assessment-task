import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FeedbackCategory, SortOption, CATEGORY_LABELS } from '@/types/feedback';
import { Search, Filter, SortAsc } from 'lucide-react';

interface FeedbackFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory?: FeedbackCategory;
  onCategoryChange: (category?: FeedbackCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
}

export const FeedbackFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
}: FeedbackFiltersProps) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'mostUpvoted', label: 'Most Upvoted' },
    { value: 'leastUpvoted', label: 'Least Upvoted' },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-muted-foreground/20"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger className="w-48 transition-all duration-300 focus:ring-2 focus:ring-primary/20 border-muted-foreground/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter by Category:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory ? "outline" : "default"}
            size="sm"
            onClick={() => onCategoryChange()}
            className="transition-all duration-300 hover:scale-105"
          >
            All Categories
          </Button>
          
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(selectedCategory === key ? undefined : key as FeedbackCategory)}
              className="transition-all duration-300 hover:scale-105"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredCount} of {totalCount} feedback{totalCount !== 1 ? 's' : ''}
        </span>
        {(selectedCategory || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange();
              onSearchChange('');
            }}
            className="text-primary hover:text-primary/80"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};