
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Review } from '../../domain/entities/Review';
import { IReviewRepository } from '../interfaces/IReviewRepository';

@injectable()
export class ReviewRepository implements IReviewRepository {
    private repository: Repository<Review>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Review);
    }

    async create(reviewData: Omit<Review, 'reviewId'>): Promise<Review> {
        const review = this.repository.create(reviewData);
        return await this.repository.save(review);
    }

    async findById(id: number): Promise<Review | null> {
        return await this.repository.findOne({ where: { reviewId: id } });
    }

    async findAll(): Promise<Review[]> {
        return await this.repository.find();
    }

    async save(review: Review): Promise<Review> {
        return await this.repository.save(review);
    }

    async saveMany(reviews: Review[]): Promise<Review[]> {
        return await this.repository.save(reviews);
    }
}