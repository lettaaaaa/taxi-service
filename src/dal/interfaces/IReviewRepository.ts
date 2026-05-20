
import { Review } from '../../domain/entities/Review';

export interface IReviewRepository {
    create(review: Omit<Review, 'reviewId'>): Promise<Review>;
    findById(id: number): Promise<Review | null>;
    findAll(): Promise<Review[]>;
    save(review: Review): Promise<Review>;
    saveMany(reviews: Review[]): Promise<Review[]>;
}