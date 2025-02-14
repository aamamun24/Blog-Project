import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy as string;
    const sortOrder = (this?.query?.sortOrder as string) === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);

    return this;
  }

  authorFilter() {
    const queryObj = { ...this.query };

    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.filter) {
      queryObj.author = this.query.filter;
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
